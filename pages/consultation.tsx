import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'
import ConsultationFlow from '../components/ConsultationFlow'
import styles from '../styles/Consultation.module.css'

const Consultation: NextPage = () => {
  const [user, setUser] = useState<any>(null)
  const [userType, setUserType] = useState<'doctor' | 'patient' | null>(null)

  useEffect(() => {
    const user = supabase.auth.user()
    setUser(user)
    // In a real app, you'd fetch the user type from your database
    // This is a placeholder implementation
    setUserType(Math.random() > 0.5 ? 'doctor' : 'patient')
  }, [])

  if (!user) {
    return <div>Please sign in to start a consultation.</div>
  }

  if (!userType) {
    return <div>Loading...</div>
  }

  return (
    <div className={styles.container}>
      <h1>Consultation Room</h1>
      <ConsultationFlow userType={userType} />
    </div>
  )
}

export default Consultation