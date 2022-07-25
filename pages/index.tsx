import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import NavBar from '../components/NavBar'
import Greeting from '../components/Greeting'
import PresetList from '../components/PresetList'


const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Greeting />
      <PresetList />
    </div>
  )
}

export default Home
