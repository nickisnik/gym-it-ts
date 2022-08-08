import React, { useEffect, useState } from 'react'
import styles from '../styles/PresetList.module.css'
import Link from 'next/link'
const json = require('./exercises.json')

const PresetBoxes = () => {
    type Data = {
        presets: {}[]
    }
    const [data, setData] = useState<Data | null>(null)
    useEffect(() => {
        const localData = localStorage.getItem('exerciseData') 
        if(localData) {
            console.log(typeof(localData))
            setData(JSON.parse(localData))
        } else {
            localStorage.exerciseData = JSON.stringify(json)
        }
        
    }, [])
    const presets = data?.presets

    const handleAdd = () => {
        if(!data) return
        let temp = {...data};
        temp.presets.push({
            name: 'New preset',
            exercises: [{name: 'new', sets: [], weight: []}]
        })
        localStorage.exerciseData = JSON.stringify(temp)
        setData(temp)
    }

  return (
    <div className={styles.preset_boxes_list}>
        {presets && presets.map((item : any, index : any) => {
            return (
                <Link href={`/presets/${index}`} key={index}>
                    <div className={styles.preset_box} key={index}>
                        <div className={styles.preset_img} >
                        <img src="/squat.jpg" alt="" />
                        </div>
                        <div className={styles.preset_details__wrapper}>
                            <span className={styles.preset_name}>
                                {item.name}
                            </span>
                            <span className={styles.preset_exercises}>{item.exercises.length} exercises</span>
                            <span className={styles.preset_upcoming}>Upcoming</span>
                        </div>
                    </div>
                </Link>
            )
        })}
        <button className={styles.add_preset} onClick={handleAdd}>Add preset</button>
    </div>
  )
}

export default PresetBoxes