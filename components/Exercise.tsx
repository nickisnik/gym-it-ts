import React, { useEffect, useState, useRef } from 'react'
import Controls from './Controls'
import SetList from './SetList'
import styles from '../styles/Exercise.module.css'
import { motion, AnimatePresence } from "framer-motion"
const exerciseJson = require('./exercises.json')
const exercises = exerciseJson.exercises

const Exercise = () => {
    type ExerciseData = {
        name: string,
        sets: number[],
        weight: number[]
    }
    
    const [[currExercise, direction], setCurrExercise] = useState([0, 0]);
    const [exerciseData, setExerciseData] = useState<ExerciseData[] | null>(null)
    //const [currentSet, setCurrentSet] = useState(0);
    const [exerciseName, setExerciseName] = useState('')
    const nameRef = useRef<HTMLInputElement | null>(null)


    const [nameEdit, setNameEdit] = useState(false)
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
            const temp = [...exerciseData]
            temp[currExercise].name = exerciseName;
            setExerciseData(temp)
        }
    }, [nameEdit])
    // const handleSelect = (index : number) => {
    //     setCurrentSet(index)
    // }
    const addSet = () => {
        if(!exerciseData) return
        const temp = [...exerciseData]
        temp[currExercise].sets.push(1)
        temp[currExercise].weight.push(0)
        setExerciseData(temp)
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
        console.log('data updated')
    }, [exerciseData])
    
    // To determine the swipe direction
    const previousExercise = useRef<any>()
    //const direction = currExercise > previousExercise.current ? 1 : -1
    useEffect(() => {
        previousExercise.current = currExercise
        console.log(direction)
    }, [currExercise])
    const variants = {
        enter: (direction: number) => {
          return {
            x: direction > 0 ? 400 : -400,
            opacity: 0
          };
        },
        center: {
          zIndex: 1,
          x: 0,
          opacity: 1
        },
        exit: (direction: number) => {
          return {
            zIndex: 0,
            x: direction < 0 ? 400 : -400,
            opacity: 0
          };
        }
      };

      const changeExercise = (newIndex: number) => {
        if(newIndex === - 1 && currExercise === 0) return
        if(newIndex === 1 && currExercise === exercises.length - 1) return
        setCurrExercise((prev) => [prev[0] + newIndex, newIndex])
      }
    //


    // Save new name when exiting edit mode

     const editableName = (nameEdit ?
        <input className={styles.name_input} ref={nameRef} type="text" onChange={handleNameChange} value={exerciseName} onBlur={() => setNameEdit(false)} /> 
        :
        <span onClick={() => setNameEdit(true)} className={styles.name}>
            {exerciseData && exerciseData[currExercise]?.name}
        </span>)

  return (
    <>
    <Controls currExercise={currExercise} setCurrExercise={setCurrExercise} exerciseData={exerciseData} setExerciseData={setExerciseData} />
    <div>
        <AnimatePresence exitBeforeEnter initial={false} custom={direction}>
                <motion.div
                        drag="x"
                        dragConstraints={{left: 0, right: 0}}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            if(offset.x > 80) {
                                changeExercise(-1)
                            } else if (offset.x < -80) {
                                changeExercise(1)
                            }
                        }}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        key={currExercise}
                        transition={{duration: 0.15}}
                        className={styles.exercise_wrapper}>
                    {editableName}
                    <SetList currExercise={currExercise} setCurrExercise={setCurrExercise} exerciseData={exerciseData} setExerciseData={setExerciseData} />
                    <svg onClick={addSet} className={styles.plus_svg} fill="currentColor" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="150px" height="150px">    <path d="M25,2C12.317,2,2,12.317,2,25s10.317,23,23,23s23-10.317,23-23S37.683,2,25,2z M37,26H26v11h-2V26H13v-2h11V13h2v11h11V26z"/></svg>
                </motion.div>
        </AnimatePresence>
    </div>

    </>
  )
}


export default Exercise