import { supabase } from './supabaseClient.js'
import { USER_ROLES } from '../utils/authRole.js'

export async function upsertUserProfile({
  userId,
  email,
  role = USER_ROLES.STUDENT,
  fullName = '',
  avatarUrl = '',
}) {
  if (!supabase) {
    return { error: new Error('Supabase is not configured.') }
  }

  if (!userId || !email) {
    return { error: new Error('Missing required profile fields.') }
  }

  const payload = {
    id: userId,
    email,
    role,
    full_name: fullName,
    avatar_url: avatarUrl,
  }

  const { error } = await supabase.from('profiles').upsert(payload)
  if (!error) return { error: null }

  if (error.message?.includes("Could not find the table 'public.profiles'")) {
    return {
      error: new Error(
        "Supabase table missing: create public.profiles first, then retry profile sync."
      ),
    }
  }

  return { error }
}
