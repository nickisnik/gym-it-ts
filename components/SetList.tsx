import React, {useState, useEffect} from 'react'
import styles from '../styles/Exercise.module.css'
import { motion, AnimatePresence } from "framer-motion"

const SetList = ({currExercise, setCurrExercise, exerciseData, setExerciseData} : any) => {
    const weight = exerciseData && exerciseData[currExercise]?.weight;
    const sets = exerciseData && exerciseData[currExercise]?.sets;
    const [editMode, setEditMode] = useState(false)
    const handleChangeRep = (e : any, index: number) => {
        if(!exerciseData) return
        let temp = [...exerciseData]
        temp[currExercise].sets[index] = Number(e.target.value);
        setExerciseData(temp)
    }
    const handleChangeWeight = (e : any, index: number) => {
        if(!exerciseData) return
        let newWeightString = e.target.value;
        // Format weight, delete 0 in the front
        if(newWeightString.split('').length > 1) {
            if(newWeightString.split('')[0] === '0') {
                newWeightString = newWeightString.split('').slice(1).join('')
            }
        }

        //
        let temp = [...exerciseData]
        temp[currExercise].weight[index] = Number(newWeightString);
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
                setCurrExercise((prev : [number, number]) => [prev[0] - 1, -1])
            }
            setExerciseData(tempData)
        }
    }
    useEffect(() => {
        setEditMode(false)
        if(!exerciseData) return
        //setExerciseName(exerciseData[currExercise].name)
    }, [currExercise])
    
   

  return (
    <ul className={styles.set_list}>
        {exerciseData && sets?.map((reps: number, index: number) => {
            return (
                
                    <li onDoubleClick={handleDoubleClick} className={styles.set_item} key={index}>
                        <div onClick={() => handleSetDelete(index)} className={!editMode ? `${styles.set_number_wrapper}` : `${styles.set_number_wrapper} ${styles.set_delete_btn}`}><span className={styles.set_number}>{!editMode ? index + 1 : 'x'}</span></div>
                    
                        <select value={sets[index]} className={styles.reps_input} onChange={(e) => handleChangeRep(e, index)}>
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
                        <input className={styles.weight_input} onChange={(e) => handleChangeWeight(e, index)} value={weight[index] === 0 ? '' : weight[index]} type="number" />
                        <span className={styles.reps_title}>kg</span>
                    </li>
                
            )
            })}
        
    </ul>
  )
}

export default SetList