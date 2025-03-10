'use client';
import { ChevronLeft, Fullscreen, SearchIcon, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import Cart from './cart';
import ProductCard from './product-card';
import { CartProvider } from './product-cart-context';

const Page = () => {
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <CartProvider>
      <div className="w-full h-screen flex overflow-hidden">
        <div className="w-full h-screen overflow-auto">
          <div className="flex justify-between gap-2 items-center p-4">
            <div className="flex gap-2">
              <Link href={'/dashboard'}>
                <Button size={'icon'} variant={'secondary'}>
                  <ChevronLeft />
                </Button>
              </Link>
              <div className="relative">
                <Input className="w-64 bg-white" placeholder="Search..." />
                <div className="absolute top-0 right-0">
                  <Button variant={'secondary'} className="rounded">
                    <SearchIcon />
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant={'secondary'} size={'icon'}>
                <SlidersHorizontal />
              </Button>
              <Button onClick={toggleFullscreen} variant={'secondary'} size={'icon'}>
                <Fullscreen />
              </Button>
            </div>
          </div>
          <div className="flex gap-4 p-4">
            {['All', 'Sneaker', 'Bag', 'Shirt', 'Pants'].map(item => (
              <Button key={item} variant={'secondary'}>
                {item}
              </Button>
            ))}
          </div>
          <ProductCard />
        </div>
        <div className="w-96 bg-card h-screen">
          <Cart />
        </div>
      </div>
    </CartProvider>
  );
};

export default Page;
