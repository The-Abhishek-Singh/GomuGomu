"use client"
import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import { Ship } from '@/Components/Elements/Ship'
import { Sky } from '@/Components/Elements/Sky'

// ✅ Fixed scroll-based camera controller
const CameraController = () => {
  const { camera } = useThree()
  const scrollRef = useRef(0)
  const targetAngle = useRef(0)
  const currentAngle = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY
      // Convert scroll to angle - adjust multiplier for sensitivity
      targetAngle.current = scrollRef.current * 0.01
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useFrame(() => {
    // Smooth interpolation for camera movement
    currentAngle.current += (targetAngle.current - currentAngle.current) * 0.05
    
    const radius = 60
    const x = radius * Math.sin(currentAngle.current)
    const z = radius * Math.cos(currentAngle.current)
    const y = 0

    camera.position.set(x, y, z)
    camera.lookAt(6, -6.5, -43) // Look at ship position
  })

  return null
}

const Hero = () => {
  const adjustShipForScreenSizes = () => {
    let screenScale = null
    let screenPosition = [6, -6.5, -43]
    let rotation = [0.1, 4.7, 0]

    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      screenScale = [0.5, 0.5, 0.5]
      screenPosition = [0, -6.5, -43]
    } else {
      screenScale = [2.5, 2.5, 2.5]
    }

    return [screenScale, screenPosition, rotation]
  }

  const [shipScale, shipPosition, shipRotation] = adjustShipForScreenSizes()

  return (
    <section className='w-full h-screen relative'>
      {/* Add extra height for scrolling */}
      <div className='absolute top-0 left-0 w-full h-[300vh] pointer-events-none' />
      
      <div className='h-[100vh] w-[100vw] fixed top-0 left-0'>
        <Canvas 
          camera={{ 
            position: [60, 0, 0], // Start position
            fov: 45, 
            near: 0.1, 
            far: 1000 
          }}
        >
          <Environment preset="warehouse" />
          <directionalLight position={[10, 10, 5]} intensity={2} />
          <ambientLight intensity={0.5} />
          <hemisphereLight position={[0, 10, 0]} intensity={0.5} />

          {/* Disable OrbitControls to prevent conflict with scroll camera */}
          {/* <OrbitControls enableZoom={false} enableRotate={true} /> */}

          <Sky isRotating={true} />
          <CameraController />
          <Ship scale={shipScale} position={shipPosition} rotation={shipRotation} />
        </Canvas>
      </div>
    </section>
  )
}

export default Hero