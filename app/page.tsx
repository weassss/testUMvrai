import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Welcome to Our Showcase</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-lg mb-6">
            Discover our amazing products and services. We offer top-quality solutions for all your needs.
          </p>
          <div className="flex justify-center space-x-4">
            <Button asChild>
              <Link href="/catalogue">View Catalogue</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
        <div className="relative h-64 md:h-96">
          <Image
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            alt="Showcase Image"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}