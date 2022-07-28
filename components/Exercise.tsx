import React, { useEffect, useState } from 'react'
import Controls from './Controls'
import styles from '../styles/Exercise.module.css'
const exerciseJson = require('./exercises.json')

const Exercise = () => {

    const [currExercise, setCurrExercise] = useState(0);
    const exercises = exerciseJson.exercises


    type ExerciseData = {
        name: string,
        sets: number[],
        weight: number[]
    }
    
    const [exerciseData, setExerciseData] = useState<ExerciseData[] | null>(null)
    

    const [currentSet, setCurrentSet] = useState(0);
    const [editMode, setEditMode] = useState(false)
    const [exerciseName, setExerciseName] = useState('')
    
    const handleChangeRep = (e : any, index: number) => {
        if(!exerciseData) return
        let temp = [...exerciseData]
        temp[currExercise].sets[index] = Number(e.target.value);
        setExerciseData(temp)
    }
    const handleChangeWeight = (e : any, index: number) => {
        if(!exerciseData) return
        let temp = [...exerciseData]
        temp[currExercise].weight[index] = Number(e.target.value);
        setExerciseData(temp)
    }
    const handleSelect = (index : number) => {
        setCurrentSet(index)
    }
    const addSet = () => {
        if(!exerciseData) return
        const temp = [...exerciseData]
        temp[currExercise].sets.push(1)
        temp[currExercise].weight.push(0)
        setExerciseData(temp)
    }
    const handleDoubleClick = () => {
        setEditMode((prev) => !prev)
    }
    const handleSetDelete = (setIndex : number) => {
        if(!exerciseData) return
        if(editMode) {
            const tempData = [...exerciseData] 
            // Delete selected reps and weight column
            tempData[currExercise].sets.splice(setIndex, 1)
            tempData[currExercise].weight.splice(setIndex, 1)
            // Delete exercise if all sets are removed
            if(tempData[currExercise].sets.length === 0) {
                tempData.splice(currExercise, 1)
                setCurrExercise((prev) => prev - 1)
            }
            setExerciseData(tempData)
        }
    }
    const handleNameChange = (e : any) => {
        setExerciseName(e.target.value)
    }

    useEffect(() => {
        const data = localStorage.getItem('exerciseData');
        if(data) {
            const parsedData = JSON.parse(data)
            setExerciseData(parsedData.exercises)
        } else {
            setExerciseData(exercises)
        }
    }, [])
    
    useEffect(() => {
        if(exerciseData) {
            localStorage.exerciseData = JSON.stringify({
                "exercises": exerciseData
            })
        }
    }, [exerciseData])
    useEffect(() => {
        setEditMode(false)
        if(!exerciseData) return
        setExerciseName(exerciseData[currExercise].name)
    }, [currExercise])

    // Save new name when exiting edit mode
    useEffect(() => {
        if(!exerciseData) return
        const temp = [...exerciseData]
        temp[currExercise].name = exerciseName;
        setExerciseData(temp)
    }, [editMode])

    const plusSVG = <svg onClick={addSet} className={styles.plus_svg} fill="currentColor" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="150px" height="150px">    <path d="M25,2C12.317,2,2,12.317,2,25s10.317,23,23,23s23-10.317,23-23S37.683,2,25,2z M37,26H26v11h-2V26H13v-2h11V13h2v11h11V26z"/></svg>

    const editableName = editMode ? <input className={styles.name_input} type="text" onChange={handleNameChange} value={exerciseName} /> : exerciseData && exerciseData[currExercise].name

  return (
    <div className={styles.exercise_wrapper}>
        <span onDoubleClick={handleDoubleClick} className={styles.name}>{editableName}</span>

        <ul className={styles.set_list}>
            {exerciseData && exerciseData[currExercise]["sets"].map((reps: number, index: number) => {
                return (
                    <li onDoubleClick={handleDoubleClick} onClick={() => handleSelect(index)} className={currentSet === index ? `${styles.set_item} ${styles.current_set}` : `${styles.set_item}`} key={index}>

                        <div onClick={() => handleSetDelete(index)} className={!editMode ? `${styles.set_number_wrapper}` : `${styles.set_number_wrapper} ${styles.set_delete_btn}`}><span className={styles.set_number}>{!editMode ? index + 1 : 'x'}</span></div>
                        
                        <select value={exerciseData[currExercise].sets[index]} className={styles.reps_input} onChange={(e) => handleChangeRep(e, index)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
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
                        <input className={styles.weight_input} onChange={(e) => handleChangeWeight(e, index)} value={exerciseData[currExercise].weight[index]} type="number" />
                        <span className={styles.reps_title}>kg</span>
                    </li>
                )
            })}
        </ul>
        {plusSVG}
        <Controls currExercise={currExercise} setCurrExercise={setCurrExercise} exerciseData={exerciseData} setExerciseData={setExerciseData} />

    </div>
  )
}


export default Exercise