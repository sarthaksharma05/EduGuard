import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './lib/supabaseClient.js'
import { useAuth } from './context/AuthContext.jsx'

function formatAuthError(message) {
  if (!message) return 'Authentication failed. Please try signing in again.'
  return decodeURIComponent(message.replace(/\+/g, ' '))
}

export default function AuthCallback() {
  const navigate = useNavigate()
  const { session, loading, getDashboardPath } = useAuth()
  const [error, setError] = useState('')
  const [processing, setProcessing] = useState(true)

  const statusText = useMemo(() => {
    if (error) return error
    return 'Completing sign in...'
  }, [error])

  useEffect(() => {
    const completeAuth = async () => {
      if (!supabase) {
        setError('Supabase is not configured. Check env vars and restart the app.')
        setProcessing(false)
        return
      }

      const url = new URL(window.location.href)
      const errorDescription =
        url.searchParams.get('error_description') || url.searchParams.get('error')

      if (errorDescription) {
        setError(formatAuthError(errorDescription))
        setProcessing(false)
        return
      }

      const code = url.searchParams.get('code')
      if (code) {
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
        if (exchangeError) {
          setError(formatAuthError(exchangeError.message))
          setProcessing(false)
          return
        }
        window.history.replaceState({}, document.title, '/auth/callback')
      }

      setProcessing(false)
    }

    completeAuth()
  }, [])

  useEffect(() => {
    if (!processing && !loading && session) {
      navigate(getDashboardPath(), { replace: true })
    }
  }, [processing, loading, session, getDashboardPath, navigate])

  return (
    <section className="min-h-[calc(100vh-4rem)] pt-24 px-6 bg-gradient-to-br from-[#edf4ff] via-white to-[#e3fbff]">
      <div className="container mx-auto max-w-xl text-center">
        <div
          className={`inline-flex items-center rounded-2xl px-4 py-3 text-sm shadow-sm ${
            error
              ? 'bg-red-50 text-red-700 border border-red-200'
              : 'bg-white/80 text-slate-700'
          }`}
        >
          {statusText}
        </div>
      </div>
    </section>
  )
}
