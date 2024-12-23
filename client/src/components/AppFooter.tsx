'use client';

import { useUser } from '@/contexts/UserContext';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Phone } from 'lucide-react';

export default function Footer() {
  const { isAuthenticated } = useUser();
  const pathname = usePathname();
  const ignorePathnames = ['/manage-songs', '/upload-song', '/manage-albums'];

  return (
    <footer
      className={`relative text-white p-8 ${!isAuthenticated || ignorePathnames.includes(pathname) ? 'hidden' : ''}`}
    >
      {/* Curved top edge */}
      <div className="mt-8"></div>
      {/* */}

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* About Section */}
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold mb-4">About</h2>
            <p className="text-gray-300 mb-2 text-justify">
              Vera is a website that has been created for over{' '}
              <span className="text-pink-500">5 weeks</span> now and it is one
              of the most famous music player website&apos;s in the world. In
              this website you can listen and download songs for free, also if
              you want no limitation you can buy our{' '}
              <Link href="#" className="text-blue-600 hover:text-blue-400">
                premium pass
              </Link>
              .
            </p>
          </div>

          {/* Logo and Social Links */}
          <div className="flex flex-col items-center gap-8">
            <h1 className="title-text-gradient text-4xl font-bold tracking-wider text-pink-500">
              VERA
            </h1>
            <div className="flex flex-row gap-4">
              <Link href="#" className="hover:text-pink-500 transition-colors">
                <Facebook size={30} />
              </Link>
              <Link href="#" className="hover:text-pink-500 transition-colors"> 
                <Instagram size={30} />
              </Link>
              <Link href="#" className="hover:text-pink-500 transition-colors">
                <Twitter size={30} />
              </Link>
              <Link href="#" className="hover:text-pink-500 transition-colors">
                <Phone size={30} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
