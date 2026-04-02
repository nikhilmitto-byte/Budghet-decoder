import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! I am your Budget 2026 AI Assistant. Ask me anything about the new tax slabs, startups, agriculture, or any budget policies.' }
  ]);
  const [sessionId] = useState(() => {
    let sid = localStorage.getItem('budget_sessionId');
    if (!sid) {
      sid = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(7);
      localStorage.setItem('budget_sessionId', sid);
    }
    return sid;
  });

  const messagesEndRef = useRef(null);
  const chatEndpoint = import.meta.env.VITE_CHAT_PROXY_URL || '/api/chat';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`${chatEndpoint}/${sessionId}`);
        if (res.ok) {
          const data = await res.json();
          if (data.history && data.history.length > 0) {
            setMessages(data.history.map(m => ({
              sender: m.role === 'model' ? 'bot' : 'user',
              text: m.text || m.parts?.[0]?.text
            })));
          }
        }
      } catch (e) {
        console.error('Error fetching chat history', e);
      }
    };
    fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  useEffect(() => {
    const trigger = document.getElementById('chat-toggle');
    if (trigger) {
      trigger.onclick = () => setIsOpen(true);
    }
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      const historyBase = [...messages, { sender: 'user', text: userMsg }]
        .filter(m => m.sender !== 'error')
        .map(m => ({
          role: m.sender === 'bot' ? 'model' : 'user',
          parts: [{ text: m.text }],
        }));

      const response = await fetch(chatEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMsg, sessionId, history: historyBase.slice(1) })
      });

      if (!response.ok) {
        throw new Error(`Chat proxy error: ${response.status} ${response.statusText}`);
      }

      const { text } = await response.json();
      setMessages(prev => [...prev, { sender: 'bot', text: text ?? "I'm sorry, I did not get a response." }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { sender: 'bot', text: "I'm sorry, I encountered an error connecting to the AI model. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div 
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 100,
          display: isOpen ? 'none' : 'block'
        }}
      >
        <button 
          id="chat-toggle"
          className="btn btn-primary" 
          onClick={() => setIsOpen(true)}
          style={{ 
            borderRadius: '50%', width: '64px', height: '64px', padding: 0, 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(79, 70, 229, 0.4)'
          }}
        >
          <MessageSquare size={28} />
        </button>
      </div>

      {isOpen && (
        <div 
          className="glass-panel animate-fade-in"
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            width: '400px',
            height: '650px',
            maxHeight: '85vh',
            zIndex: 101,
            display: 'flex',
            flexDirection: 'column',
            padding: 0,
            overflow: 'hidden',
            boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          {/* Header */}
          <div style={{ background: 'var(--primary)', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
            <div className="flex items-center gap-2">
              <Bot size={22} />
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: '600' }}>AI Budget Analyst</h3>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', opacity: 0.8 }}
              onMouseOver={(e) => e.currentTarget.style.opacity = 1}
              onMouseOut={(e) => e.currentTarget.style.opacity = 0.8}
            >
              <X size={22} />
            </button>
          </div>

          {/* Messages Area */}
          <div style={{ flex: 1, padding: '1.25rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem', background: 'rgba(11, 15, 25, 0.98)' }}>
            {messages.map((msg, i) => (
              <div 
                key={i} 
                className="animate-fade-in markdown-body"
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  background: msg.sender === 'user' ? 'var(--primary)' : 'rgba(255,255,255,0.06)',
                  color: 'white',
                  padding: '1rem',
                  borderRadius: '1rem',
                  borderBottomRightRadius: msg.sender === 'user' ? '0' : '1rem',
                  borderBottomLeftRadius: msg.sender === 'bot' ? '0' : '1rem',
                  maxWidth: '85%',
                  lineHeight: '1.5',
                  fontSize: '0.95rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              >
                {msg.sender === 'user' ? (
                  msg.text
                ) : (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.text}
                  </ReactMarkdown>
                )}
              </div>
            ))}
            {isLoading && (
              <div 
                className="animate-fade-in"
                style={{
                  alignSelf: 'flex-start',
                  background: 'rgba(255,255,255,0.05)',
                  color: 'var(--text-muted)',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '1rem',
                  borderBottomLeftRadius: '0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  fontSize: '0.9rem',
                  fontStyle: 'italic'
                }}
              >
                <Loader2 size={18} style={{ animation: 'spin 1.5s linear infinite' }} />
                Analyzing documents...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} style={{ display: 'flex', padding: '1rem', background: '#0f172a', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Budget 2026..."
              className="input-field"
              disabled={isLoading}
              style={{ flex: 1, borderTopRightRadius: 0, borderBottomRightRadius: 0, marginBottom: 0, background: 'rgba(255,255,255,0.05)', border: 'none' }}
            />
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isLoading || !input.trim()}
              style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, padding: '0 1.25rem', opacity: (isLoading || !input.trim()) ? 0.6 : 1, transition: 'var(--transition)' }}
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
