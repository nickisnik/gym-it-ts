import React, {useState, useEffect} from 'react'
import styles from '../styles/Session.module.css'
import Preset from './[preset]'
import { useRouter } from 'next/router'
const exerciseJson = require('../components/exercises.json')

const Session = () => {
  const [presetIndex, setPresetIndex] = useState<Number>()
  const router = useRouter();
  const {id} = router.query;
  useEffect(() => {
      setPresetIndex(Number(id))
  }, [id])

  const changeData = () => {
    const data = localStorage.getItem('exerciseData')
    if(data) {
      const parsed = JSON.parse(data)
      parsed.presets.push({
        name: "Legs",
        exercises:
            [{
                "name": "New",
                "sets": [69, 69, 69],
                "weight": [69, 69, 69]
            }, {
                "name": "New",
                "sets": [10, 9, 8, 8],
                "weight": [70, 70, 70, 65]
            }]
          
      })
      localStorage.exerciseData = JSON.stringify(parsed)
    }
    
  }

  return (
    <div className={styles.session_wrapper}>
        {/* <Preset presetIndex={presetIndex} /> */}
        <button onClick={changeData}>Change</button>
    </div>
  )
}

export default Session