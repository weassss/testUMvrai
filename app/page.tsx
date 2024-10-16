'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight } from 'lucide-react'
import { InfiniteSlider } from '@/components/ui/infiniteslider';


const clients = [
  { logo: '/media/cocacola.png?height=100&width=200&text=Client+1', name: 'Client 1' },
  { logo: '/media/Nestle.png?height=100&width=200&text=Client+2', name: 'Client 2' },
  { logo: '/media/pepsi.png?height=100&width=200&text=Client+3', name: 'Client 3' },
  { logo: '/media/Danone.png?height=100&width=200&text=Client+4', name: 'Client 4' },
]

const logos = [
  {
    name: 'Pepsi',
    url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1c5951_01a05e86699746a38d7f4465ba9ac68f~mv2-QF2spuy8P6OCPuYrTeoSvsMOOex97V.png',
  },
  {
    name: 'Plastipak',
    url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1c5951_06022910383b4c1d953ddde610347896~mv2-QVlozE8jlGQ3VwWr5N4AWauQZ3zKDT.png',
  },
  {
    name: 'Lassonde',
    url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1c5951_324777a854fa4382862c11c850e5a6b1~mv2-Qw81L5l0yWNzDLS2olJOdruVocIdpr.png',
  },
  {
    name: 'Eska',
    url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1c5951_48d1721cab0c476baea2a3745b1d5f1a~mv2-8D8FUr9JbtLqsmnDy9CylNGxkegwb4.png',
  },
  {
    name: 'Amcor',
    url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1c5951_4b11cabb0b7047258668e2287ca482f3~mv2-FcntqQw1kNtWsxtqdPfF9v0hM7HD8W.png',
  },
  {
    name: 'Coca-Cola',
    url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1c5951_8f9f635aec944e669f094f82bd907079~mv2-1Rgy8yaguGjQpeGcX94zsNwXMnreev.png',
  },
  {
    name: 'Refresco',
    url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1c5951_9106672ef65e4686b8df97a2ee175438~mv2-sIBcPgiYDI704dqDUjgAbbK5bRNRsa.png',
  },
  {
    name: 'Ocean Spray',
    url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1c5951_99ada941dd464de1bf1fdf24c1a5df81~mv2-PGNYyReTIgqnvvkZiCGMxSLb4Jr2AH.png',
  },
  {
    name: 'Nestlé',
    url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1c5951_a032621654554d0ab98b25c9c4887e6a~mv2-kQICZRTzHqcEIoYjTi1WW7B0jKM9xK.png',
  },
  {
    name: 'Danone',
    url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1c5951_b48fbd3ed8dc433782c37c1ebec6b08b~mv2-IBpJJdrRbFpzHs0wuOrBn0extm2Xx1.png',
  },
  {
    name: 'Ice River',
    url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1c5951_c443204834c44adb9cf6776ba9a6c132~mv2-sQhQDXxynAK1RVueJruAwGGIIDNjIn.png',
  },
  {
    name: 'Graham Packaging',
    url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1c5951_cae8a0adacd84721bb5fc4c7c5e6c593~mv2-m8r7zwNVVUGxguewQ2s7VpSBwhsQMj.png',
  },
  {
    name: 'Niagara',
    url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1c5951_ddb72225923845b38710dfcc223807a4~mv2-iof79htVLZgSx7lEJSZbmQeLaKH0Dr.png',
  },
  {
    name: 'Silgan Plastics',
    url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1c5951_ebe6b632b46945d4bc10bec8d18b5e16~mv2-LmTPSnYTSydi0Ov7CRuDTiItwNYp1i.png',
  },
  {
    name: 'Naya',
    url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1c5951_f6defce4d5c04af187e699e60dc4ac5f~mv2-xUM8cjlaR6TgBXNyYDlE44v8Yar2k9.png',
  },
  

]

const AnimatedLogoCloud = () => {
  return (
    <div className="w-full py-12">
      <div className="mx-auto w-full px-4 md:px-8">
        <div
          className="group relative mt-6 flex gap-6 overflow-hidden p-2"
        >
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="flex shrink-0 animate-logo-cloud flex-row justify-around gap-6"
              >
                {logos.map((logo, key) => (
                  <img
                    key={key}
                    src={logo.url}
                    className="h-10 w-28 px-2 brightness-0 dark:invert"
                    alt={`${logo.name}`}
                  />
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}


const stats = [
  { number: '7', label: 'Partenaires' },
  { number: '47', label: "Ans d'expérience" },
  { number: '50+', label: 'Pays' },
  { number: '200+', label: 'Clients' },
]

export default function Home() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const videos = ['/herogirl.mp4', '/gravur.mp4', '/turbune200.mp4'] 

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
            {[
              { title: "Expertise", description: "Plus de 47 ans d'expérience dans l'industrie", vd:"gravur"},
              { title: "Innovation", description: "Solutions de pointe pour la fabrication moderne", vd:"iconecontenant" },
              { title: "Fiabilité", description: "Performance constante et support client exceptionnel", vd:"iconeboutille" }
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
                      src={`/${feature.vd}.mp4?&text=${feature.title}`}
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
          <InfiniteSlider durationOnHover={120} gap={24} duration={50}>
      <img
    alt= 'Pepsi'
    src= 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1c5951_01a05e86699746a38d7f4465ba9ac68f~mv2-QF2spuy8P6OCPuYrTeoSvsMOOex97V.png'
    className='h-[120px] w-auto'
  />
  <img
    alt= 'Plastipak'
    src= 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1c5951_06022910383b4c1d953ddde610347896~mv2-QVlozE8jlGQ3VwWr5N4AWauQZ3zKDT.png'
className='h-[120px] w-auto'
  />
  <img
    alt= 'Lassonde'
    src= 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1c5951_324777a854fa4382862c11c850e5a6b1~mv2-Qw81L5l0yWNzDLS2olJOdruVocIdpr.png'
className='h-[120px] w-auto'
  />
  <img
    alt= 'Eska'
    src= 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1c5951_48d1721cab0c476baea2a3745b1d5f1a~mv2-8D8FUr9JbtLqsmnDy9CylNGxkegwb4.png'
className='h-[120px] w-auto'
  />
  <img
    alt= 'Amcor'
    src= 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1c5951_4b11cabb0b7047258668e2287ca482f3~mv2-FcntqQw1kNtWsxtqdPfF9v0hM7HD8W.png'
className='h-[120px] w-auto'
  />
  <img
    alt= 'Coca-Cola'
    src= 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1c5951_8f9f635aec944e669f094f82bd907079~mv2-1Rgy8yaguGjQpeGcX94zsNwXMnreev.png'
className='h-[120px] w-auto'
  />
  <img
    alt= 'Refresco'
    src= 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1c5951_9106672ef65e4686b8df97a2ee175438~mv2-sIBcPgiYDI704dqDUjgAbbK5bRNRsa.png'
className='h-[120px] w-auto'
  />
  <img
    alt= 'Ocean Spray'
    src= 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1c5951_99ada941dd464de1bf1fdf24c1a5df81~mv2-PGNYyReTIgqnvvkZiCGMxSLb4Jr2AH.png'
className='h-[120px] w-auto'
  />
  <img
    alt= 'Nestlé'
    src= 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1c5951_a032621654554d0ab98b25c9c4887e6a~mv2-kQICZRTzHqcEIoYjTi1WW7B0jKM9xK.png'
className='h-[120px] w-auto'
  />
  <img
    alt= 'Danone'
    src= 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1c5951_b48fbd3ed8dc433782c37c1ebec6b08b~mv2-IBpJJdrRbFpzHs0wuOrBn0extm2Xx1.png'
className='h-[120px] w-auto'
  />
  <img
    alt= 'Ice River'
    src= 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1c5951_c443204834c44adb9cf6776ba9a6c132~mv2-sQhQDXxynAK1RVueJruAwGGIIDNjIn.png'
className='h-[120px] w-auto'
  />
  <img
    alt= 'Graham Packaging'
    src= 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1c5951_cae8a0adacd84721bb5fc4c7c5e6c593~mv2-m8r7zwNVVUGxguewQ2s7VpSBwhsQMj.png'
className='h-[120px] w-auto'
  />
  <img
    alt= 'Niagara'
    src= 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1c5951_ddb72225923845b38710dfcc223807a4~mv2-iof79htVLZgSx7lEJSZbmQeLaKH0Dr.png'
className='h-[120px] w-auto'
  />
  <img
    alt= 'Silgan Plastics'
    src= 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1c5951_ebe6b632b46945d4bc10bec8d18b5e16~mv2-LmTPSnYTSydi0Ov7CRuDTiItwNYp1i.png'
className='h-[120px] w-auto'
  />
  <img
    alt= 'Naya'
    src= 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1c5951_f6defce4d5c04af187e699e60dc4ac5f~mv2-xUM8cjlaR6TgBXNyYDlE44v8Yar2k9.png'
className='h-[120px] w-auto'
  />
    
      </InfiniteSlider>
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

      {/* Missions and Values Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Nos Missions et Valeurs
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4">Notre Mission</h3>
              <p className="text-gray-600 mb-4">Par des relations fortes, nous sommes fiers d'offrir des solutions innovantes qui simplifient la vie de nos clients pour l’industrie de l’embouteillage.</p>
              <Image
                src="/placeholder.svg?height=300&width=500&text=Notre+Mission"
                alt="Notre Mission"
                width={500}
                height={300}
                className="rounded"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4">Nos Valeurs</h3>
              <ul className="list-disc list-inside text-gray-600 mb-4">
                <li>Engagement envers la satisfaction client</li>
                <li>Innovation constante</li>
                <li>Qualité sans compromis</li>
                <li>Intégrité dans toutes nos actions</li> 
              </ul>
              <Image
                src="/placeholder.svg?height=300&width=500&text=Nos+Valeurs"
                alt="Nos Valeurs"
                width={500}
                height={300}
                className="rounded"
              />
            </motion.div>
          </div>
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