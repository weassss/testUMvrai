import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground p-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p>Notre volonté est de vous simplifier la vie.</p>
          <p> C’est pour cette raison que de nombreuses compagnies de renommée mondiale nous font confiance depuis plusieurs décennies.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/catalogue">Catalogue</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/help">Help</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/services">Services</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p>Email: sales@umallette.com</p>
          <p>Phone: +1 (514) 608-2297</p>
          <p>Address: 145 Bd Saint- Rémi, Saint-Rémi, QC J0L 2L0</p>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p>&copy;2024 UM Inc, Canada all right reserved</p>
        <Link href="/" className="flex items-center mr-4">
            <Image
              src="/logoUM.png?height=40&width=100"
              alt="UM Logo"
              width={50}
              height={20}
              className="h-8 w-auto"
            />
          </Link>
      </div>
    </footer>
  );
};

export default Footer;