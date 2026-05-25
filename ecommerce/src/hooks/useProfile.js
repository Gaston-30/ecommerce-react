import { useState, useEffect, useCallback } from "react"
import { supabase } from "../supabase"
import { useAuth } from "../context/AuthContext"

function useProfile() {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = useCallback(async () => {
    if (!user) {
      setProfile(null)
      setLoading(false)
      return
    }
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()
    setProfile(data)
    setLoading(false)
  }, [user])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  const updateProfile = async (updates) => {
    const { error } = await supabase
      .from("profiles")
      .upsert({ id: user.id, ...updates })
    if (!error) {
      setProfile((prev) => ({ ...prev, ...updates }))
    }
    return error
  }

  return { profile, loading, updateProfile, refetch: fetchProfile }
}

export default useProfile