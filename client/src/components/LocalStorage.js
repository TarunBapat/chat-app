import React, { useState } from 'react'

export default function LocalStorage() {
const [user,setUser]=useState('')
const [checked,setChecked]=useState(false);

const submitHandler=(e)=>{
    e.preventDefault();
    localStorage.setItem('checked',checked);
    localStorage.setItem('user',checked?user:'')
}
const removeUserHandler=(e)=>{
    e.preventDefault()
    localStorage.removeItem('user',user)
}
  return (
    <div>
      <form>
          <input type="text" value={user} onChange={(e)=>setUser(e.target.value)} />
          <input type="checkbox" checked={checked} onChange={(e)=>setChecked(!checked)}/>
          <button onClick={submitHandler}>submit</button>
          <button onClick={removeUserHandler}>removeUser</button>
          
      </form>
    </div>
  )
}
