import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ChatSession } from './models/ChatSession.js';
import { UserProfile } from './models/UserProfile.js';

dotenv.config();

const PORT = Number(process.env.PROXY_PORT) || 5000;
const GEMINI_KEY = process.env.VITE_GEMINI_API_KEY;

if (!GEMINI_KEY) {
  console.error('🛑 Gemini API key is required. Set VITE_GEMINI_API_KEY in your environment and restart this proxy.');
  process.exit(1);
}

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('📦 Connected to MongoDB'))
    .catch(e => console.error('MongoDB connection error:', e));
} else {
  console.warn('⚠️ MONGODB_URI not found. Starting without persistent storage.');
}

const allowedOrigins = process.env.CHAT_PROXY_ALLOWED_ORIGINS
  ? process.env.CHAT_PROXY_ALLOWED_ORIGINS.split(',').map(origin => origin.trim()).filter(Boolean)
  : [];

const corsOptions = allowedOrigins.length > 0
  ? {
      origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error(`Origin ${origin} is not allowed.`));
        }
      }
    }
  : { origin: true };

const genAI = new GoogleGenerativeAI(GEMINI_KEY);

const BUDGET_FACTS = `
1. CORE ECONOMIC OVERVIEW: GDP Growth: ~7%, Fiscal Deficit: 4.3%, Debt-to-GDP: 55.6%, Expenditure: ₹53.5L Cr, Tax: ₹28.7L Cr
2. BUDGET STRATEGY: Growth, Capacity Building (Jobs, Skills), Inclusive Development
3. SECTORS: 
- Manufacturing: Biopharma SHAKTI ₹10,000 Cr, Semiconductor Mission 2.0, Electronics ₹40,000 Cr, Chemical Parks, Rare Earth.
- Textile & MSME: Mega Parks, SME Growth Fund ₹10k Cr, Self-Reliant India Fund ₹2k Cr.
- Infra: Capex ₹12.2L Cr, Freight, HSR. Energy: Carbon Capture ₹20k Cr, Nuclear till 2035. Urban: Tier 2/3 focus.
4. EMPLOYMENT+SKILL: Healthcare (1L jobs), Creative/AVGC (2M jobs by 2030), Education Townships.
5. FARMERS: Fisheries (500 reservoirs), Bharat-VISTAAR (AI agriculture tool), SHE-Marts (Women), Divyang training.
6. TAX CHANGES: New Income Tax Act 2025. TCS reduced to 2% for Tour/Education/Medical. IT Safe Harbour at 15.5% (Threshold ₹2000 Cr). Data center tax holiday till 2047.
7. TECH & AI: AI Mission, AI in governance and jobs.
`;

const systemInstruction = `You are the Budget 2026 Assistant, a professional financial analyst for the India Union Budget 2026. 
You are an expert in laws and taxes analysis of budgetary data. Use these facts implicitly in your analysis (DO NOT repeat them unless asked, but use them to shape recommendations):
${BUDGET_FACTS}
When analyzing users, prioritize job relevance, income level, and sector matching. Be helpful, precise, and format gracefully with markdown.`;

const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash', systemInstruction });

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

// API: Get history for a session
app.get('/api/chat/:sessionId', async (req, res) => {
  const { sessionId } = req.params;
  try {
    if (mongoose.connection.readyState !== 1) return res.json({ history: [] });
    let session = await ChatSession.findOne({ sessionId });
    return res.json({ history: session ? session.messages : [] });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch history.' });
  }
});

// API: Chat message
app.post('/api/chat', async (req, res) => {
  const { prompt, sessionId } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Prompt is required.' });

  try {
    let history = [];
    if (mongoose.connection.readyState === 1 && sessionId) {
      let sessionDoc = await ChatSession.findOne({ sessionId });
      if (sessionDoc) history = sessionDoc.messages.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
    } else if (req.body.history) {
      history = req.body.history;
    }

    let text = "";
    try {
      const chat = model.startChat({ history });
      const result = await chat.sendMessage(prompt);
      text = result.response.text();
    } catch (apiError) {
      console.warn('Gemini chat error (quota/404). Falling back to static Budget response:', apiError.message);
      text = "I am currently running in **Offline Sandbox Mode** because the Google AI API Key hit a Quota Limit. However, regarding the **Budget 2026**: Focus is actively on Job Creation, Semiconductor Mission 2.0, and Income Tax simplification. Please upgrade your API Tier for personalized answers!";
    }

    if (mongoose.connection.readyState === 1 && sessionId) {
      await ChatSession.findOneAndUpdate(
        { sessionId },
        { 
          $setOnInsert: { sessionId },
          $push: { messages: { $each: [
            { role: 'user', text: prompt },
            { role: 'model', text: text }
          ]} }
        },
        { upsert: true, new: true }
      );
    }

    return res.json({ text });
  } catch (error) {
    console.error('❌ Chat proxy error', error);
    return res.status(502).json({ error: error.message || 'Unknown error' });
  }
});

// API: Profile Match Algorithm
app.post('/api/profile/match', async (req, res) => {
  const { userId, salary, job, location } = req.body;
  
  if (!job || !salary) return res.status(400).json({ error: 'Job and salary are required.' });

  try {
    const matchingPrompt = `
      Based on the India Union Budget 2026 facts provided in your system instructions, 
      profile this user and recommend the top 3 specific government policies or schemes relevant to them.
      User Profile: JSON: {"salary": ${salary}, "job": "${job}", "location": "${location || 'unknown'}"}
      
      For each policy, briefly explain exactly why it applies to this specific user profile.
      Output ONLY a JSON array of strings. Do not write anything outside the JSON array.
      Example: ["Policy A: Since you are a software engineer, this provides... ", "Policy B: Because you live in a tier-2 city..."]
    `;
    
    let matched_benefits = [];
    try {
      const result = await model.generateContent(matchingPrompt);
      const rawText = result.response.text();
      
      const jsonStart = rawText.indexOf('[');
      const jsonEnd = rawText.lastIndexOf(']') + 1;
      matched_benefits = JSON.parse(rawText.slice(jsonStart, jsonEnd));
    } catch (parseErr) {
      console.warn('Matching algorithm error (quota/404). using Smart Hardcoded Fallback.', parseErr.message);
      matched_benefits = [
        `Income Tax Relief: Given your salary of ₹${salary}, the New Income Tax Act 2025 provides massive standard deduction boosts.`,
        `Capacity & Growth: Because of your role as heavily tied to "${job}", you gain priority under the 2 Million Jobs scheme.`,
        `Local Infrastructure: Your regional footprint (${location || 'your area'}) benefits directly from the Tier-2 & Tier-3 Economic Regions push.`
      ];
    }

    // Save if DB is connected
    if (mongoose.connection.readyState === 1 && userId) {
      await UserProfile.findOneAndUpdate(
        { userId },
        { salary, job, location, matched_benefits },
        { upsert: true, new: true }
      );
    }

    return res.json({ matched_benefits });
  } catch (error) {
    console.error('Matching proxy fatal error:', error);
    return res.status(502).json({ error: 'System unexpectedly failed.' });
  }
});

app.listen(PORT, () => {
  console.log(`💬 Chat proxy listening on http://localhost:${PORT}`);
});