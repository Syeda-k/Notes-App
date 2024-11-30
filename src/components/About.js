import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import noteContext from '../context/notes/notecontext'
const About = () => {
    const a =useContext()
    useEffect(()=>{
        a.update()
    },[])
  return (
    <div>
      this is about {a.state.name} and he is in class {a.sate.class}
    </div>
  )
}

export default About
