'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ShoppingCart, Search, Menu, HelpCircle } from "lucide-react"

function QuickSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prevOpen) => !prevOpen)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const handleHelpClick = () => {
    setOpen(true)
  }

  return (
    <div className="relative w-full">
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Recherche rapide..."
          value={query}
          onChange={handleInputChange}
          className="w-full h-10 pl-10 pr-24 py-2 rounded-full bg-muted transition-shadow duration-200 ease-in-out hover:shadow-[0_0_5px_rgba(0,0,0,0.1)] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 rounded-full"
            onClick={handleHelpClick}
          >
            <HelpCircle className="h-4 w-4" />
            <span className="sr-only">Ouvrir la recherche rapide</span>
          </Button>
          <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Tapez une commande ou effectuez une recherche..." 
          value={query}
          onValueChange={setQuery}
        />
        <CommandList className="max-h-[300px] overflow-y-auto">
          {query && <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>}
          <div className="px-3 py-2">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="pages" className="border-none">
                <AccordionTrigger className="hover:bg-gray-100 hover:no-underline py-2 px-3 rounded-md">Pages</AccordionTrigger>
                <AccordionContent>
                  <CommandGroup>
                    <CommandItem>
                      <Link href="/">Accueil</Link>
                    </CommandItem>
                    <CommandItem>
                      <Link href="/catalogue">Produits</Link>
                    </CommandItem>
                    <CommandItem>
                      <Link href="/services">Produits & Services</Link>
                    </CommandItem>
                    <CommandItem>
                      <Link href="/about">À propos</Link>
                    </CommandItem>
                    <CommandItem>
                      <Link href="/help">Aide</Link>
                    </CommandItem>
                    <CommandItem>
                      <Link href="/jobs">Emplois</Link>
                    </CommandItem>
                    <CommandItem>
                      <Link href="/contact">Nous Joindre</Link>
                    </CommandItem>
                  </CommandGroup>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="products" className="border-none">
                <AccordionTrigger className="hover:bg-gray-100 hover:no-underline py-2 px-3 rounded-md">Produits</AccordionTrigger>
                <AccordionContent>
                  <CommandGroup>
                    <CommandItem>Outils</CommandItem>
                    <CommandItem>Équipements</CommandItem>
                    <CommandItem>Accessoires</CommandItem>
                    <CommandItem>Pièces détachées</CommandItem>
                    <CommandItem>Consommables</CommandItem>
                  </CommandGroup>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="services" className="border-none">
                <AccordionTrigger className="hover:bg-gray-100 hover:no-underline py-2 px-3 rounded-md">Services</AccordionTrigger>
                <AccordionContent>
                  <CommandGroup>
                    <CommandItem>Consultation</CommandItem>
                    <CommandItem>Installation</CommandItem>
                    <CommandItem>Maintenance</CommandItem>
                    <CommandItem>Formation</CommandItem>
                    <CommandItem>Support technique</CommandItem>
                  </CommandGroup>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </CommandList>
      </CommandDialog>
    </div>
  )
}

function CartSheet() {
  const [cartItems, setCartItems] = useState([])

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="relative w-10 h-10 rounded-full hover:bg-muted transition-colors duration-200"
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="sr-only">Ouvrir le panier</span>
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary flex items-center justify-center text-[11px] font-medium text-primary-foreground">
              {cartItems.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Panier</SheetTitle>
          <SheetDescription>
            {cartItems.length === 0
              ? "Votre panier est vide."
              : "Voici les articles dans votre panier."}
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4 flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-muted-foreground mb-4">Il n'y a aucun article dans votre panier.</p>
              <Link href="/catalogue" passHref>
                <Button>
                  Voir nos produits
                </Button>
              </Link>
            </div>
          ) : (
            <p>Affichage des articles du panier ici.</p>
          )}
        </div>
        {cartItems.length > 0 && (
          <SheetFooter>
            <Button className="w-full">
              Passer à la caisse
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}

function LanguageSwitch() {
  const [language, setLanguage] = useState('FR')

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white shadow-md rounded-full p-2 flex items-center space-x-2">
      <Switch
        id="language-switch"
        checked={language === 'EN'}
        onCheckedChange={() => setLanguage(language === 'FR' ? 'EN' : 'FR')}
        className="data-[state=checked]:bg-[#8ADD69]"
      />
      <Label htmlFor="language-switch" className="text-sm font-medium">
        {language}
      </Label>
    </div>
  )
}

function MobileMenu() {
  return (
    <Sheet>
      <div className="md:hidden mt-6">
          <QuickSearch />
        </div>
      <SheetTrigger asChild>
        
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Ouvrir le menu</span>
        </Button>
        
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col space-y-4 mt-4">
          <Link href="/" passHref>
            <SheetClose asChild>
              <Button variant="ghost" className="w-full justify-start">Accueil</Button>
            </SheetClose>
          </Link>
          <Link href="/catalogue" passHref>
            <SheetClose asChild>
              <Button variant="ghost" className="w-full justify-start">Catalogue</Button>
            </SheetClose>
          </Link>
          <Link href="/services" passHref>
            <SheetClose asChild>
              <Button variant="ghost" className="w-full justify-start">Produits & Services</Button>
            </SheetClose>
          </Link>
          <Link href="/about" passHref>
            <SheetClose asChild>
              <Button variant="ghost" className="w-full justify-start">À propos</Button>
            </SheetClose>
          </Link>
          <Link href="/help" passHref>
            <SheetClose asChild>
              <Button variant="ghost" className="w-full justify-start">Aide</Button>
            </SheetClose>
          </Link>
          <Link href="/jobs" passHref>
            <SheetClose asChild>
              <Button variant="ghost" className="w-full justify-start">Emplois</Button>
            </SheetClose>
          </Link>
          <Link href="/contact" passHref>
            <SheetClose asChild>
              <Button variant="ghost" className="w-full justify-start">Nous Joindre</Button>
            </SheetClose>
          </Link>
        </nav>

      </SheetContent>
    </Sheet>
  )
}

export default function Component() {
  return (
    <>
      <nav className="bg-white p-4 fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center mr-4">
            <Image
              src="/media/logoUM.png"
              alt="UM Logo"
              width={50}
              height={20}
              className="h-8 w-auto"
            />
          </Link>
          <div className="hidden md:flex items-center space-x-4 flex-grow mx-4">
            <div className="flex items-center space-x-4">
              <Link href="/catalogue" passHref>
                <Button variant="ghost">Catalogue</Button>
              </Link>
              <Link href="/services" passHref>
                <Button variant="ghost">Produits & Services</Button>
              </Link>
              <Link href="/about" passHref>
                <Button variant="ghost">À propos</Button>
              </Link>
              <Link href="/help" passHref>
                <Button variant="ghost">Aide</Button>
              </Link>
              <Link href="/jobs" passHref>
                <Button variant="ghost">Emplois</Button>
              </Link>
              <Link href="/contact" passHref>
                <Button variant="ghost">Nous Joindre</Button>
              </Link>
            </div>
            <div className="flex-grow">
              <QuickSearch />
            </div>
          </div>
          <div className="flex items-center">
            <CartSheet />
            <MobileMenu />
          </div>
        </div>
      </nav>
      <LanguageSwitch />
    </>
  )
}