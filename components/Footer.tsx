import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground p-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p>We are a showcase website demonstrating the power of Next.js 14 and modern web development techniques.</p>
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
          <p>Email: info@showcase.com</p>
          <p>Phone: +1 (123) 456-7890</p>
          <p>Address: 123 Web Dev Street, Internet City, 12345</p>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p>&copy; 2023 Showcase Website. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;