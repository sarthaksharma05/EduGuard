const STORAGE_PREFIX = 'eduguard_local_profile_'

function getStorageKey(userId) {
  return `${STORAGE_PREFIX}${userId}`
}

export function getLocalProfile(userId) {
  if (!userId || typeof window === 'undefined') return null

  try {
    const raw = window.localStorage.getItem(getStorageKey(userId))
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return {
      fullName: parsed?.fullName || '',
      avatarUrl: parsed?.avatarUrl || '',
    }
  } catch {
    return null
  }
}

export function saveLocalProfile(userId, { fullName = '', avatarUrl = '' }) {
  if (!userId || typeof window === 'undefined') return

  const payload = JSON.stringify({
    fullName: fullName.trim(),
    avatarUrl: avatarUrl.trim(),
  })

  window.localStorage.setItem(getStorageKey(userId), payload)
}
