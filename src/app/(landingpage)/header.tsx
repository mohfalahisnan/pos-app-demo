'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { LoginButton } from '@/components/auth-button';
import { Button } from '@/components/ui/button';

const MENU = [
  {
    href: '/',
    title: 'Home'
  },
  {
    href: '/features',
    title: 'Features'
  },
  {
    href: '/pricing',
    title: 'Pricing'
  },
  {
    href: '/about',
    title: 'About Us'
  },
  {
    href: '/contact',
    title: 'Contact'
  }
];

function Header() {
  const path = usePathname();
  const [hover, setHover] = useState('');
  return (
    <header className="mb-8 py-4 md:py-8 px-4 md:px-0">
      <div className="w-full flex justify-between  items-center h-20">
        <div className="w-52">
          <div className="relative w-12 h-12 rounded-full bg-card flex items-center justify-center">
            <LayoutDashboard fill="black" size={20} />
          </div>
        </div>
        <div className="rounded-full p-1.5 h-12 bg-card hidden xl:flex flex-row items-center justify-center">
          <AnimatePresence>
            <ul className="font-medium text-sm flex flex-row gap-2 xl:gap-4">
              {MENU.map((item, i) => (
                <Link
                  href={item.href}
                  key={i + item.href}
                  onMouseEnter={() => setHover(item.href)}
                  onMouseLeave={() => setHover(path)}
                  className={`rounded-full relative h-10 items-center transition-all duration-150 flex px-4 xl:px-6 ${
                    path === item.href ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  <li className="relative z-20">{item.title}</li>
                  {hover === item.href && (
                    <motion.div layout layoutId="bg-menu" className="bg-background z-10 rounded-full w-full h-full inset-0 absolute top-0 left-0" />
                  )}
                  {path === item.href && (
                    <motion.div layout layoutId="bg-menu" className="bg-background z-10 rounded-full w-full h-full inset-0 absolute top-0 left-0" />
                  )}
                </Link>
              ))}
            </ul>
          </AnimatePresence>
        </div>
        <div className="flex w-52 items-center justify-end gap-2 xl:gap-4">
          {/* <Button size={"icon"} variant={"secondary"} className="rounded-full">
            <Search />
          </Button> */}
          <LoginButton />
          <Button variant={'default'} className="rounded-full">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
