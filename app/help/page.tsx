'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface TabProps {
  text: string
  selected: boolean
  setSelected: (text: string) => void
  customID?: string
}

const Tab = ({ text, selected, setSelected, customID }: TabProps) => {
  return (
    <button
      onClick={() => setSelected(text)}
      className={`${
        selected
          ? 'text-red-500'
          : 'hover:text-gray-900 dark:hover:text-gray-100'
      } relative rounded-md px-2 py-1 text-sm font-medium text-gray-500 transition-colors duration-300 focus-within:outline-red-500/50`}
    >
      <span className="relative z-10">{text}</span>
      {selected && (
        <motion.div
          className="absolute left-0 top-0 flex size-full h-full w-full items-end justify-center"
          layoutId={customID + 'linetab'}
          transition={{ type: 'spring', duration: 0.4, bounce: 0, delay: 0.1 }}
        >
          <span className="z-0 h-[3px] w-[60%] rounded-t-full bg-red-500"></span>
        </motion.div>
      )}
    </button>
  )
}

interface LineTabsProps {
  tabs: string[]
  center?: boolean
  customID?: string
  selected: string
  setSelected: (text: string) => void
}

const LineTabs = ({ tabs, center, customID, selected, setSelected }: LineTabsProps) => {
  return (
    <div
      className={cn(
        'mb-8 flex flex-wrap items-center gap-2 border-b border-gray-200 dark:border-gray-600',
        center && 'justify-center',
      )}
    >
      {tabs.map((tab) => (
        <Tab
          text={tab}
          selected={selected === tab}
          setSelected={setSelected}
          key={tab}
          customID={customID}
        />
      ))}
    </div>
  )
}

export default function Help() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState("Informations générales")

  const categories = [
    "Informations générales",
    "Catalogues de produits",
    "Soumission",
    "Livraison",
    "Paiement et facturation",
  ]

  const faqs = {
    "Informations générales": [
      {
        question: "Quel type de produit UM offre ?",
        answer: "Nous offrons deux types de produits. En premier lieu, des pièces de rechange pour les souffleuses, remplisseuse, appareil de bouchage et étiqueteuses pour le PET. Dans un second lieu, des pièces pour les machines de thermoformage-remplissage-scellage alimentaire servant principalement à la fabrication de contenant de yogourt. Nous proposons également un service d'ingénierie pour concevoir des produits améliorés et personnalisés."
      },
      {
        question: "Quelles sont vos heures d'ouverture ?",
        answer: "Nous sommes ouverts du lundi au vendredi de 8h à 17h. Nous avons également un quart de travail de soir du lundi au jeudi jusqu'à 2h (heure de l'Est). Cependant, les représentants aux ventes sont disponibles en tout temps."
      },
      {
        question: "Puis-je avoir de l'assistance technique sur place ?",
        answer: "Oui, si vous désirez avoir de l'assistance technique sur place, demandez-le à l'un de nos représentants."
      },
      {
        question: "Comment puis-je avoir accès au service d'ingénierie pour un problème particulier ?",
        answer: "Vous pouvez contacter l'un de nos représentants aux ventes à sales@umallette.com."
      },
      {
        question: "Dans quels pays UM offre-t-il ses produits ?",
        answer: "Nous pouvons offrir nos produits dans tous les pays. Nous avons également un vaste réseau de partenaires qui offre un accompagnement local personnalisé."
      },
      {
        question: "UM est-il sur les réseaux sociaux ?",
        answer: "Oui, suivez-nous sur LinkedIn et Facebook."
      }
    ],
    "Catalogues de produits": [
      {
        question: "Comment puis-je accéder à vos catalogues de produits ?",
        answer: "Sur la page catalogues de notre site web ou cliquer ici."
      },
      {
        question: "La ou les pièce(s) que je recherche ne sont pas dans les catalogues de produits.",
        answer: "Nos catalogues sont en développement donc certaines pièces ne s'y trouvent pas encore. Veuillez contacter nos représentants pour connaître notre gamme complète de produits."
      }
    ],
    "Soumission": [
      {
        question: "Comment puis-je avoir une soumission ?",
        answer: "Envoyez vos listes de pièces à sales@umallette.com. Une soumission détaillée vous sera transmise en 24 à 48 heures."
      },
      {
        question: "Sous quel format dois-je envoyer une demande de soumission ?",
        answer: "Le format que vous utilisez pour lister vos pièces importe peu. PDF, Word, Excel, Google, etc."
      },
      {
        question: "En combien de temps puis-je obtenir une soumission ?",
        answer: "À la suite de votre demande, vous obtiendrez une soumission en 24 à 48 heures."
      }
    ],
    "Livraison": [
      {
        question: "Comment fonctionne la livraison ?",
        answer: "Vous pouvez utiliser votre propre compte FedEx, UPS, Purolator, Dicom, etc. Dans ce cas, vous devez nous fournir le numéro de votre compte. Sinon, nous pouvons prendre en charge le transport et ajouter les frais sur votre facture UM."
      },
      {
        question: "Quel est le délai de livraison ?",
        answer: "Le délai de livraison dépend de la disponibilité des pièces. Lorsque vous recevrez votre soumission, une date vous sera fournie. Si nous prenons en charge le transport, au Canada, nous utilisons le service express des transporteurs. En ce qui concerne les États-Unis et tous les autres pays, nous utilisons le service standard. Cependant, si vous désirez le service express, vous pouvez le mentionner lors de votre commande."
      },
      {
        question: "Qui dois-je contacter si j'ai un problème avec la livraison de mon colis ?",
        answer: "Vous pouvez contacter notre soutien administratif et logistique à l'adresse courriel logistic@umallette.com."
      }
    ],
    "Paiement et facturation": [
      {
        question: "Quelle devise acceptez-vous ?",
        answer: "Nous acceptons le dollar canadien (CAD), le dollar américain (USD) et l'euro (€)."
      },
      {
        question: "Comment puis-je payer ma commande ?",
        answer: "Les modes de paiement vous seront transmis par votre représentant lors de la confirmation de votre commande."
      },
      {
        question: "Quand vais-je recevoir ma facture ?",
        answer: "Entre 24 à 48 heures, jour ouvrable, après l'envoi de votre colis. Excepté si un paiement est exigé avant l'expédition. Dans ce cas, une facture proforma vous sera envoyée avant d'effectuer le paiement."
      }
    ]
  }

  const filteredFaqs = Object.entries(faqs).reduce((acc, [category, questions]) => {
    const filteredQuestions = questions.filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
    if (filteredQuestions.length > 0) {
      acc[category] = filteredQuestions
    }
    return acc
  }, {} as typeof faqs)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Centre d'aide</h1>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <Label htmlFor="search">Rechercher dans les FAQ</Label>
          <Input
            id="search"
            type="text"
            placeholder="Tapez votre question ici..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Tabs */}
        <LineTabs 
          tabs={categories} 
          center 
          customID="help-page" 
          selected={activeTab}
          setSelected={setActiveTab}
        />

        {/* FAQ Accordion */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {searchTerm === '' ? (
              <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
                {faqs[activeTab].map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              Object.entries(filteredFaqs).map(([category, questions]) => (
                <div key={category} className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">{category}</h2>
                  <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
                    {questions.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${category}-${index}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))
            )}
          </motion.div>
        </AnimatePresence>

        {searchTerm !== '' && Object.keys(filteredFaqs).length === 0 && (
          <p className="text-center mt-8 text-gray-500">Aucune question correspondante trouvée. Essayez un autre terme de recherche ou contactez le support pour obtenir de l'aide.</p>
        )}

        {/* CTA for Additional Support */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">Besoin de plus d'aide ?</h2>
          <p className="mb-4">Si vous n'avez pas trouvé la réponse que vous cherchiez, notre équipe de support est là pour vous aider.</p>
          <Button asChild>
            <Link href="/contact">Contacter le support</Link>
          </Button>
        </div>

        {/* Privacy Policy and Terms of Service Links */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500">
            Pour plus d'informations, veuillez lire notre{' '}
            <Link href="/privacy-policy" className="text-primary hover:underline">
              Politique de confidentialité
            </Link>{' '}
            et nos{' '}
            <Link href="/terms-of-service" className="text-primary hover:underline">
              Conditions d'utilisation
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}