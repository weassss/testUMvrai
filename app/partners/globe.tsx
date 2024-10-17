"use client"

import React, { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { OrbitControls, Sphere, Html, useHelper } from '@react-three/drei'
import * as THREE from 'three'
import { TextureLoader } from 'three'

const companies = [
  { 
    name: "UM", 
    color: "#00FFFF", 
    locations: [
      { name: "Canada", lat: 56.130366, lon: -106.346771 },
      { name: "USA", lat: 37.09024, lon: -95.712891 },
      { name: "Brésil", lat: -14.235004, lon: -51.92528 },
      { name: "Niger", lat: 17.607789, lon: 8.081666 },
      { name: "Italie", lat: 41.87194, lon: 12.56738 },
      { name: "Suisse", lat: 46.818188, lon: 8.227512 },
      { name: "Royaume-Uni", lat: 55.378051, lon: -3.435973 },
      { name: "Estonie", lat: 58.595272, lon: 25.013607 },
      { name: "Lettonie", lat: 56.879635, lon: 24.603189 },
      { name: "Lituanie", lat: 55.169438, lon: 23.881275 },
      { name: "Biélorussie", lat: 53.709807, lon: 27.953389 },
      { name: "Ukraine", lat: 48.379433, lon: 31.16558 },
      { name: "Bulgarie", lat: 42.733883, lon: 25.48583 },
      { name: "Géorgie", lat: 42.315407, lon: 43.356892 },
      { name: "Azerbaïdjan", lat: 40.143105, lon: 47.576927 },
      { name: "Irak", lat: 33.223191, lon: 43.679291 },
      { name: "Vietnam", lat: 14.058324, lon: 108.277199 },
      { name: "Bangladesh", lat: 23.684994, lon: 90.356331 },
      { name: "Russie", lat: 61.52401, lon: 105.318756 }
    ]
  },
  { 
    name: "RMS", 
    color: "#FFFF00", 
    locations: [
      { name: "Mexique", lat: 23.634501, lon: -102.552784 }
    ]
  },
  { 
    name: "COVIREP SA", 
    color: "#00FF00", 
    locations: [
      { name: "Algérie", lat: 28.033886, lon: 1.659626 },
      { name: "Tunisie", lat: 33.886917, lon: 9.537499 },
      { name: "Maroc", lat: 31.791702, lon: -7.09262 },
      { name: "Jordanie", lat: 30.585164, lon: 36.238414 }
    ]
  },
  { 
    name: "BMR", 
    color: "#FF0000", 
    locations: [
      { name: "Portugal", lat: 39.399872, lon: -8.224454 },
      { name: "Espagne", lat: 40.463667, lon: -3.74922 },
      { name: "France", lat: 46.227638, lon: 2.213749 },
      { name: "Belgique", lat: 50.503887, lon: 4.469936 }
    ]
  },
  { 
    name: "RÖDERS TEC", 
    color: "#800080", 
    locations: [
      { name: "Autriche", lat: 47.516231, lon: 14.550072 },
      { name: "Norvège", lat: 60.472024, lon: 8.468946 },
      { name: "Suède", lat: 60.128161, lon: 18.643501 },
      { name: "Finlande", lat: 61.92411, lon: 25.748151 },
      { name: "Pologne", lat: 51.919438, lon: 19.145136 },
      { name: "Allemagne", lat: 51.165691, lon: 10.451526 }
    ]
  },
  { 
    name: "PAYNATECH", 
    color: "#FFA500", 
    locations: [
      { name: "Turquie", lat: 38.963745, lon: 35.243322 }
    ]
  },
  { 
    name: "PNEUTECH", 
    color: "#FFC0CB", 
    locations: [
      { name: "Australie", lat: -25.274398, lon: 133.775136 }
    ]
  },
  { 
    name: "D.I.E.C", 
    color: "#FFFFFF", 
    locations: [
      { name: "Singapour", lat: 1.352083, lon: 103.819836 },
      { name: "Malaisie", lat: 4.210484, lon: 101.975766 },
      { name: "Thaïlande", lat: 15.870032, lon: 100.992541 },
      { name: "Myanmar", lat: 21.916221, lon: 95.955974 },
      { name: "Chine", lat: 35.86166, lon: 104.195397 },
      { name: "Japon", lat: 36.204824, lon: 138.252924 }
    ]
  }
]

function latLongToVector3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const z = radius * Math.sin(phi) * Math.sin(theta)
  const y = radius * Math.cos(phi)
  return new THREE.Vector3(x, y, z)
}

function Globe() {
  const earthRef = useRef<THREE.Mesh>(null!)
  const atmosphereRef = useRef<THREE.Mesh>(null!)
  const [selectedCompany, setSelectedCompany] = useState(null)
  const { scene } = useThree()

  const lightRef1 = useRef<THREE.DirectionalLight>(null!)
  const lightRef2 = useRef<THREE.DirectionalLight>(null!)

  const [earthTexture] = useLoader(TextureLoader, [
    'https://unpkg.com/three-globe@2.24.13/example/img/earth-blue-marble.jpg'
  ])

  const companyPoints = useMemo(() => {
    return companies.flatMap(company => 
      company.locations.map(location => ({
        position: latLongToVector3(location.lat, location.lon, 1.02),
        color: company.color,
        name: company.name,
        location: location.name
      }))
    )
  }, [])

  const handlePointClick = (companies, location) => {
    setSelectedCompany({ name: companies, location: location })
  }

  const handleCloseInfo = () => {
    setSelectedCompany(null)
  }

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.tagName === 'CANVAS') {
        setSelectedCompany(null)
      }
    }
    scene.addEventListener('click', handleClickOutside)
    return () => {
      scene.removeEventListener('click', handleClickOutside)
    }
  }, [scene])

  return (
    <>
      <ambientLight intensity={5} />
      <directionalLight ref={lightRef1} position={[5, 3, 5]} intensity={3} />
      <directionalLight ref={lightRef2} position={[-5, 3, 5]} intensity={3} />
      <group>
        <Sphere ref={earthRef} args={[1, 64, 64]}>
          <meshStandardMaterial 
            map={earthTexture}
          />
        </Sphere>
        <Sphere ref={atmosphereRef} args={[1.01, 64, 64]}>
          <meshPhongMaterial 
            transparent
            opacity={0.5}
            color="#88ccff"
            side={THREE.BackSide}
          />
        </Sphere>
        <CompanyPoints 
          points={companyPoints}
          onClick={handlePointClick}
          selectedCompany={selectedCompany}
        />
      </group>
      {selectedCompany && (
        <Html fullscreen>
          <CompanyInfo 
            company={selectedCompany.name} 
            location={selectedCompany.location} 
            onClose={handleCloseInfo}
          />
        </Html>
      )}
    </>
  )
}

function CompanyPoints({ points, onClick, selectedCompany }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(points.length * 3)
    const colors = new Float32Array(points.length * 3)
    const sizes = new Float32Array(points.length)

    points.forEach((point, i) => {
      const color = new THREE.Color(point.color)
      positions.set([point.position.x, point.position.y, point.position.z], i * 3)
      colors.set([color.r, color.g, color.b], i * 3)
      sizes[i] = 0.025
    })

    return [positions, colors, sizes]
  }, [points])

  const [hovered, setHovered] = useState<number | null>(null)


  const handlePointerMove = (event) => {
    event.stopPropagation()
    setHovered(event.index)
  }

  const handlePointerOut = () => {
    setHovered(null)
  }

  const handleClick = (event) => {
    event.stopPropagation()
    onClick(points[event.index].name, points[event.index].location)
  }

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        vertexColors
        sizeAttenuation={true}
        transparent={true}
        opacity={0.8}
      />
      {hovered !== null && (
        <Html position={points[hovered].position}>
          <div className="bg-black bg-opacity-75 text-white p-2 rounded-lg text-sm">
            <p className="font-bold">{points[hovered].name}</p>
            <p>{points[hovered].location}</p>
          </div>
        </Html>
      )}
      <mesh
        onPointerMove={handlePointerMove}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <bufferGeometry />
        <meshBasicMaterial visible={false} />
      </mesh>
    </points>
  )
}

function CompanyInfo({ companies, location, onClose }) {
  return (
    <div className="fixed top-4 left-4 bg-black bg-opacity-75 text-white p-4 rounded-lg max-w-md">
      <h2 className="text-xl font-bold mb-2">{companies}</h2>
      <p className="mb-4">Location: {location}</p>
      <button 
        onClick={onClose}
        className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
      >
        Fermer
      </button>
    </div>
  )
}

export default function Globe3D() {
  return (
    <div className="w-full h-screen bg-gray-900">
      <Canvas camera={{ position: [0, 0, 2.5] }}>
        <Globe />
        <OrbitControls 
          enableZoom={false}
        />
      </Canvas>
    </div>
  )
}