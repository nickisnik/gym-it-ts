import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/PresetOverview.module.css'
import Link from 'next/link'

const PresetOverview = () => {
    type Preset = {
      name: string,
      exercises: any
    }
    const [editMode, setEditMode] = useState(false);
    const router = useRouter();
    const [name, setName] = useState()
    const [data, setData] = useState<any>()
    //const [preset, setPreset] = useState<Preset>()
    const {id} = router.query;
    const preset = data ? data.presets[Number(id)] : undefined
    useEffect(() => {
      const localData = localStorage.exerciseData;
      if(localData) {
        setData(JSON.parse(localData))
        //setPreset(JSON.parse(localData).presets[Number(id)] )
      }   
    }, [router.isReady])

    const toggleEdit = () => {
      if(editMode) {
        const temp = {...data}
        const index = Number(id);
        temp.presets[Number(id)].name = name;
        localStorage.exerciseData = JSON.stringify(temp)
      } else {
        setName(preset?.name)
      }
      setEditMode((prev) => !prev)
    }
    const handleDelete = () => {
      router.push('/')
      const temp = {...data};
      const index = Number(id);
      temp.presets.splice(index, 1);
      localStorage.exerciseData = JSON.stringify(temp);
    }
    const handleChange = (e : any) => {
      setName(e.target.value)
    }

  return (
    <div className={styles.preset_wrapper}>
      <div className={styles.name_wrapper}>
        {!editMode ? <h2 className={styles.preset_name}>{preset?.name}</h2> :
                      <input type="text" onChange={handleChange} value={name} className={styles.name_input} />}
      </div>
      {preset?.exercises.map((item : any, index : number) => {
        return (
          <div className={styles.exercise_wrapper}>
            <span className={styles.exercise_name}>{item.name}</span>
            <span className={styles.exercise_sets}>{item.sets.length} sets</span>
          </div>
        )
      })}
      <button className={styles.edit} onClick={toggleEdit}>{!editMode ? 'Edit' : 'Save'}</button>
      {!editMode ?  <Link href={"/session/" + id}><a className={styles.start_workout}>Start workout</a></Link> : (
                    <button className={styles.delete_btn} onClick={handleDelete}>Delete</button>
      )}

    </div>
  )
}

export default PresetOverview