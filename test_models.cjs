require('dotenv').config();
const key = process.env.VITE_GEMINI_API_KEY;

if (!key) {
  console.log("No API key found in .env");
  process.exit(1);
}

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;

fetch(url)
  .then(r => r.json())
  .then(data => {
    if (data.models) {
      console.log("AVAILABLE MODELS:");
      console.log(data.models.map(m => m.name).join("\n"));
    } else {
      console.log("ERROR FETCHING MODELS:", JSON.stringify(data, null, 2));
    }
  })
  .catch(console.error);
