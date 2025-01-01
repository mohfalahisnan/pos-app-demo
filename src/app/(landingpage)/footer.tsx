import { Heart } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="border-t mt-14 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          {/* Logo and Description */}
          <div className="mb-6 md:mb-0">
            <h1 className="text-2xl font-bold">
              POS PRO <span className="text-xs">v1.0</span>
            </h1>
            <p className="mt-2 ">Solusi manajemen bisnis terbaik untuk meningkatkan produktivitas dan efisiensi Anda.</p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col md:flex-row gap-8">
            <div>
              <h2 className="text-lg font-semibold mb-2">Menu</h2>
              <ul>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/features">Features</Link>
                </li>
                <li>
                  <Link href="/pricing">Pricing</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Social Media</h2>
              <ul>
                <li>
                  <Link href="#">Facebook</Link>
                </li>
                <li>
                  <Link href="#">Twitter</Link>
                </li>
                <li>
                  <Link href="#">Instagram</Link>
                </li>
                <li>
                  <Link href="#">LinkedIn</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 border-t pt-4 text-center">
          <p className="text-sm">
            Developed with love <Heart size={12} className="inline -mt-0.5 mr-1" fill="red" stroke="red" />
            by Mavolo Studio. <br />© {new Date().getFullYear()} POS PRO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
