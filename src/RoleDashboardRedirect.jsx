import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext.jsx'

export default function RoleDashboardRedirect() {
  const { getDashboardPath } = useAuth()
  return <Navigate to={getDashboardPath()} replace />
}
