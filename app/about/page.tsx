'use client'

import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Linkedin, Twitter, ArrowRight } from 'lucide-react'
import { Timeline } from "@/components/ui/timeline"
import React from "react"

export default function About() {
  const evenementsChronologiques = [
    {
      title: "1976",
      content: (
        <div>
          <p className="text-muted-foreground">Fondation d'UM Manufacturing</p>
          <Image
            src="/placeholder.svg?height=200&width=300&text=Fondation+UM"
            alt="Fondation d'UM Manufacturing"
            width={300}
            height={200}
            className="mt-4 rounded-lg shadow-md"
          />
        </div>
      ),
    },
    {
      title: "1985",
      content: (
        <div>
          <p className="text-muted-foreground">Expansion des opérations pour inclure l'usinage CNC</p>
          <Image
            src="/placeholder.svg?height=200&width=300&text=Expansion+CNC"
            alt="Expansion CNC"
            width={300}
            height={200}
            className="mt-4 rounded-lg shadow-md"
          />
        </div>
      ),
    },
    {
      title: "1995",
      content: (
        <div>
          <p className="text-muted-foreground">Ouverture du premier bureau international</p>
          <Image
            src="/placeholder.svg?height=200&width=300&text=Bureau+International"
            alt="Premier bureau international"
            width={300}
            height={200}
            className="mt-4 rounded-lg shadow-md"
          />
        </div>
      ),
    },
    {
      title: "2005",
      content: (
        <div>
          <p className="text-muted-foreground">Lancement d'une gamme de produits innovants</p>
          <Image
            src="/placeholder.svg?height=200&width=300&text=Nouveaux+Produits"
            alt="Nouveaux produits innovants"
            width={300}
            height={200}
            className="mt-4 rounded-lg shadow-md"
          />
        </div>
      ),
    },
    {
      title: "2015",
      content: (
        <div>
          <p className="text-muted-foreground">Obtention de la certification ISO 9001:2015</p>
          <Image
            src="/placeholder.svg?height=200&width=300&text=Certification+ISO"
            alt="Certification ISO 9001:2015"
            width={300}
            height={200}
            className="mt-4 rounded-lg shadow-md"
          />
        </div>
      ),
    },
    {
      title: "2023",
      content: (
        <div>
          <p className="text-muted-foreground">Célébration de 47 ans d'excellence</p>
          <Image
            src="/placeholder.svg?height=200&width=300&text=47+Ans+d'Excellence"
            alt="47 ans d'excellence"
            width={300}
            height={200}
            className="mt-4 rounded-lg shadow-md"
          />
        </div>
      ),
    },
  ]

  const equipeDirection = [
    { nom: 'Arnaud Vital', role: 'President & CEO', image: 'https://media.licdn.com/dms/image/v2/C4E03AQG7B1AFycxf3Q/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1575990827764?e=1735171200&v=beta&t=cUBbmcm-9vwOglpLqzgSWcjkj6KBpYlrHbkXYYF8AQ8' },
    { nom: 'Robert Saba', role: 'Vice-President des ventes & Représentant commercial', image: 'https://media.licdn.com/dms/image/v2/C5603AQGsmAzlGjU9TQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1570641722963?e=1735171200&v=beta&t=6ppIsGMksJ6l7gn_FSx4p0km-gylqOt7eopD_rHMoJ4' },
    { nom: 'Raoul Baroudi', role: 'Directeur associé des ventes', image: 'https://media.licdn.com/dms/image/v2/D4E03AQFfsf3dQybwQQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1677870462474?e=1735171200&v=beta&t=mxYDVywPpONUsh4UTum_OOwpE2X3otsuFn_Hg-0LHvk' },
    { nom: 'Personne1', role: 'Directrice Financière', image: '/placeholder.svg?height=300&width=300&text=Sophie' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Section Qui Sommes-Nous */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h1 className="text-5xl font-bold mb-12 text-center mt-20">À Propos d'UM</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-semibold mb-6">Qui Sommes-Nous</h2>
              <p className="text-lg text-muted-foreground">
                UM est un leader innovant dans l'industrie manufacturière, 
                fournissant des solutions de pointe aux entreprises du monde entier. Avec plus de quatre décennies 
                d'expérience, nous nous sommes imposés comme un partenaire de confiance pour les entreprises 
                cherchant à optimiser leurs processus de fabrication.
              </p>
              <p className="text-lg text-muted-foreground">
                Notre engagement envers la qualité, l'innovation et la satisfaction client guide tout ce que 
                nous faisons. Des machines de pointe aux services de conseil expert, nous sommes 
                dédiés à aider nos clients à atteindre des niveaux sans précédent d'efficacité et 
                de productivité.
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src="/placeholder.svg?height=400&width=600&text=UM+Manufacturing"
                alt="Usine UM Manufacturing"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section Chronologie de l'Entreprise */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-semibold mb-12 text-center">Notre Parcours</h2>
          <Timeline data={evenementsChronologiques} />
        </div>
      </section>

      {/* Section Équipe de Direction */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <h2 className="text-4xl font-semibold mb-12 text-center">Notre Équipe de Direction</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {equipeDirection.map((leader, index) => (
              <Card key={index} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <Image
                    src={leader.image}
                    alt={leader.nom}
                    width={200}
                    height={200}
                    className="rounded-full mx-auto mb-6 border-4 border-primary"
                  />
                  <h3 className="text-2xl font-semibold mb-2">{leader.nom}</h3>
                  <p className="text-muted-foreground mb-4">{leader.role}</p>
                  <div className="flex justify-center space-x-4">
                    <Button variant="outline" size="icon">
                      <Linkedin className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Twitter className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section CTA pour le Recrutement */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Rejoignez Notre Équipe</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Nous sommes toujours à la recherche de talents pour nous aider à façonner l'avenir de l'industrie manufacturière.
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
            Voir les Postes Ouverts
          </Button>
        </div>
      </section>
    </div>
  )
}