import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Button from './components/Button.jsx'
import { useAuth } from './context/AuthContext.jsx'
import { supabase } from './lib/supabaseClient.js'
import { upsertUserProfile } from './lib/profileStore.js'
import { USER_ROLES } from './utils/authRole.js'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function mapAuthError(message) {
  if (!message) return 'Something went wrong. Please try again.'
  const text = message.toLowerCase()
  if (text.includes('invalid login credentials')) return 'Invalid email or password.'
  if (text.includes('password')) return 'Password must be at least 6 characters.'
  if (text.includes('email not confirmed')) {
    return 'Email confirmation is enabled in Supabase. Disable it to allow direct login.'
  }
  return message
}

export default function Login() {
  const navigate = useNavigate()
  const { session, role, loading: authLoading, setRole } = useAuth()
  const [mode, setMode] = useState('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  if (authLoading) {
    return (
      <section className="min-h-[calc(100vh-4rem)] pt-24 px-6 bg-gradient-to-br from-[#edf4ff] via-white to-[#e3fbff]">
        <div className="container mx-auto max-w-xl text-center">
          <div className="inline-flex items-center rounded-full bg-white/80 px-4 py-2 text-sm text-slate-600 shadow-sm">
            Checking your session...
          </div>
        </div>
      </section>
    )
  }

  if (session && role === USER_ROLES.STUDENT) {
    return <Navigate to="/student-dashboard" replace />
  }

  const clearFeedback = () => {
    setError('')
    setSuccess('')
  }

  const validate = () => {
    const cleanEmail = email.trim().toLowerCase()
    if (!EMAIL_REGEX.test(cleanEmail)) {
      setError('Enter a valid email address.')
      return null
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return null
    }
    return cleanEmail
  }

  const ensureStudentRole = async () => {
    const { error: roleError } = await setRole(USER_ROLES.STUDENT)
    if (roleError) {
      setError('Login succeeded, but role setup failed. Please try again.')
      return false
    }
    return true
  }

  const persistProfileRow = async () => {
    const { data: userData, error: userError } = await supabase.auth.getUser()
    if (userError || !userData?.user) {
      setError('Authenticated, but failed to load your user profile.')
      return false
    }

    const currentUser = userData.user
    const { error: profileError } = await upsertUserProfile({
      userId: currentUser.id,
      email: currentUser.email,
      role: USER_ROLES.STUDENT,
      fullName: currentUser.user_metadata?.full_name || '',
      avatarUrl: currentUser.user_metadata?.avatar_url || '',
    })

    if (profileError) {
      setError(`Login succeeded, but profile table sync failed: ${profileError.message}`)
      return false
    }

    return true
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    clearFeedback()

    if (!supabase) {
      setError('Supabase is not configured. Add env keys and restart the app.')
      return
    }

    const cleanEmail = validate()
    if (!cleanEmail) return

    setLoading(true)

    if (mode === 'signup') {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: { role: USER_ROLES.STUDENT },
        },
      })

      if (signUpError) {
        setLoading(false)
        setError(mapAuthError(signUpError.message))
        return
      }

      if (!data.session) {
        setLoading(false)
        setError('Signup created but no session found. In Supabase, disable "Confirm email" for direct login.')
        return
      }

      const ok = await ensureStudentRole()
      if (!ok) {
        setLoading(false)
        return
      }
      const synced = await persistProfileRow()
      setLoading(false)
      if (!synced) return

      setSuccess('Account created successfully.')
      navigate('/student-dashboard', { replace: true })
      return
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    })

    if (signInError) {
      setLoading(false)
      setError(mapAuthError(signInError.message))
      return
    }

    const ok = await ensureStudentRole()
    if (!ok) {
      setLoading(false)
      return
    }
    const synced = await persistProfileRow()
    setLoading(false)
    if (!synced) return

    navigate('/student-dashboard', { replace: true })
  }

  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-4rem)] pt-24 pb-12 px-6 bg-gradient-to-br from-[#e0ecff] via-[#f7fbff] to-[#dff6ff]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -left-16 h-72 w-72 rounded-full bg-indigo-200/50 blur-3xl animate-float-slow" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-200/45 blur-3xl animate-float-delay" />
      </div>

      <div className="container mx-auto max-w-xl relative">
        <div className="rounded-3xl bg-white/80 backdrop-blur-xl ring-1 ring-white p-6 sm:p-8 shadow-[0_30px_60px_-30px_rgba(30,41,59,0.55)]">
          <div className="inline-flex rounded-full bg-slate-100 p-1 mb-6">
            <button
              type="button"
              onClick={() => {
                setMode('signin')
                clearFeedback()
              }}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                mode === 'signin' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600'
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup')
                clearFeedback()
              }}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                mode === 'signup' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600'
              }`}
            >
              Sign Up
            </button>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            {mode === 'signin' ? 'Student Login' : 'Create Student Account'}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Use your email ID and password. You will be redirected to the student dashboard.
          </p>

          {error && (
            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 text-emerald-700 px-4 py-3 text-sm">
              {success}
            </div>
          )}

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <label className="block text-sm font-semibold text-slate-700" htmlFor="email">
              Email ID
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="student@school.edu"
              className="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-indigo-300"
            />

            <label className="block text-sm font-semibold text-slate-700" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
              className="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-indigo-300"
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full py-3.5 text-base shadow-[0_16px_30px_-14px_rgba(79,70,229,0.8)] disabled:opacity-60"
              disabled={loading}
            >
              {loading ? 'Please wait...' : mode === 'signin' ? 'Login to Dashboard' : 'Create Account'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
