'use client'

import { motion } from 'framer-motion'
import { Cog, Scan, Printer, CheckCircle, Zap, Clock, Users } from 'lucide-react'
import React, { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ServicesPage() {
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
            Nos Services
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Des solutions innovantes pour optimiser votre production
          </motion.p>
        </div>
      </section>

      {/* Pourquoi choisir nos services Section */}
      <WhyChooseOurServices />

      {/* Service Showcase Section */}
      <Services />

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Prêt à transformer votre production ?</h2>
          <p className="text-xl mb-8">Contactez-nous dès aujourd'hui pour discuter de vos besoins spécifiques.</p>
          <Button size="lg" variant="secondary">Demander un devis</Button>
        </div>
      </section>
    </div>
  )
}

const WhyChooseOurServices = () => {
  const reasons = [
    { icon: <CheckCircle className="h-8 w-8 mb-4" />, title: "Expertise", description: "Plus de 47 ans d'expérience dans l'industrie manufacturière" },
    { icon: <Zap className="h-8 w-8 mb-4" />, title: "Innovation", description: "Utilisation des dernières technologies pour des solutions de pointe" },
    { icon: <Clock className="h-8 w-8 mb-4" />, title: "Rapidité", description: "Délais de livraison optimisés pour répondre à vos besoins urgents" },
    { icon: <Users className="h-8 w-8 mb-4" />, title: "Service personnalisé", description: "Une approche sur mesure pour chaque client" },
  ]

  return (
    <section className="py-24 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Pourquoi Choisir Nos Services</h2>
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

const Services = () => {
  const [activeService, setActiveService] = useState(1)
  const [activeStep, setActiveStep] = useState(0)

  const serviceTabs = [
    {
      name: 'Services d\'Ingénierie',
      description: 'De la conception à la fabrication, nous vous accompagnons à chaque étape.',
      icon: <Cog className="h-6 w-6" />,
      details: [
        {
          title: 'Étape 1',
          points: [
            'Prise de contact',
            'Analyse de vos besoins (préconception)',
            'Suggestions pour améliorer le produit'
          ]
        },
        {
          title: 'Étape 2',
          points: [
            'Conception (dessin 3D)',
            'Validation par vous & UM'
          ]
        },
        {
          title: 'Étape 3',
          points: [
            'Fabrication des unités désirées (usinage, assemblage & test fonctionnel)',
            'Si nécessaire, confection de documentation (manuel de maintenance)'
          ]
        }
      ]
    },
    {
      name: 'Services de Scan 3D',
      description: 'Numérisation précise de vos équipements et pièces, où que vous soyez.',
      icon: <Scan className="h-6 w-6" />,
      details: [
        {
          title: 'Caractéristiques',
          points: [
            'Acquiers des mesures de composantes physiques',
            'Capacités d\'ingénierie inversée de haute précision',
            '25 000 mesures par seconde',
            'Résolution: 0.0020" (50 microns)',
            'Précision: 0.0015" (40 microns)'
          ]
        }
      ]
    },
    {
      name: 'Services d\'Impression 3D',
      description: 'Conception et impression de vos idées, avec ou sans fichier CAD.',
      icon: <Printer className="h-6 w-6" />,
      details: [
        {
          title: 'Avantages',
          points: [
            'Processus de prototypage rapide',
            'Vérification de la conception',
            'Test de validation'
          ]
        },
        {
          title: 'Spécifications',
          points: [
            'Capacité: 9" x 9" x 8" (230 x 225 x 205 mm)',
            'Précision: 0.0008" (20 microns)'
          ]
        }
      ]
    },
  ]

  const serviceImages = [
    {
      imageNumber: 1,
      imageSources: [
        '/media/blob.png?height=600&width=800&text=Services+d\'Ingénierie',
        '/media/blob.png?height=600&width=800&text=Services+d\'Ingénierie+1.2',
        '/media/blob.png?height=600&width=800&text=Services+d\'Ingénierie+1.3',
      ]
    },
    {
      imageNumber: 2,
      imageSources: ['/placeholder.svg?height=600&width=800&text=Services+de+Scan+3D'],
    },
    {
      imageNumber: 3,
      imageSources: ['/placeholder.svg?height=600&width=800&text=Services+d\'Impression+3D'],
    },
  ]

  const handleServiceChange = (index: number) => {
    setActiveService(index)
    setActiveStep(0)
  }

  const handleStepChange = (index: number) => {
    setActiveStep(index)
  }

  return (
    <section className="py-24 px-4 bg-white">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-12 text-center">Nos Services en Action</h2>
        <p className="text-xl text-gray-600 mb-12 text-center max-w-2xl mx-auto">
          Découvrez comment les services d'UM peuvent transformer votre processus de fabrication et améliorer votre efficacité opérationnelle.
        </p>
        <div className="service-navigation mb-12 flex w-full items-center justify-center text-center">
          <div className="flex w-full max-w-4xl flex-col gap-2 md:flex-row">
            {serviceTabs.map((tab, index) => (
              <button
                key={index}
                className={`group relative flex w-full flex-col items-start p-3 text-left`}
                onClick={() => handleServiceChange(index + 1)}
              >
                <div
                  className={`mb-3 ${
                    activeService === index + 1
                      ? `bg-primary text-primary-foreground`
                      : `bg-primary/10 text-primary`
                  } z-10 rounded-lg p-1 group-hover:bg-primary group-hover:text-primary-foreground`}
                >
                  {tab.icon}
                </div>
                <div className="z-10 mb-2 text-xs font-semibold">{tab.name}</div>
                <p className="z-10 m-0 text-xs text-gray-600 md:text-sm">
                  {tab.description}
                </p>
                {activeService === index + 1 && (
                  <motion.span
                    layoutId="tab"
                    transition={{ type: 'spring', duration: 0.3 }}
                    className="absolute inset-0 z-0 rounded-md bg-primary/10"
                  ></motion.span>
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-lg border bg-white shadow-sm">
            {serviceImages.map((service, index) => (
              <div key={index} data-image-number={service.imageNumber}>
                {activeService === service.imageNumber && (
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full rounded-lg"
                  >
                    <Image
                      src={service.imageSources[activeService === 1 ? activeStep : 0]}
                      alt={`Service ${service.imageNumber}`}
                      width={800}
                      height={600}
                      className="w-full rounded-lg"
                    />
                  </motion.div>
                )}
              </div>
            ))}
          </div>
          <div>
            {serviceTabs.map((service, serviceIndex) => (
              activeService === serviceIndex + 1 && (
                <motion.div
                  key={serviceIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl font-bold mb-4">{service.name}</h3>
                  <div className="mb-6">
                    <div className="flex items-center">
                      {service.details.map((_, index) => (
                        <React.Fragment key={index}>
                          <motion.div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer ${
                              index <= activeStep ? 'bg-primary text-primary-foreground' : 'bg-gray-200 text-gray-600'
                            }`}
                            onClick={() => handleStepChange(index)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            {index + 1}
                          </motion.div>
                          {index < service.details.length - 1 && (
                            <motion.div 
                              className="flex-1 h-1 mx-2 bg-gray-200"
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: index < activeStep ? 1 : 0 }}
                              transition={{ duration: 0.5 }}
                            />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card>
                      <CardContent className="pt-6">
                        <h4 className="text-xl font-semibold mb-2">{service.details[activeStep].title}</h4>
                        <ul className="list-disc pl-5">
                          {service.details[activeStep].points.map((point, pointIndex) => (
                            <li key={pointIndex} className="mb-1">{point}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              )
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
