import { Check } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div>
      <div className="relative z-20 flex flex-col items-center justify-center">
        <div className="mt-16 relative text-8xl xl:text-9xl font-black">
          POS PRO
          <div className="bg-blue-600 text-white w-8 xl:w-12 border-4 border-background aspect-square rounded-full absolute top-0 xl:top-1 right-0 xl:text-sm text-xs flex items-center justify-center font-normal">
            v1.0
          </div>
        </div>
        <div className="text-xl xl:text-2xl text-zinc-500 font-bold tracking-[0.25em]">MULTIPURPOSE DEMO</div>
      </div>
      {/* hexagon top */}
      <div className="relative z-10 -mt-24">
        <div className="flex items-center justify-center gap-4">
          <div className="hexagon h-28 bg-white/50" />
          <div className="hexagon h-28 bg-white/50" />
          <div className="hexagon h-28 bg-white/50" />
        </div>
        <div className="flex -mt-2 items-center justify-center gap-4">
          <div className="hexagon h-28 bg-white/50" />
          <div className="hexagon h-28 bg-white/50" />
        </div>
        <div className="flex -mt-2 items-center justify-center gap-4">
          <div className="hexagon h-28 bg-white/50" />
        </div>
        <div className="bg-gradient-to-b from-background to-transparent w-full absolute top-0 h-16" />
        <div className="bg-gradient-to-t from-background to-transparent w-full absolute bottom-0 h-16" />
      </div>
      {/* middle */}
      <div className="relative -mt-10 flex gap-8 xl:gap-16 p-4 xl:p-0 z-20">
        <div className="aspect-square w-full bg-background/10 bg-clip-padding backdrop-filter backdrop-blur-sm border rounded-2xl p-2">
          <div className="bg-[#e9e9e9] w-full h-full rounded-xl inset-0"></div>
        </div>
        <div className="aspect-square w-full bg-white/5 bg-clip-padding backdrop-filter backdrop-blur-sm border rounded-2xl p-2 scale-125 shadow-[0px_0px_43px_0px_rgba(0,_0,_0,_0.1)] relative z-20">
          <div className="bg-[#e9e9e9] w-full h-full rounded-xl inset-0"></div>
        </div>
        <div className="aspect-square w-full bg-background/10 bg-clip-padding backdrop-filter backdrop-blur-sm border rounded-2xl p-2">
          <div className="bg-[#e9e9e9] w-full h-full rounded-xl inset-0"></div>
        </div>
      </div>
      {/* hexagon bot */}
      <div className="relative z-10 -mt-10">
        <div className="flex items-center justify-center gap-4">
          <div className="hexagon h-28 bg-white/50" />
        </div>
        <div className="flex -mt-2 items-center justify-center gap-4">
          <div className="hexagon h-28 bg-white/50" />
          <div className="hexagon h-28 bg-white/50" />
        </div>
        <div className="flex -mt-2 items-center justify-center gap-4">
          <div className="hexagon h-28 bg-white/50" />
          <div className="hexagon h-28 bg-white/50" />
          <div className="hexagon h-28 bg-white/50" />
        </div>
        <div className="bg-gradient-to-b from-background to-transparent w-full absolute top-0 h-16" />
        <div className="bg-gradient-to-t from-background to-transparent w-full absolute bottom-0 h-16" />
      </div>
      <div className="xl:py-10 py-6 p-4 xl:p-0  text-5xl xl:text-8xl font-bold -mt-24 xl:-mt-32 z-20 relative">
        Its ready and set.
        <br />
        Just go.
      </div>
      <div className="mt-8 xl:mt-16">
        <div className="flex flex-col p-4 xl:p-0 md:flex-row gap-16 items-center">
          <div className="bg-[#e9e9e9] rounded-xl w-full aspect-square"></div>
          <div className="w-full">
            <div className="aspect-square w-16 border-4 text-green-500 border-green-500 rounded-full flex items-center justify-center">
              <Check size={48} />
            </div>
            <p className="my-16 text-zinc-500 text-lg tracking-widest">
              Kelola Bisnis Anda dengan Mudah dan Cepat! Dengan POSPRO, nikmati kemudahan mengatur penjualan, inventaris, dan laporan keuangan dalam satu
              platform. Cocok untuk segala jenis usaha, mulai dari toko ritel hingga restoran. Dapatkan kontrol penuh atas bisnis Anda dan tingkatkan
              produktivitas dengan fitur canggih dan antarmuka yang intuitif. Mulai sekarang dan rasakan perbedaannya!
            </p>
            <Button size={'lg'} className="rounded-full">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
