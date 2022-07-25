import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/NavBar.module.css'

const NavBar = () => {
  return (
    <nav className={styles.navbar_container}>
        <Link href="/">
          <svg className={styles.menu_icon} width="25" height="12" viewBox="0 0 25 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="16" height="3" rx="1.5" fill="currentColor"/>
              <rect y="9" width="25" height="3" rx="1.5" fill="currentColor"/>
          </svg>
        </Link>
        <div className={styles.profile_photo_wrapper}>
            <Image src='/profile.jpeg' layout="fill" className={styles.profile_photo} />
        </div>

    </nav>
  )
}

export default NavBar