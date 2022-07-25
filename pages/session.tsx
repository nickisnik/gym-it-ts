import React, {useState} from 'react'
import styles from '../styles/Session.module.css'
import Exercise from '../components/Exercise'
const exerciseJson = require('../components/exercises.json')

const Session = () => {
  const [currExercise, setCurrExercise] = useState(0);
  const exercises = exerciseJson.exercises

  const handleControl = (control: string) => {
    if(control === 'previous') {
      if(currExercise === 0) return
      setCurrExercise((curr) => curr - 1)
      return
    }  
    if(currExercise >= exercises.length - 1) return
    setCurrExercise((curr) => curr + 1)
  }

  return (
    <div className={styles.session_wrapper}>
        <Exercise currExercise={currExercise} />
        <section className={styles.exercise_controls}>
          <button className={styles.control_btn} disabled={currExercise === 0 ? true : false} onClick={() => handleControl('previous')}>Previous</button>
          <button className={styles.control_btn} disabled={currExercise === exercises.length - 1 ? true : false} onClick={() => handleControl('next')}>Next</button>
        </section>
    </div>
  )
}

export default Session