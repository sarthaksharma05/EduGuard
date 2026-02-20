import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from './context/AuthContext.jsx'

function getDisplayName(user) {
  return user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Teacher'
}

export default function TeacherDashboard() {
  const { user } = useAuth()
  const name = getDisplayName(user)

  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-4rem)] pt-24 pb-12 px-6 bg-gradient-to-br from-[#eef7ff] via-white to-[#e7f0ff]">
      <div className="container mx-auto max-w-6xl">
        <div className="rounded-3xl bg-white/80 backdrop-blur-xl ring-1 ring-white p-6 md:p-8 shadow-[0_28px_60px_-30px_rgba(30,41,59,0.5)]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-indigo-700">Teacher Dashboard</p>
              <h1 className="text-3xl font-black text-slate-900 mt-1">Welcome, {name}</h1>
              <p className="text-slate-600 mt-2">Manage classroom trends and student outcomes from one place.</p>
            </div>
            <Link
              to="/profile/edit"
              className="inline-flex items-center justify-center rounded-full px-5 py-2.5 bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
            >
              Edit Profile
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
              <p className="text-sm text-slate-500">Active Students</p>
              <p className="text-3xl font-black text-slate-900 mt-2">128</p>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
              <p className="text-sm text-slate-500">At-Risk Alerts</p>
              <p className="text-3xl font-black text-amber-600 mt-2">14</p>
            </div>
            <div className="rounded-2xl bg-slate-900 p-5 text-white shadow-sm">
              <p className="text-sm text-slate-300">Course Completion</p>
              <p className="text-3xl font-black mt-2">91%</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
