import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { supabase } from '../utils/supabase'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // Handle auth state changes here
        console.log(event, session)
      }
    )

    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe()
      }
    }
  }, [])

  return <Component {...pageProps} />
}

export default MyApp