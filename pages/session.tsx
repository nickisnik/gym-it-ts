import React, {useState} from 'react'
import styles from '../styles/Session.module.css'
import Exercise from '../components/Exercise'
const exerciseJson = require('../components/exercises.json')

const Session = () => {
  

  return (
    <div className={styles.session_wrapper}>
        <Exercise />
        
    </div>
  )
}

export default Session