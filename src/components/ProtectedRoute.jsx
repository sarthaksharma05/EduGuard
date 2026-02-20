import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { USER_ROLES } from '../utils/authRole.js'

export default function ProtectedRoute({ children }) {
  const { user, role, loading } = useAuth()

  if (loading) {
    return (
      <section className="min-h-[calc(100vh-4rem)] pt-24 px-6">
        <div className="container mx-auto max-w-5xl">Checking access...</div>
      </section>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (role !== USER_ROLES.STUDENT) {
    return <Navigate to="/login" replace />
  }

  return children
}
