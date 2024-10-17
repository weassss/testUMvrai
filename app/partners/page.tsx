'use client'

import { motion } from 'framer-motion'
import { Globe, Users, MapPin, PhoneCall } from 'lucide-react'
import React, { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Globe3D from './globe'

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-black text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Notre Réseau Mondial
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Grâce à notre réseau de sept partenaires stratégiques, nous vous offrons une expertise locale dans plus de 50 pays. Où que vous soyez, nous sommes là pour répondre à vos besoins avec des solutions sur mesure et un support de proximité.
          </motion.p>
        </div>
      </section>

      {/* Why Choose Our Partners Section */}
      <WhyChooseOurPartners />

      {/* Partner Showcase Section */}
      <Partners />

      {/* Global Presence Section */}
      <GlobalPresence />

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Prêt à bénéficier de notre expertise mondiale ?</h2>
          <p className="text-xl mb-8">Contactez-nous dès aujourd'hui pour découvrir comment nous pouvons répondre à vos besoins spécifiques grâce à notre réseau international.</p>
          <Button size="lg" variant="secondary">Nous contacter</Button>
        </div>
      </section>
    </div>
  )
}

const WhyChooseOurPartners = () => {
  const reasons = [
    { icon: <Globe className="h-8 w-8 mb-4" />, title: "Couverture mondiale", description: "Présence dans plus de 50 pays" },
    { icon: <Users className="h-8 w-8 mb-4" />, title: "Expertise locale", description: "Connaissance approfondie des marchés locaux" },
    { icon: <MapPin className="h-8 w-8 mb-4" />, title: "Support de proximité", description: "Assistance rapide et efficace" },
    { icon: <PhoneCall className="h-8 w-8 mb-4" />, title: "Communication facilitée", description: "Interlocuteurs dans votre langue" },
  ]

  return (
    <section className="py-24 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Choisissez Nous</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="flex flex-col items-center text-center p-6">
                  {reason.icon}
                  <CardTitle className="mb-2">{reason.title}</CardTitle>
                  <p className="text-gray-600">{reason.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Partners = () => {
  const [activePartner, setActivePartner] = useState(0)

  const partners = [
    {
      name: 'UM',
      logo: '/placeholder.svg?height=100&width=200&text=UM+Logo',
      description: 'Leader mondial en solutions d\'usinage de précision',
      countries: ['Canada', 'USA', 'Brésil', 'Niger', 'Italie', 'Suisse', 'Royaume-Uni', 'Estonie', 'Lettonie', 'Lituanie', 'Biélorussie', 'Ukraine', 'Bulgarie', 'Géorgie', 'Azerbaïdjan', 'Irak', 'Vietnam', 'Bangladesh', 'Russie'],
      specialties: ['Usinage CNC', 'Prototypage rapide', 'Ingénierie de précision']
    },
    {
      name: 'RMS',
      logo: '/placeholder.svg?height=100&width=200&text=RMS+Logo',
      description: 'Spécialiste en solutions de maintenance industrielle',
      countries: ['Mexique'],
      specialties: ['Maintenance prédictive', 'Réparation d\'équipements', 'Optimisation de processus']
    },
    {
      name: 'COVIREP SA',
      logo: '/placeholder.svg?height=100&width=200&text=COVIREP+SA+Logo',
      description: 'Expert en solutions d\'automatisation industrielle',
      countries: ['Algérie', 'Tunisie', 'Maroc', 'Jordanie'],
      specialties: ['Robotique industrielle', 'Systèmes de contrôle', 'Intégration de systèmes']
    },
    {
      name: 'BMR',
      logo: '/placeholder.svg?height=100&width=200&text=BMR+Logo',
      description: 'Fournisseur de solutions de mesure et de contrôle de qualité',
      countries: ['Portugal', 'Espagne', 'France', 'Belgique'],
      specialties: ['Métrologie', 'Inspection 3D', 'Contrôle qualité']
    },
    {
      name: 'RÖDERS TEC',
      logo: '/placeholder.svg?height=100&width=200&text=RÖDERS+TEC+Logo',
      description: 'Innovateur en technologies de fraisage de haute précision',
      countries: ['Autriche', 'Norvège', 'Suède', 'Finlande', 'Pologne', 'Allemagne'],
      specialties: ['Fraisage 5 axes', 'Usinage de moules', 'Micro-usinage']
    },
    {
      name: 'PAYNATECH',
      logo: '/placeholder.svg?height=100&width=200&text=PAYNATECH+Logo',
      description: 'Pionnier en solutions d\'usinage électrochimique',
      countries: ['Turquie'],
      specialties: ['Usinage électrochimique', 'Finition de surface', 'Micro-usinage de précision']
    },
    {
      name: 'PNEUTECH',
      logo: '/placeholder.svg?height=100&width=200&text=PNEUTECH+Logo',
      description: 'Expert en systèmes pneumatiques industriels',
      countries: ['Australie'],
      specialties: ['Systèmes pneumatiques', 'Automatisation pneumatique', 'Efficacité énergétique']
    },
  ]

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Nos Partenaires Mondiaux</h2>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {partners.map((partner, index) => (
            <motion.button
              key={index}
              className={`px-4 py-2 rounded-full ${
                activePartner === index ? 'bg-primary text-primary-foreground' : 'bg-gray-200 text-gray-800'
              }`}
              onClick={() => setActivePartner(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {partner.name}
            </motion.button>
          ))}
        </div>
        <motion.div
          key={activePartner}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <Image
                    src={partners[activePartner].logo}
                    alt={`${partners[activePartner].name} logo`}
                    width={200}
                    height={100}
                    className="w-full h-auto mb-4"
                  />
                  <h3 className="text-2xl font-bold mb-2">{partners[activePartner].name}</h3>
                  <p className="text-gray-600 mb-4">{partners[activePartner].description}</p>
                </div>
                <div className="md:w-2/3">
                  <h4 className="text-xl font-semibold mb-2">Pays couverts</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {partners[activePartner].countries.map((country, index) => (
                      <span key={index} className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm">
                        {country}
                      </span>
                    ))}
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Spécialités</h4>
                  <ul className="list-disc pl-5">
                    {partners[activePartner].specialties.map((specialty, index) => (
                      <li key={index} className="mb-1">{specialty}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

const GlobalPresence = () => {
  return (
    <section className="py-24 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Notre Présence Mondiale</h2>
        <div className="relative h-[750px] rounded-lg shadow-lg overflow-hidden">
          <Globe3D />
        </div>
      </div>
    </section>
  )
}