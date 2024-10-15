'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight } from 'lucide-react'

const clients = [
  { logo: '/placeholder.svg?height=100&width=200&text=Client+1', name: 'Client 1' },
  { logo: '/placeholder.svg?height=100&width=200&text=Client+2', name: 'Client 2' },
  { logo: '/placeholder.svg?height=100&width=200&text=Client+3', name: 'Client 3' },
  { logo: '/placeholder.svg?height=100&width=200&text=Client+4', name: 'Client 4' },
]

const stats = [
  { number: '7', label: 'Partenaires' },
  { number: '47', label: "Ans d'expérience" },
  { number: '50+', label: 'Pays' },
  { number: '200+', label: 'Clients' },
]

export default function Home() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const videos = ['/video1.mp4', '/video2.mp4', '/video3.mp4'] // Replace with actual video URLs

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length)
    }, 10000) // Change video every 10 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <video
          src={videos[currentVideoIndex]}
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-white px-4">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Solutions de Fabrication Innovantes
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8 text-center max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Transformez votre production avec notre expertise de pointe
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button size="lg" asChild>
              <Link href="/catalogue">Découvrir nos produits</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Pourquoi nous choisir ?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Expertise", description: "Plus de 47 ans d'expérience dans l'industrie" },
              { title: "Innovation", description: "Solutions de pointe pour la fabrication moderne" },
              { title: "Fiabilité", description: "Performance constante et support client exceptionnel" }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardContent className="p-6">
                    <Image
                      src={`/placeholder.svg?height=200&width=300&text=${feature.title}`}
                      alt={feature.title}
                      width={300}
                      height={200}
                      className="mb-4 rounded"
                    />
                    <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Clients Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Nos Clients
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {clients.map((client, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={200}
                  height={100}
                  className="mb-4"
                />
                <p className="text-center font-semibold">{client.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Statistics Section */}
      <section className="py-24 px-4 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Statistiques de l'entreprise
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <p className="text-5xl font-bold mb-2">{stat.number}</p>
                <p className="text-xl">{stat.label}</p>
              </motion.div>
            ))}
          </div>
          <motion.p 
            className="text-center mt-12 text-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Leader dans l'innovation manufacturière depuis près de cinq décennies
          </motion.p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Prêt à transformer votre processus de fabrication ?
          </motion.h2>
          <motion.p 
            className="text-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Contactez-nous dès aujourd'hui pour découvrir comment nos solutions peuvent révolutionner votre entreprise.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button size="lg" asChild>
              <Link href="/contact">Nous Contacter</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}