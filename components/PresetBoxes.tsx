import React from 'react'
import styles from '../styles/PresetList.module.css'
import Link from 'next/link'

const PresetBoxes = () => {

    const presets = [
        {
            name: "Legs",
            exercises: 10,
            next: true    
        },
        {
            name: "Push",
            exercises: 7,
            next: false    
        },
        {
            name: "Pull",
            exercises: 6,
            next: false    
        },
    ]
  return (
    <div className={styles.preset_boxes_list}>
        {presets.map((item) => {
            return (
                <Link href="/session">
                    <div className={styles.preset_box}>
                        <div className={styles.preset_img} >
                        <img src="/squat.jpg" alt="" />
                        </div>
                        <div className={styles.preset_details__wrapper}>
                            <span className={styles.preset_name}>
                                {item.name}
                            </span>
                            <span className={styles.preset_exercises}>{item.exercises} exercises</span>
                            {item.next? <span className={styles.preset_upcoming}>Upcoming</span> : ''}
                        </div>
                    </div>
                </Link>
            )
        })}
    </div>
  )
}

export default PresetBoxes