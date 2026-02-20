import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const GEMINI_ENDPOINT =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'

const CAREER_SYSTEM_PROMPT =
  'You are EduGuard Career Assistant. Help students with career planning, skill-roadmaps, course choices, internships, resume tips, and interview preparation. Give clear, practical, step-by-step advice. Keep answers concise but useful.'

export default function StudentAI() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Hi! I am your career assistant. Ask me about career paths, skills, internships, resume building, or interview prep.',
    },
  ])

  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading])

  const buildContents = (history, userPrompt) => {
    const mapped = history.map((item) => ({
      role: item.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: item.text }],
    }))
    mapped.push({ role: 'user', parts: [{ text: userPrompt }] })
    return mapped
  }

  const getModelText = (data) => {
    const candidate = data?.candidates?.[0]
    const parts = candidate?.content?.parts || []
    return parts.map((p) => p?.text || '').join('\n').trim()
  }

  const sendMessage = async () => {
    if (!canSend) return
    if (!apiKey) {
      setError('Gemini API key missing. Add VITE_GEMINI_API_KEY in .env and restart the app.')
      return
    }

    setError('')
    const userPrompt = input.trim()
    setInput('')
    setLoading(true)
    setMessages((prev) => [...prev, { role: 'user', text: userPrompt }])

    try {
      const response = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: CAREER_SYSTEM_PROMPT }],
          },
          contents: buildContents(messages, userPrompt),
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 700,
          },
        }),
      })

      if (!response.ok) {
        const errText = await response.text()
        throw new Error(errText || 'Failed to get response from Gemini.')
      }

      const data = await response.json()
      const modelText = getModelText(data)

      if (!modelText) {
        throw new Error('Gemini returned an empty response.')
      }

      setMessages((prev) => [...prev, { role: 'assistant', text: modelText }])
    } catch (err) {
      setError(err.message || 'Something went wrong while contacting Gemini.')
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'I could not process that right now. Please try again in a moment.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await sendMessage()
  }

  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-4rem)] pt-24 pb-12 px-6 bg-gradient-to-br from-[#edf5ff] via-white to-[#e7fbff]">
      <div className="container mx-auto max-w-5xl">
        <div className="rounded-3xl bg-white/80 backdrop-blur-xl ring-1 ring-white p-6 md:p-8 shadow-[0_28px_60px_-30px_rgba(30,41,59,0.5)]">
          <p className="text-sm font-semibold text-indigo-700">Student AI</p>
          <h1 className="text-3xl font-black text-slate-900 mt-1">Career Assistant Chatbot</h1>
          <p className="text-slate-600 mt-3">
            Ask career questions and get practical guidance for courses, skills, internships, and interview preparation.
          </p>
          <div className="mt-4">
            <Link
              to="/student-dashboard"
              className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold bg-white border border-slate-200 text-slate-700 hover:border-indigo-300 transition"
            >
              Back to Dashboard
            </Link>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 h-[420px] overflow-y-auto space-y-3">
            {messages.map((msg, index) => (
              <div
                key={`${msg.role}-${index}`}
                className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'ml-auto bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-800'
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="max-w-[88%] rounded-2xl px-4 py-3 text-sm bg-slate-100 text-slate-700">
                Thinking...
              </div>
            )}
          </div>

          {error && (
            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-4 flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about career roadmap, best skills, internships, etc."
              className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <button
              type="submit"
              disabled={!canSend}
              className="rounded-2xl bg-indigo-600 text-white px-6 py-3 font-semibold hover:bg-indigo-700 disabled:opacity-60 transition"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
