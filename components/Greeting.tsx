import React from 'react'
import styles from '../styles/Greeting.module.css'

const Greeting = () => {
  return (
    <div className={styles.greeting_wrapper}>
        <span className={styles.greeting_name}>Hello, Nick</span>
        <span className={styles.greeting_title}>Did you do <br/> anything today?</span>
        
        <div className={styles.stats_wrapper}>
            <section className={styles.stats_section}>
                <span className={styles.stat__section_title}>Weight</span>
                <span className={styles.stat__section_detail}>82.5 <span className={styles.stat_metric_unit}>kg</span></span>
            </section>
            <section className={styles.stats_section}>
                <span className={styles.stat__section_title}>Distance</span>
                <span className={styles.stat__section_detail}>6 <span className={styles.stat_metric_unit}>km</span></span>
            </section>
            <section className={styles.stats_section}>
                <span className={styles.stat__section_title}>Max H/R</span>
                <span className={styles.stat__section_detail}>180 <span className={styles.stat_metric_unit}>bpm</span></span>
            </section>
            
        </div>

    </div>
  )
}

export default Greeting