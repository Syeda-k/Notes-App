import React from "react";
import NoteContext from "./notecontext";
import { useState } from "react";
const NotesState=()=>{
    
return (
    <NoteContext.Provider vlaue={ValidityState}>
        {props.children}
    </NoteContext.Provider>
)
}
export default NotesState;