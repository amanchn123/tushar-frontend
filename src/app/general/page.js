'use client'
import React, { useState } from 'react'

export default function Page() {
    const[img,setImg]=useState()
    const handlesunbmit=async(e)=>{

        const selected=e.target.files[0]
       await setImg(URL.createObjectURL(selected));
       console.log('ii',img)
    }
    console.log('pp',img)
  return (
    <div>
      <input type='file' onChange={handlesunbmit}></input>
    </div>
  )
}
