import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Linkedin, Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-16 mx-4 my-8 rounded-3xl shadow-lg">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <p className="text-lg font-semibold mb-4">Notre volonté est de vous simplifier la vie.</p>
          <p className="text-sm text-gray-600">
            C'est pour cette raison que de nombreuses compagnies de renommée mondiale nous font confiance depuis plusieurs décennies.
          </p>
        </div>

        <div className="flex flex-wrap -mx-4 justify-center">
          {/* Company Info */}
          <div className="w-full md:w-1/3 px-4 mb-8 md:mb-0 text-center">
            <Image 
              src="/logoUM.png" 
              alt="UM logo" 
              width={100} 
              height={40} 
              className="mb-4 mx-auto"
            />
            <div className="flex justify-center space-x-4 mb-4">
              <Link href="https://www.facebook.com/umallette/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600">
                <Facebook size={20} />
              </Link>
              <Link href="https://www.linkedin.com/company/um-inc/?originalSubdomain=ca" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600">
                <Linkedin size={20} />
              </Link>
            </div>
            <div className="text-sm text-gray-600">
              <p className="mb-2 flex items-center justify-center">
                <Phone size={16} className="mr-2" />
                <a href="tel:+15146082297">+1 (514) 608-2297</a>
              </p>
              <p className="mb-2 flex items-center justify-center">
                <Mail size={16} className="mr-2" />
                <a href="mailto:sales@umallette.com">sales@umallette.com</a>
              </p>
            </div>
          </div>

          {/* Footer Links */}
          <div className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
            <div className="flex -mx-4 justify-center">
              <div className="w-full px-4">
                <h4 className="text-sm font-semibold mb-4 text-center">Pages</h4>
                <ul className="text-sm text-gray-600 text-center">
                  <li className="mb-2"><Link href="/">Home</Link></li>
                  <li className="mb-2"><Link href="/catalogue">Catalogue</Link></li>
                  <li className="mb-2"><Link href="/contact">Contact</Link></li>
                  <li className="mb-2"><Link href="/help">Help</Link></li>
                  <li className="mb-2"><Link href="/about">About</Link></li>
                  <li className="mb-2"><Link href="/services">Services</Link></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Map and Address */}
          <div className="w-full md:w-1/3 px-4">
            <div className="rounded-xl overflow-hidden mb-4">
              <Image 
                src="/placeholder.svg?height=200&width=400" 
                alt="Location Map" 
                width={400} 
                height={200} 
                className="w-full"
              />
            </div>
            <p className="text-sm text-gray-600 flex items-start justify-center">
              <MapPin size={16} className="mr-2 mt-1 flex-shrink-0" />
              <span>145 Bd Saint-Rémi, Saint-Rémi, QC J0L 2L0</span>
            </p>
          </div>
        </div>

        {/* Bottom Footer */}
        
      </div>
      <div className="border-t border-gray-200 mt-12 pt-8 flex flex-wrap justify-center items-center">
          <p className="text-sm text-gray-600  md:mb-0 md:mr-4">© 2024 UM. All rights reserved.</p>
          <div className="flex space-x-4 text-sm text-gray-600">
            <Link href="/terms">Terms & conditions</Link>
            <Link href="/cookies">Cookies</Link>
            <Link href="/privacy">Privacy policy</Link>
          </div>
        </div>
    </footer>
  )
}