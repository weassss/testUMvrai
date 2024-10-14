import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
      <div className="max-w-md mx-auto">
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2">Name</label>
            <Input id="name" placeholder="Your name" />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2">Email</label>
            <Input id="email" type="email" placeholder="Your email" />
          </div>
          <div>
            <label htmlFor="message" className="block mb-2">Message</label>
            <Textarea id="message" placeholder="Your message" rows={5} />
          </div>
          <Button type="submit" className="w-full">Send Message</Button>
        </form>
      </div>
    </div>
  );
}