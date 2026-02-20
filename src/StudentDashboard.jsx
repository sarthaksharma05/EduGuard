import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { jsPDF } from 'jspdf'
import { useAuth } from './context/AuthContext.jsx'
import { getLocalProfile } from './lib/localProfile.js'

function getDisplayName(user, localProfile) {
  return localProfile?.fullName || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Student'
}

function getAvatarUrl(user, localProfile) {
  return localProfile?.avatarUrl || user?.user_metadata?.avatar_url || ''
}

const kpiData = [
  { label: 'Attendance', value: '94%', trend: '+2.3%' },
  { label: 'Assignments Completed', value: '38/42', trend: '+5 this week' },
  { label: 'Average Score', value: '87.4', trend: '+1.8 points' },
  { label: 'Risk Level', value: 'Low', trend: 'Stable' },
]

const subjectData = [
  { subject: 'Mathematics', score: 91, attendance: 96, assignments: '11/12', status: 'On Track' },
  { subject: 'Physics', score: 84, attendance: 92, assignments: '9/10', status: 'Needs Focus' },
  { subject: 'Computer Science', score: 94, attendance: 98, assignments: '12/12', status: 'Excellent' },
  { subject: 'English', score: 80, attendance: 89, assignments: '6/8', status: 'Needs Focus' },
]

const alertsData = [
  { id: 1, title: 'English attendance dipped below 90%', severity: 'medium', time: '2h ago' },
  { id: 2, title: 'Physics quiz scheduled tomorrow at 10:00 AM', severity: 'low', time: '5h ago' },
  { id: 3, title: 'Assignment deadline: Calculus problem set', severity: 'high', time: 'Today' },
]

const activityData = [
  { id: 1, action: 'Completed AI practice set for Algebra', time: 'Today, 09:12 AM' },
  { id: 2, action: 'Submitted Physics Lab Report #4', time: 'Yesterday, 06:42 PM' },
  { id: 3, action: 'Logged 2 hours in Student AI revision mode', time: 'Yesterday, 04:18 PM' },
]

function getStatusChipClasses(status) {
  if (status === 'Excellent') return 'bg-emerald-100 text-emerald-700'
  if (status === 'Needs Focus') return 'bg-amber-100 text-amber-700'
  return 'bg-indigo-100 text-indigo-700'
}

function getSeverityClasses(severity) {
  if (severity === 'high') return 'bg-red-100 text-red-700'
  if (severity === 'medium') return 'bg-amber-100 text-amber-700'
  return 'bg-slate-100 text-slate-700'
}

export default function StudentDashboard() {
  const { user } = useAuth()
  const localProfile = getLocalProfile(user?.id)
  const name = getDisplayName(user, localProfile)
  const avatarUrl = getAvatarUrl(user, localProfile)
  const [totalClasses, setTotalClasses] = useState('60')
  const [attendedClasses, setAttendedClasses] = useState('54')
  const [classesLeft, setClassesLeft] = useState('20')
  const [targetAttendance, setTargetAttendance] = useState('75')

  const bunkCalc = useMemo(() => {
    const total = Number(totalClasses)
    const attended = Number(attendedClasses)
    const left = Number(classesLeft)
    const target = Number(targetAttendance)

    if ([total, attended, left, target].some((x) => Number.isNaN(x))) {
      return { valid: false, message: 'Please enter valid numbers.' }
    }
    if (total < 0 || attended < 0 || left < 0 || target <= 0 || target > 100) {
      return { valid: false, message: 'Use non-negative classes and target between 1 to 100.' }
    }
    if (attended > total) {
      return { valid: false, message: 'Attended classes cannot be greater than total classes.' }
    }

    const finalTotal = total + left
    const requiredFinalAttend = Math.ceil((target / 100) * finalTotal)
    const requiredAttendFromLeft = Math.max(0, requiredFinalAttend - attended)

    if (requiredAttendFromLeft > left) {
      return {
        valid: true,
        possible: false,
        message: `Target not possible. Need ${requiredAttendFromLeft} classes but only ${left} classes are left.`,
      }
    }

    const canBunk = left - requiredAttendFromLeft
    const projectedAttendance = ((attended + requiredAttendFromLeft) / finalTotal) * 100

    return {
      valid: true,
      possible: true,
      canBunk,
      mustAttend: requiredAttendFromLeft,
      projectedAttendance: projectedAttendance.toFixed(2),
    }
  }, [totalClasses, attendedClasses, classesLeft, targetAttendance])

  const downloadReportPdf = () => {
    const doc = new jsPDF()
    const lines = []

    lines.push('EduGuard AI - Student Report')
    lines.push(`Student: ${name}`)
    lines.push(`Email: ${user?.email || '-'}`)
    lines.push('')
    lines.push('KPI Summary:')
    kpiData.forEach((k) => lines.push(`- ${k.label}: ${k.value} (${k.trend})`))
    lines.push('')
    lines.push('Subject Performance:')
    subjectData.forEach((s) =>
      lines.push(
        `- ${s.subject}: Score ${s.score}, Attendance ${s.attendance}%, Assignments ${s.assignments}, Status ${s.status}`
      )
    )
    lines.push('')
    lines.push('Attendance Planner:')
    lines.push(`- Total Classes: ${totalClasses}`)
    lines.push(`- Attended Classes: ${attendedClasses}`)
    lines.push(`- Classes Left: ${classesLeft}`)
    lines.push(`- Target Attendance: ${targetAttendance}%`)
    if (!bunkCalc.valid) {
      lines.push(`- Result: ${bunkCalc.message}`)
    } else if (!bunkCalc.possible) {
      lines.push(`- Result: ${bunkCalc.message}`)
    } else {
      lines.push(`- Can bunk: ${bunkCalc.canBunk}`)
      lines.push(`- Must attend from left: ${bunkCalc.mustAttend}`)
      lines.push(`- Projected attendance: ${bunkCalc.projectedAttendance}%`)
    }
    lines.push('')
    lines.push('Priority Alerts:')
    alertsData.forEach((a) => lines.push(`- [${a.severity}] ${a.title} (${a.time})`))

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(12)
    doc.text(lines, 14, 16)
    doc.save(`student-report-${name.replace(/\s+/g, '-').toLowerCase()}.pdf`)
  }

  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-4rem)] pt-24 pb-12 px-6 bg-gradient-to-br from-[#edf4ff] via-white to-[#ddf7ff]">
      <div className="container mx-auto max-w-6xl">
        <div className="rounded-3xl bg-white/80 backdrop-blur-xl ring-1 ring-white p-6 md:p-8 shadow-[0_28px_60px_-30px_rgba(30,41,59,0.5)]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-indigo-700">Student Dashboard</p>
              <h1 className="text-3xl font-black text-slate-900 mt-1">Welcome back, {name}</h1>
              <p className="text-slate-600 mt-2">Your learning overview and AI actions are here.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/student-ai"
                className="inline-flex items-center justify-center rounded-full px-5 py-2.5 bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
              >
                Open Student AI
              </Link>
              <button
                type="button"
                onClick={downloadReportPdf}
                className="inline-flex items-center justify-center rounded-full px-5 py-2.5 bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
              >
                Download Report PDF
              </button>
              <Link
                to="/profile/edit"
                className="inline-flex items-center justify-center rounded-full px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-semibold hover:border-indigo-300 transition"
              >
                Edit Profile
              </Link>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiData.map((item) => (
              <div key={item.label} className="rounded-2xl bg-white p-4 shadow-sm border border-slate-100">
                <p className="text-sm text-slate-500">{item.label}</p>
                <p className="text-2xl font-black text-slate-900 mt-1">{item.value}</p>
                <p className="text-xs font-semibold text-emerald-600 mt-2">{item.trend}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100 md:col-span-2">
              <h2 className="font-bold text-slate-800">Profile Snapshot</h2>
              <div className="mt-4 flex items-center gap-4">
                {avatarUrl ? (
                  <img src={avatarUrl} alt={name} className="h-16 w-16 rounded-2xl object-cover ring-2 ring-indigo-100" />
                ) : (
                  <div className="h-16 w-16 rounded-2xl bg-indigo-100 text-indigo-700 grid place-items-center font-bold text-xl">
                    {name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-slate-900">{name}</p>
                  <p className="text-sm text-slate-500">{user?.email}</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-slate-900 p-5 text-white shadow-sm">
              <h3 className="font-bold">Attendance Planner</h3>
              <p className="mt-2 text-sm text-slate-300">Calculate how many classes you can bunk and still hit your target attendance.</p>
              <div className="mt-4 space-y-2 text-sm">
                <label className="block">
                  <span className="text-slate-300">Total classes</span>
                  <input
                    type="number"
                    min="0"
                    value={totalClasses}
                    onChange={(e) => setTotalClasses(e.target.value)}
                    className="mt-1 w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2 text-white outline-none"
                  />
                </label>
                <label className="block">
                  <span className="text-slate-300">Attended classes</span>
                  <input
                    type="number"
                    min="0"
                    value={attendedClasses}
                    onChange={(e) => setAttendedClasses(e.target.value)}
                    className="mt-1 w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2 text-white outline-none"
                  />
                </label>
                <label className="block">
                  <span className="text-slate-300">Classes left</span>
                  <input
                    type="number"
                    min="0"
                    value={classesLeft}
                    onChange={(e) => setClassesLeft(e.target.value)}
                    className="mt-1 w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2 text-white outline-none"
                  />
                </label>
                <label className="block">
                  <span className="text-slate-300">Target attendance %</span>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={targetAttendance}
                    onChange={(e) => setTargetAttendance(e.target.value)}
                    className="mt-1 w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2 text-white outline-none"
                  />
                </label>
              </div>
              <div className="mt-4 rounded-xl bg-slate-800/80 p-3 text-sm">
                {!bunkCalc.valid && <p className="text-amber-300">{bunkCalc.message}</p>}
                {bunkCalc.valid && !bunkCalc.possible && <p className="text-red-300">{bunkCalc.message}</p>}
                {bunkCalc.valid && bunkCalc.possible && (
                  <>
                    <p className="text-cyan-300 font-semibold">You can bunk {bunkCalc.canBunk} class(es).</p>
                    <p className="text-slate-300 mt-1">Must attend: {bunkCalc.mustAttend} of {classesLeft} remaining classes.</p>
                    <p className="text-slate-400 mt-1">Projected attendance: {bunkCalc.projectedAttendance}%</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100 lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-800">Subject Performance (Raw Data)</h3>
                <span className="text-xs text-slate-500">Updated just now</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-slate-500 border-b border-slate-100">
                      <th className="py-2 pr-3 font-semibold">Subject</th>
                      <th className="py-2 pr-3 font-semibold">Score</th>
                      <th className="py-2 pr-3 font-semibold">Attendance</th>
                      <th className="py-2 pr-3 font-semibold">Assignments</th>
                      <th className="py-2 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjectData.map((row) => (
                      <tr key={row.subject} className="border-b last:border-0 border-slate-100">
                        <td className="py-3 pr-3 font-semibold text-slate-800">{row.subject}</td>
                        <td className="py-3 pr-3 text-slate-700">{row.score}</td>
                        <td className="py-3 pr-3 text-slate-700">{row.attendance}%</td>
                        <td className="py-3 pr-3 text-slate-700">{row.assignments}</td>
                        <td className="py-3">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusChipClasses(row.status)}`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-800">Priority Alerts</h3>
              <div className="mt-4 space-y-3">
                {alertsData.map((alert) => (
                  <div key={alert.id} className="rounded-xl border border-slate-100 p-3">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm text-slate-700">{alert.title}</p>
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold capitalize ${getSeverityClasses(alert.severity)}`}>
                        {alert.severity}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">{alert.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800">Recent Activity</h3>
            <div className="mt-4 divide-y divide-slate-100">
              {activityData.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                  <p className="text-sm text-slate-700">{item.action}</p>
                  <p className="text-xs text-slate-500 whitespace-nowrap">{item.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
