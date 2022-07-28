import React from 'react'
import styles from '../styles/Controls.module.css'


const Controls = ({currExercise, exerciseData, setCurrExercise, setExerciseData} : any) => {
    const handleControl = (control: string) => {
        // Previous
        if(control === 'previous') {
          if(currExercise === 0) return
          setCurrExercise((curr : any) => curr - 1)
          return
        }  
        // Add new exercise
        if(currExercise === exerciseData?.length - 1) {
            addExercise()
            return
        }
        // Next
        setCurrExercise((curr : any) => curr + 1)
    }
    const addExercise = () => {
        const tempData = [...exerciseData]
        tempData.push({
            name: 'New exercise',
            sets: [1],
            weight: [10]
        })
        setExerciseData(tempData)
        setCurrExercise((prev:number) => prev + 1)
    }

    return (
    <section className={styles.exercise_controls}>
        <button className={styles.control_btn} disabled={currExercise === 0 ? true : false} onClick={() => handleControl('previous')}>Previous</button>
        <button className={styles.control_btn} disabled={currExercise === exerciseData?.length ? true : false} onClick={() => handleControl('next')}>{currExercise >= exerciseData?.length - 1 ? 'Add exercise' : 'Next'}</button>
    </section>
    )
}

export default Controls