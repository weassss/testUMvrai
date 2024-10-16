'use client'

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  IconUsers,
  IconHeart,
  IconCoffee,
  IconTruck,
  IconMail,
} from "@tabler/icons-react";

// Utility function
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// BentoGrid component
const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

// BentoGridItem component
const BentoGridItem = ({
  className,
  title,
  description,
  icon,
  image,
}: {
  className?: string;
  title: string;
  description: React.ReactNode;
  icon: React.ReactNode;
  image?: string;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={cn(
        "relative overflow-hidden rounded-xl group hover:shadow-lg transition duration-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 h-full",
        className
      )}
    >
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-center mb-4">
          <div className="bg-primary text-primary-foreground p-2 rounded-full mr-3">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h3>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300 flex-grow overflow-auto">
          {description}
        </div>
        {image && (
          <div className="mt-4">
            <Image
              src={image}
              alt={title}
              width={400}
              height={200}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Main component
export default function CareersPage() {
  const items = [
    {
      title: "L'ÉQUIPE",
      description: "Notre entreprise se démarque par la synergie des compétences de l'équipe d'ingénierie, de la gestion de l'équipe de bureaux et de la polyvalence du département de fabrication.",
      icon: <IconUsers className="h-6 w-6" />,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LRG_DSC02786_JPEG-apXXkKtzTYzZSd4rYaW3lsWe4AZL15.jpeg",
    },
    {
      title: "LES AVANTAGES SOCIAUX",
      description: (
        <ul className="list-disc list-inside">
          <li>Paie hebdomadaire</li>
          <li>Régime d'assurance collective</li>
          <li>Conciliation famille/travail</li>
          <li>Formations internes et externes</li>
        </ul>
      ),
      icon: <IconHeart className="h-6 w-6" />,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1c5951_189ef368054b491180a7ee211674f472~mv2-7SiyWEI3rqUFtcJdgQbYW4FUtYFfrm.jpg",
    },
    {
      title: "L'ENVIRONNEMENT DE TRAVAIL",
      description: (
        <ul className="list-disc list-inside">
          <li>Collations & breuvages à petits prix</li>
          <li>Tables à pique-nique</li>
          <li>Salle privée pour les réunions</li>
          <li>Et beaucoup plus!</li>
        </ul>
      ),
      icon: <IconCoffee className="h-6 w-6" />,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1c5951_d3c3c5ad04e940cf8cdd10866c278256~mv2-OJvWwc5HeRo98j5pRhnnJDTJB1LO9K.jpg",
    },
    {
      title: "LE CLUB SOCIAL",
      description: (
        <ul className="list-disc list-inside">
          <li>Bibliothèque commune</li>
          <li>Dîners</li>
          <li>Camion de cuisine de rue</li>
          <li>BBQ</li>
        </ul>
      ),
      icon: <IconTruck className="h-6 w-6" />,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1c5951_2368357cb633476898b26de667044222~mv2-7yCKK2q3rOhiUfRVTYXbiZYoN87KvU.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="bg-primary text-primary-foreground py-24 px-4">
        <div className="container mx-auto text-center">
          <motion.h1 
            className="text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Carrières chez UM
          </motion.h1>
          <motion.p 
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Rejoignez notre équipe et faites partie de notre succès. Découvrez les opportunités qui vous attendent.
          </motion.p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">POURQUOI TRAVAILLER CHEZ UM ?</h2>
          <BentoGrid>
            {items.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                icon={item.icon}
                image={item.image}
              />
            ))}
          </BentoGrid>
        </section>

        <section className="text-center max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-8">Prêt à relever de nouveaux défis ?</h2>
          <p className="mb-8 text-lg">
            Nous vous offrons l'opportunité de vivre une expérience enrichissante au sein d'une équipe compétente. Faites-nous parvenir votre CV!
          </p>
          <div className="space-y-4">
            <Button size="lg" asChild className="w-full sm:w-auto transition duration-300 ease-in-out transform hover:scale-105">
              <Link href="/submit-application">Soumettre une candidature spontanée</Link>
            </Button>
            <p className="text-sm text-gray-600 dark:text-gray-400 flex justify-center items-center">
              <IconMail className="mr-2" />
              Ou envoyez directement un mail à{' '}
              <a href="mailto:ac@umallette.com" className="text-primary hover:underline ml-1">
                ac@umallette.com
              </a>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}