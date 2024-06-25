import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'
import styles from '../styles/Dashboard.module.css'

const Dashboard: NextPage = () => {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const user = supabase.auth.user()
    setUser(user)
  }, [])

  if (!user) {
    return <div>Please sign in to view your dashboard.</div>
  }

  return (
    <div className={styles.container}>
      <h1>Welcome to your Dashboard</h1>
      <p>Email: {user.email}</p>
      <h2>Your Upcoming Consultations</h2>
      {/* Add logic to fetch and display upcoming consultations */}
      <h2>Your Past Consultations</h2>
      {/* Add logic to fetch and display past consultations */}
      <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
    </div>
  )
}

export default Dashboard