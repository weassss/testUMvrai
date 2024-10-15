'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Help() {
  const [searchTerm, setSearchTerm] = useState('')

  const faqs = [
    {
      question: "What types of manufacturing services do you offer?",
      answer: "We offer a wide range of manufacturing services including CNC machining, 3D printing, injection molding, and more. Our services cater to various industries such as automotive, aerospace, and consumer goods."
    },
    {
      question: "How can I request a quote for your services?",
      answer: "You can request a quote by filling out the form on our Contact page or by emailing us directly at quotes@umallettemanufacturing.com. Please provide as much detail as possible about your project for an accurate quote."
    },
    {
      question: "What is your typical turnaround time for orders?",
      answer: "Our turnaround time varies depending on the complexity and size of the order. For standard orders, we typically deliver within 2-3 weeks. For rush orders or large-scale projects, please contact us directly for a more accurate timeline."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we offer international shipping to most countries. Shipping costs and delivery times will vary based on the destination. Please contact our sales team for more information on international orders."
    },
    {
      question: "What quality certifications does your company hold?",
      answer: "We are ISO 9001:2015 certified, ensuring that we maintain high-quality standards in all our processes. We also comply with industry-specific standards as required by our clients."
    },
    {
      question: "Can you work with custom materials or specifications?",
      answer: "We pride ourselves on our ability to work with a wide range of materials and custom specifications. Please provide details about your specific requirements when requesting a quote."
    }
  ]

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Help Center</h1>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <Label htmlFor="search">Search FAQs</Label>
          <Input
            id="search"
            type="text"
            placeholder="Type your question here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
          {filteredFaqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {filteredFaqs.length === 0 && (
          <p className="text-center mt-8 text-gray-500">No matching questions found. Try a different search term or contact support for assistance.</p>
        )}

        {/* CTA for Additional Support */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">Need More Help?</h2>
          <p className="mb-4">If you couldn't find the answer you were looking for, our support team is here to help.</p>
          <Button asChild>
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>

        {/* Privacy Policy and Terms of Service Links */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500">
            For more information, please read our{' '}
            <Link href="/privacy-policy" className="text-primary hover:underline">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link href="/terms-of-service" className="text-primary hover:underline">
              Terms of Service
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}