import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Healthcare Platform</title>
        <meta name="description" content="Connect with doctors online" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to our Healthcare Platform
        </h1>

        <p className={styles.description}>
          Connect with doctors online for consultations
        </p>

        <div className={styles.grid}>
          <Link href="/dashboard">
            <a className={styles.card}>
              <h2>Dashboard &rarr;</h2>
              <p>Access your personal dashboard</p>
            </a>
          </Link>

          <Link href="/consultation">
            <a className={styles.card}>
              <h2>Start Consultation &rarr;</h2>
              <p>Begin a new consultation with a doctor</p>
            </a>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Home