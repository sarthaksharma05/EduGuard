import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Button from './components/Button.jsx'
import { useAuth } from './context/AuthContext.jsx'
import { getLocalProfile, saveLocalProfile } from './lib/localProfile.js'

function getDisplayName(user) {
  return user?.user_metadata?.full_name || ''
}

function getAvatarUrl(user) {
  return user?.user_metadata?.avatar_url || ''
}

export default function EditProfile() {
  const { user, loading, getDashboardPath } = useAuth()
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (user) {
      const local = getLocalProfile(user.id)
      setFullName(local?.fullName || getDisplayName(user))
      setAvatarUrl(local?.avatarUrl || getAvatarUrl(user))
    }
  }, [user])

  if (loading) {
    return (
      <section className="min-h-[calc(100vh-4rem)] pt-24 px-6">
        <div className="container mx-auto max-w-3xl">Loading profile...</div>
      </section>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    setSaving(true)
    saveLocalProfile(user.id, {
      fullName: fullName.trim(),
      avatarUrl: avatarUrl.trim(),
    })
    setSaving(false)
    setSuccess('Profile updated on this website successfully.')
    setTimeout(() => navigate(getDashboardPath()), 700)
  }

  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-4rem)] pt-24 pb-12 px-6 bg-gradient-to-br from-[#e8f2ff] via-white to-[#e5fbff]">
      <div className="container mx-auto max-w-3xl">
        <div className="rounded-3xl bg-white/80 backdrop-blur-xl ring-1 ring-white p-6 sm:p-8 shadow-[0_28px_60px_-32px_rgba(30,41,59,0.55)]">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Edit Profile</h1>
            <Link to={getDashboardPath()} className="text-sm font-semibold text-indigo-700 hover:text-indigo-800">
              Back to Dashboard
            </Link>
          </div>

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
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Full Name</span>
              <input
                type="text"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="John Student"
                className="mt-1.5 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Photo URL</span>
              <input
                type="url"
                value={avatarUrl}
                onChange={(event) => setAvatarUrl(event.target.value)}
                placeholder="https://example.com/my-photo.jpg"
                className="mt-1.5 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </label>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                className="px-6 py-3"
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Profile'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
