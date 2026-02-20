import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import { getDashboardPathByRole, normalizeRole } from '../utils/authRole.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [role, setRoleState] = useState(null)
  const [loading, setLoading] = useState(true)

  const resolveRole = async (user) => normalizeRole(user?.user_metadata?.role)

  const setRoleInternal = async (nextRole) => {
    const normalized = normalizeRole(nextRole)
    if (!normalized) return { error: new Error('Invalid role value.') }

    const { error: metadataError } = await supabase.auth.updateUser({
      data: { role: normalized },
    })
    if (metadataError) return { error: metadataError }

    return { error: null }
  }

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return undefined
    }

    let mounted = true

    const initialize = async () => {
      const { data } = await supabase.auth.getSession()
      if (!mounted) return
      const nextSession = data.session ?? null
      setSession(nextSession)
      setRoleState(await resolveRole(nextSession?.user))
      setLoading(false)
    }

    initialize()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession ?? null)
      setRoleState(normalizeRole(nextSession?.user?.user_metadata?.role))
      setLoading(false)
    })

    return () => {
      mounted = false
      listener.subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    if (!supabase) {
      return { error: new Error('Supabase is not configured.') }
    }
    setRoleState(null)
    return supabase.auth.signOut()
  }

  const setRole = async (nextRole = 'student') => {
    if (!supabase || !session?.user) {
      return { error: new Error('You must be logged in to set a role.') }
    }

    const normalized = normalizeRole(nextRole)
    const { error } = await setRoleInternal(normalized)
    if (error) return { error }

    setRoleState(normalized)
    return { error: null }
  }

  const value = useMemo(
    () => ({
      session,
      user: session?.user ?? null,
      role,
      loading,
      signOut,
      setRole,
      getDashboardPath: () => getDashboardPathByRole(role),
    }),
    [session, role, loading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
