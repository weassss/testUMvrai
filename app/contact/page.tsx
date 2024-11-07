'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin } from 'lucide-react'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

const partnerColors = [
  "#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8", "#F06292", "#AED581"
]

const partners = [
  {
    name: 'UM',
    logo: '/placeholder.svg?height=100&width=200&text=UM+Logo',
    description: 'Leader mondial en solutions d\'usinage de précision',
    countries: ['Canada', 'USA', 'Brazil', 'Niger', 'Italy', 'Switzerland', 'United Kingdom', 'Estonia', 'Latvia', 'Lithuania', 'Belarus', 'Ukraine', 'Bulgaria', 'Georgia', 'Azerbaijan', 'Iraq', 'Vietnam', 'Bangladesh', 'Russia'],
    specialties: ['Usinage CNC', 'Prototypage rapide', 'Ingénierie de précision']
  },
  {
    name: 'RMS',
    logo: '/placeholder.svg?height=100&width=200&text=RMS+Logo',
    description: 'Spécialiste en solutions de maintenance industrielle',
    countries: ['Mexico'],
    specialties: ['Maintenance prédictive', 'Réparation d\'équipements', 'Optimisation de processus']
  },
  {
    name: 'COVIREP SA',
    logo: '/placeholder.svg?height=100&width=200&text=COVIREP+SA+Logo',
    description: 'Expert en solutions d\'automatisation industrielle',
    countries: ['Algeria', 'Tunisia', 'Morocco', 'Jordan'],
    specialties: ['Robotique industrielle', 'Systèmes de contrôle', 'Intégration de systèmes']
  },
  {
    name: 'BMR',
    logo: '/placeholder.svg?height=100&width=200&text=BMR+Logo',
    description: 'Fournisseur de solutions de mesure et de contrôle de qualité',
    countries: ['Portugal', 'Spain', 'France', 'Belgium'],
    specialties: ['Métrologie', 'Inspection 3D', 'Contrôle qualité']
  },
  {
    name: 'RÖDERS TEC',
    logo: '/placeholder.svg?height=100&width=200&text=RÖDERS+TEC+Logo',
    description: 'Innovateur en technologies de fraisage de haute précision',
    countries: ['Austria', 'Norway', 'Sweden', 'Finland', 'Poland', 'Germany'],
    specialties: ['Fraisage 5 axes', 'Usinage de moules', 'Micro-usinage']
  },
  {
    name: 'PAYNATECH',
    logo: '/placeholder.svg?height=100&width=200&text=PAYNATECH+Logo',
    description: 'Pionnier en solutions d\'usinage électrochimique',
    countries: ['Turkey'],
    specialties: ['Usinage électrochimique', 'Finition de surface', 'Micro-usinage de précision']
  },
  {
    name: 'PNEUTECH',
    logo: '/placeholder.svg?height=100&width=200&text=PNEUTECH+Logo',
    description: 'Expert en systèmes pneumatiques industriels',
    countries: ['Australia'],
    specialties: ['Systèmes pneumatiques', 'Automatisation pneumatique', 'Efficacité énergétique']
  },
]

// Approximate coordinates for each country
const countryCoordinates = {
  'Canada': [-106.3468, 56.1304],
  'USA': [-95.7129, 37.0902],
  'Brazil': [-51.9253, -14.2350],
  'Niger': [8.0817, 17.6078],
  'Italy': [12.5674, 41.8719],
  'Switzerland': [8.2275, 46.8182],
  'United Kingdom': [-3.4359, 55.3781],
  'Estonia': [25.0136, 58.5953],
  'Latvia': [24.6032, 56.8796],
  'Lithuania': [23.8813, 55.1694],
  'Belarus': [27.9534, 53.7098],
  'Ukraine': [31.1656, 48.3794],
  'Bulgaria': [25.4858, 42.7339],
  'Georgia': [43.3569, 42.3154],
  'Azerbaijan': [47.5769, 40.1431],
  'Iraq': [43.6793, 33.2232],
  'Vietnam': [108.2772, 14.0583],
  'Bangladesh': [90.3563, 23.6850],
  'Russia': [105.3188, 61.5240],
  'Mexico': [-102.5528, 23.6345],
  'Algeria': [1.6596, 28.0339],
  'Tunisia': [9.5375, 33.8869],
  'Morocco': [-7.0926, 31.7917],
  'Jordan': [36.2384, 30.5852],
  'Portugal': [-8.2245, 39.3999],
  'Spain': [-3.7492, 40.4637],
  'France': [2.2137, 46.2276],
  'Belgium': [4.4699, 50.5039],
  'Austria': [14.5501, 47.5162],
  'Norway': [8.4689, 60.4720],
  'Sweden': [18.6435, 60.1282],
  'Finland': [25.7482, 61.9241],
  'Poland': [19.1451, 51.9194],
  'Germany': [10.4515, 51.1657],
  'Turkey': [35.2433, 38.9637],
  'Australia': [133.7751, -25.2744],
}

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [activePartnerIndex, setActivePartnerIndex] = useState(0)
  const [hoveredMarker, setHoveredMarker] = useState(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your server
    console.log('Form submitted:', formState)
    // Reset form after submission
    setFormState({ name: '', email: '', message: '' })
  }

  const handlePartnerChange = (index: number) => {
    setActivePartnerIndex(index)
  }

  const markers = useMemo(() => {
    return partners.flatMap((partner, index) => 
      partner.countries.map(country => ({
        name: partner.name,
        coordinates: countryCoordinates[country],
        country: country,
        color: partnerColors[index]
      }))
    ).filter(marker => marker.coordinates)
  }, [])

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <Image
          src="/placeholder.svg?height=1080&width=1920&text=Contact+Us"
          alt="Contact Us"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-white px-4">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Nous Joindre
          </motion.h1>
        </div>
      </section>

      {/* Contact Information and Form Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-8">Nos Coordonnées</h2>
            <Card className="mb-6">
              <CardContent className="p-6 flex items-center">
                <Phone className="mr-4" />
                <p>+1 (514) 608-2297</p>
              </CardContent>
            </Card>
            <Card className="mb-6">
              <CardContent className="p-6 flex items-center">
                <MapPin className="mr-4" />
                <p>145 Bd Saint-Rémi, Saint-Rémi, QC J0L 2L0</p>
              </CardContent>
            </Card>
            <Card className="mb-6">
              <CardContent className="p-6 flex items-center">
                <Mail className="mr-4" />
                <div>
                  <p>rs@umallette.com</p>
                  <p>sales@umallette.com</p>
                </div>
              </CardContent>
            </Card>
            <Image
              src="/placeholder.svg?height=300&width=500&text=UM+logo"
              alt="UM logo"
              width={300}
              height={150}
              className="mt-8"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-8">Formulaire de Contact</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                <Input
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <Textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <Button type="submit" size="lg">Envoyer</Button>
            </form>
          </motion.div>
        </div>
      </section>
      
      {/* Nos partenaires mondiaux Section with Slider */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Nos Partenaires Mondiaux
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {partners.map((partner, index) => (
              <motion.button
                key={index}
                className={`px-4 py-2 rounded-full ${
                  activePartnerIndex === index ? 'text-white' : 'bg-gray-200 text-gray-800'
                }`}
                style={{ 
                  backgroundColor: activePartnerIndex === index ? partnerColors[index] : undefined,
                }}
                onClick={() => handlePartnerChange(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {partner.name}
              </motion.button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activePartnerIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3">
                      <Image
                        src={partners[activePartnerIndex].logo}
                        alt={`${partners[activePartnerIndex].name} logo`}
                        width={200}
                        height={100}
                        className="w-full h-auto mb-4"
                      />
                      <h3 className="text-2xl font-bold mb-2">{partners[activePartnerIndex].name}</h3>
                      <p className="text-gray-600 mb-4">{partners[activePartnerIndex].description}</p>
                    </div>
                    <div className="md:w-2/3">
                      <h4 className="text-xl font-semibold mb-2">Pays couverts</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {partners[activePartnerIndex].countries.map((country, index) => (
                          <span key={index} className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm">
                            {country}
                          </span>
                        ))}
                      </div>
                      <h4 className="text-xl font-semibold mb-2">Spécialités</h4>
                      <ul className="list-disc pl-5">
                        {partners[activePartnerIndex].specialties.map((specialty, index) => (
                          <li key={index} className="mb-1">{specialty}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Partners Section with Interactive Map */}
      <section className="py-24 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Notre Présence Mondiale
          </motion.h2>
          <Card className="relative overflow-hidden mb-8">
            <CardContent className="p-0">
              <div className="relative">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3d/BlankMap-World.svg"
                  alt="World Map Overlay"
                  width={1000}
                  height={600}
                  className="w-full h-auto opacity-30"
                />
                <div className="absolute inset-0">
                  <ComposableMap projection="geoMercator">
                    <Geographies geography={geoUrl}>
                      {({ geographies }) =>
                        geographies.map((geo) => (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill="transparent"
                            stroke="#D6D6DA"
                          />
                        ))
                      }
                    </Geographies>
                    {markers.map(({ name, coordinates, country, color }, index) => (
                      <Marker 
                        key={`${name}-${country}-${index}`}
                        coordinates={coordinates}
                      >
                        <motion.circle 
                          r={4}
                          fill={color}
                          stroke="#fff" 
                          strokeWidth={2} 
                          style={{ cursor: 'pointer' }}
                          initial={{ scale: 0 }}
                          animate={{ 
                            scale: name === partners[activePartnerIndex].name ? 1.5 : 1,
                            opacity: name === partners[activePartnerIndex].name ? 1 : 0.7
                          }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 260, 
                            damping: 20,
                            duration: 0.3
                          }}
                          onClick={() => {
                            const partnerIndex = partners.findIndex(p => p.name === name);
                            handlePartnerChange(partnerIndex);
                          }}
                          onMouseEnter={() => setHoveredMarker({ name, country })}
                          onMouseLeave={() => setHoveredMarker(null)}
                        />
                        {hoveredMarker && hoveredMarker.name === name && hoveredMarker.country === country && (
                          <motion.text
                            textAnchor="middle"
                            y={-10}
                            style={{ fontFamily: "system-ui", fill: "#000", fontSize: "10px", fontWeight: "bold" }}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {name}
                          </motion.text>
                        )}
                      </Marker>
                    ))}
                  </ComposableMap>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}