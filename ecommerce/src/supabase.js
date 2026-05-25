import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://nzegumagandbgmcsmzfr.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56ZWd1bWFnYW5kYmdtY3NtemZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzODAwOTksImV4cCI6MjA5NDk1NjA5OX0.Pc1vSk7oyaSxW8j-Vw-Wi_q7_iR_byzJtVyPQ4mC6AM" 

export const supabase = createClient(supabaseUrl, supabaseKey)