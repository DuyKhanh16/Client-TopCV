import React from 'react'
import Header from '../Header/Header'
import Fotter from '../Fotter/Fotter'
import Intro from '../Intro/Intro'
import Boydy from '../Body/Boydy'

export default function 
() {
  return (
    <div className='w-full '>
        <Header></Header>
        {/* <Intro></Intro> */}
        <Boydy></Boydy>
        <Fotter></Fotter>
    </div>
  )
}
