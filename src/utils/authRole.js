export const USER_ROLES = {
  STUDENT: 'student',
}

export function normalizeRole(role) {
  if (!role || typeof role !== 'string') return null
  const value = role.trim().toLowerCase()
  if (value === USER_ROLES.STUDENT) return value
  return null
}

export function getDashboardPathByRole(role) {
  return '/student-dashboard'
}
