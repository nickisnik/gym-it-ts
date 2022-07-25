import React, { useEffect, useState } from 'react'
import styles from '../styles/Exercise.module.css'
const exerciseJson = require('./exercises.json')
const Exercise = ({currExercise} : any) => {

    const exercises = exerciseJson.exercises
    
    const [exerciseData, setExerciseData] = useState(exercises[0])


    const [currentSet, setCurrentSet] = useState(0);
    
    const handleChangeRep = (e : any, index: number) => {
        let temp = {...exercises[currExercise]}
        temp.sets[index] = Number(e.target.value);
        setExerciseData(temp)
    }
    const handleChangeWeight = (e : any, index: number) => {
        let temp = {...exercises[currExercise]}
        temp.weight[index] = Number(e.target.value);
        setExerciseData(temp)
    }
    const handleSelect = (index : number) => {
        setCurrentSet(index)
    }

    // Display new data on previous and next exercises 
    useEffect(() => {
        localStorage.exerciseData = JSON.stringify(exerciseData)
        setExerciseData(exercises[currExercise])
    }, [currExercise])

    /* useEffect(() => {
        setExerciseData(JSON.parse(localStorage.exerciseData))
    }, []) */

  return (
    <div className={styles.exercise_wrapper}>
        <span className={styles.name}>{exercises[currExercise].name}</span>
        {/* <span className={styles.sets}>Sets</span> */}

        <ul className={styles.set_list}>
            {exercises[currExercise].sets.map((reps: number, index: number) => {
                return (
                    <li onClick={() => handleSelect(index)} className={currentSet === index ? `${styles.set_item} ${styles.current_set}` : `${styles.set_item}`} key={index}>
                        <div className={styles.set_number_wrapper}><span className={styles.set_number}>{index + 1}</span></div>
                        <select value={exerciseData.sets[index]} className={styles.reps_input} onChange={(e) => handleChangeRep(e, index)}>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select>
                        <span className={styles.reps_title}>reps</span>
                        <span className={styles.x}>x</span>
                        <input className={styles.weight_input} onChange={(e) => handleChangeWeight(e, index)} defaultValue={exercises[currExercise].weight[index]} type="number" />
                        <span className={styles.reps_title}>kg</span>
                    </li>
                )
            })}
        </ul>

    </div>
  )
}

export default Exercise