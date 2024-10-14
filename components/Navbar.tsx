'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Home, ShoppingBag, Phone, HelpCircle, Info, Wrench, ShoppingCart, Search } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const { cart } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchQuery);
  };

  return (
    <nav className="bg-primary text-primary-foreground p-4">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <Link href="/" className="text-2xl font-bold">Showcase</Link>
        <form onSubmit={handleSearch} className="flex-grow max-w-md mx-4">
          <div className="flex">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
            <Button type="submit" className="ml-2">
              <Search size={18} />
            </Button>
          </div>
        </form>
        <ul className="flex space-x-4 mt-4 md:mt-0">
          <NavItem href="/" icon={<Home size={18} />} text="Home" />
          <NavItem href="/catalogue" icon={<ShoppingBag size={18} />} text="Catalogue" />
          <NavItem href="/contact" icon={<Phone size={18} />} text="Contact" />
          <NavItem href="/help" icon={<HelpCircle size={18} />} text="Help" />
          <NavItem href="/about" icon={<Info size={18} />} text="About" />
          <NavItem href="/services" icon={<Wrench size={18} />} text="Services" />
          <NavItem 
            href="/cart" 
            icon={<ShoppingCart size={18} />} 
            text={`Cart (${itemCount})`}
          />
        </ul>
      </div>
    </nav>
  );
};

const NavItem = ({ href, icon, text }: { href: string; icon: React.ReactNode; text: string }) => (
  <li>
    <Link href={href} className="flex items-center hover:text-secondary-foreground transition-colors">
      {icon}
      <span className="ml-1">{text}</span>
    </Link>
  </li>
);

export default Navbar;