import React, { useEffect, useState, useRef } from 'react'
import Controls from '../../components/Controls'
import SetList from '../../components/SetList'
import ExerciseName from '../../components/ExerciseName'
import styles from '../../styles/Exercise.module.css'
import { useRouter } from 'next/router'
const exerciseJson = require('../../components/exercises.json')

const Preset = () => {
    //const [presetIndex, setPresetIndex] = useState<number | undefined>()
    const router = useRouter();
    type ExerciseData = {
        name: string,
        sets: number[],
        weight: number[]
    }
    const [exerciseData, setExerciseData] = useState<ExerciseData[] | null>(null)
    const [data, setData] = useState<any>()

    // const data = useStore((state : any) => state.data)
    // const setData = useStore((state : any) => state.setData)

    const addExercise = (index : number) => {
        if(!exerciseData) return
        const newExercise = {
            name: 'New exercise',
            sets: [1],
            weight: [10]
        }
        let temp = [...exerciseData]
        temp.splice(index + 1, 0, newExercise)
        setExerciseData(temp)
    }
    const {preset} = router.query;
    useEffect(() => {
        if(!router.isReady) return
        const index = Number(preset)
        console.log(preset)
        //setExerciseData(data.presets[presetIndex].exercises)
        console.log(exerciseJson)
        const data = localStorage.getItem('exerciseData');
        if(data) {
            const parsedData = JSON.parse(data)
            setData(parsedData)
            if(parsedData.presets[index]) {
                setExerciseData(parsedData.presets[index].exercises)
            }
        }
        // else if() {
        //     setExerciseData(exerciseJson.presets[presetIndex].exercises)
        // }
    }, [router.isReady])
    
    useEffect(() => {
        if(exerciseData) {
            let temp = {...data}
            temp.presets[Number(preset)].exercises = exerciseData
            localStorage.exerciseData = JSON.stringify(temp)
        }
        console.log('data not updated, add relevant logic')
    }, [exerciseData])


  return (
    <>
    <div className={styles.carousel}>
        {exerciseData?.map((item, index) => {
            return (
                <div key={index} className={styles.exercise_wrapper}>
                    <ExerciseName exerciseData={exerciseData} currExercise={index} setExerciseData={setExerciseData} />
                    <SetList currExercise={index} exerciseData={exerciseData} setExerciseData={setExerciseData} />
                    <button onClick={() => addExercise(index)} className={styles.control_btn}>Add exercise</button>
                </div>
            )
        })}
    </div>

    </>
  )
}


export default Preset