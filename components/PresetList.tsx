import React from 'react'
import styles from '../styles/PresetList.module.css'
import PresetBoxes from './PresetBoxes'
const PresetList = () => {
  return (
    <div className={styles.preset_list__wrapper}>
        <span className={styles.title}>Filter Workouts</span>
       
        <ul className={styles.filter_wrapper}>
            <li className={styles.filter_tag}>Strength</li>
            <li className={styles.filter_tag}>Cardio</li>
            <li className={styles.filter_tag}>HIIT</li>
            <li className={styles.filter_tag}>Endurance</li>
        </ul>
        <PresetBoxes />
    </div>
  )
}

export default PresetList