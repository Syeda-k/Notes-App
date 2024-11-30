import React from "react";
import NoteContext from "./notecontext";
import { useState } from "react";
const NotesState=()=>{
    const s1={
        "name":"Kiran",
          "class":"5b"  
    }
    const [state, setState]=useState(s1);
    const update=()=>{
        setTimeout(()=>{
            setState({...state,name:"John"})
        },1000)
    }
return (
    <NoteContext.Provider vlaue={{state, update}}>
        {props.children}
    </NoteContext.Provider>
)
}
export default NotesState;