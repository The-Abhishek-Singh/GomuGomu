"use client"
import { NavbarDemo } from '@/Components/Main/NavbarDemo'
import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Ship } from '@/Components/Elements/Ship'
import React from 'react'


const Hero = () => {
  return (
      <div className='my-40'>
  
     
  
  <div className='h-[100vh] w-[100vw] '>
  
   <Canvas>
    <Environment preset="warehouse" />
    <OrbitControls />

    <Ship />
    

   </Canvas>
  
  </div>
  
  
      </div>
  )
}

export default Hero