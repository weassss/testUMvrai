import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  { question: 'How do I place an order?', answer: 'To place an order, browse our catalogue, select the items you want, and add them to your cart. Then proceed to checkout and follow the instructions.' },
  { question: 'What payment methods do you accept?', answer: 'We accept credit cards, PayPal, and bank transfers. All payments are processed securely.' },
  { question: 'How long does shipping take?', answer: 'Shipping times vary depending on your location. Typically, orders are delivered within 3-5 business days for domestic shipping and 7-14 days for international shipping.' },
  { question: 'What is your return policy?', answer: 'We offer a 30-day return policy for most items. Please contact our customer service team to initiate a return.' },
];

export default function Help() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Help & FAQ</h1>
      <div className="max-w-2xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}