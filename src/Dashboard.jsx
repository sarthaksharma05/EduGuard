import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext.jsx'

function getDisplayName(user) {
  return user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Student'
}

function getAvatarUrl(user) {
  return user?.user_metadata?.avatar_url || ''
}

export default function Dashboard() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <section className="min-h-[calc(100vh-4rem)] pt-24 px-6">
        <div className="container mx-auto max-w-5xl">Loading dashboard...</div>
      </section>
    )
  }

  if (!user) {
    return <Navigate to="/auth" replace />
  }

  const name = getDisplayName(user)
  const avatarUrl = getAvatarUrl(user)

  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-4rem)] pt-24 pb-12 px-6 bg-gradient-to-br from-[#edf4ff] via-white to-[#ddf7ff]">
      <div className="container mx-auto max-w-6xl">
        <div className="rounded-3xl bg-white/80 backdrop-blur-xl ring-1 ring-white p-6 md:p-8 shadow-[0_28px_60px_-30px_rgba(30,41,59,0.5)]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-indigo-700">Student Dashboard</p>
              <h1 className="text-3xl font-black text-slate-900 mt-1">Welcome back, {name}</h1>
              <p className="text-slate-600 mt-2">Track your profile and stay connected with EduGuard AI.</p>
            </div>
            <Link
              to="/profile/edit"
              className="inline-flex items-center justify-center rounded-full px-5 py-2.5 bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
            >
              Edit Profile
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100 md:col-span-2">
              <h2 className="font-bold text-slate-800">Profile Snapshot</h2>
              <div className="mt-4 flex items-center gap-4">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={name}
                    className="h-16 w-16 rounded-2xl object-cover ring-2 ring-indigo-100"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-2xl bg-indigo-100 text-indigo-700 grid place-items-center font-bold text-xl">
                    {name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-slate-900">{name}</p>
                  <p className="text-sm text-slate-500">{user.email}</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-slate-900 p-5 text-white shadow-sm">
              <h3 className="font-bold">Quick Action</h3>
              <p className="mt-2 text-sm text-slate-300">Update your name and photo to personalize your account.</p>
              <Link to="/profile/edit" className="inline-block mt-4 text-cyan-300 font-semibold hover:text-cyan-200">
                Go to profile editor
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
