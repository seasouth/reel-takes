import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Provider } from 'react-redux'
import store from '@/src/reducer/store'
import DashboardHeader from '@/src/components/DashboardHeader'
import HomePage from '@/src/components/HomePage'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

const Home = () => {
  return (
    <>
      <Head>
        <title>Reel Takes</title>
        <meta name="description" content="Reel Takes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/reel.svg" />
      </Head>
      <main className={styles.main}>
        <div className={styles.App}>
          <DashboardHeader />
          <HomePage />
        </div>
      </main>
    </>
  )
}

export default Home;
