import React, {useState, useEffect, useRef} from 'react'
import styles from '../styles/Exercise.module.css'

const ExerciseName = ({exerciseData, currExercise, setExerciseData} : any) => {
    const [exerciseName, setExerciseName] = useState('')
    const [nameEdit, setNameEdit] = useState(false)
    const handleNameChange = (e : any) => {
        setExerciseName(e.target.value)
    }
    const nameRef = useRef<HTMLInputElement | null>(null)
    useEffect(() => {
        // When in edit mode
        if(nameEdit) {
            if(!exerciseData) return
            setExerciseName(exerciseData[currExercise].name)

            // Automatically focus on the input once it appears
            if(nameRef.current) {
                nameRef.current.focus()
            }
        }   
        // If exiting edit mode
        if(!nameEdit) {
            if(!exerciseData) return
            if(exerciseName === '') return
            const temp = [...exerciseData]
            temp[currExercise].name = exerciseName;
            setExerciseData(temp)
        }
    }, [nameEdit])
  return (
    <>
        {nameEdit ?
        (<input className={styles.name_input} ref={nameRef} type="text" onChange={handleNameChange} value={exerciseName} onBlur={() => setNameEdit(false)} />) 
            :
        (<span onClick={() => setNameEdit(true)} className={styles.name}>
            {exerciseData && exerciseData[currExercise]?.name}
        </span>)
        }   
    </>
  )
}

export default ExerciseName