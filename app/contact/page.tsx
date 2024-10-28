'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin } from 'lucide-react'
import { InfiniteSlider } from '@/components/ui/infiniteslider'

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  })

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

      {/* Partners Section */}
      <section className="py-24 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Nos Partenaires
          </motion.h2>
          <InfiniteSlider durationOnHover={120} gap={24} duration={50}>
            <img
              alt="Pepsi"
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1c5951_01a05e86699746a38d7f4465ba9ac68f~mv2-QF2spuy8P6OCPuYrTeoSvsMOOex97V.png"
              className="h-[120px] w-auto"
            />
            <img
              alt="Plastipak"
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1c5951_06022910383b4c1d953ddde610347896~mv2-QVlozE8jlGQ3VwWr5N4AWauQZ3zKDT.png"
              className="h-[120px] w-auto"
            />
            <img
              alt="Lassonde"
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1c5951_324777a854fa4382862c11c850e5a6b1~mv2-Qw81L5l0yWNzDLS2olJOdruVocIdpr.png"
              className="h-[120px] w-auto"
            />
            <img
              alt="Eska"
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1c5951_48d1721cab0c476baea2a3745b1d5f1a~mv2-8D8FUr9JbtLqsmnDy9CylNGxkegwb4.png"
              className="h-[120px] w-auto"
            />
            <img
              alt="Amcor"
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1c5951_4b11cabb0b7047258668e2287ca482f3~mv2-FcntqQw1kNtWsxtqdPfF9v0hM7HD8W.png"
              className="h-[120px] w-auto"
            />
            <img
              alt="Coca-Cola"
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1c5951_8f9f635aec944e669f094f82bd907079~mv2-1Rgy8yaguGjQpeGcX94zsNwXMnreev.png"
              className="h-[120px] w-auto"
            />
            <img
              alt="Refresco"
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1c5951_9106672ef65e4686b8df97a2ee175438~mv2-sIBcPgiYDI704dqDUjgAbbK5bRNRsa.png"
              className="h-[120px] w-auto"
            />
          </InfiniteSlider>
        </div>
      </section>
    </div>
  )
}