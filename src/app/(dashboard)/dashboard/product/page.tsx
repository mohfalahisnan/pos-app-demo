"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { getProducts } from "@/server/product";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

function Page() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => await getProducts(),
  });
  if (isLoading)
    return (
      <div className="grid grid-cols-4 gap-4">
        <Skeleton className="w-full aspect-square animate-pulse" />
        <Skeleton className="w-full aspect-square animate-pulse" />
        <Skeleton className="w-full aspect-square animate-pulse" />
        <Skeleton className="w-full aspect-square animate-pulse" />
      </div>
    );
  return (
    <div className="grid grid-cols-4 gap-4">
      {data &&
        data.data.map((item) => (
          <Dialog key={item.id}>
            <DialogTrigger>
              <div className="w-full relative aspect-square rounded overflow-hidden">
                <div>
                  <Image
                    src={item.imageUrl || "/image1.jpg"}
                    width={400}
                    height={400}
                    alt={item.name}
                    className="w-full aspect-square object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-0 w-full p-4 bg-white/20">
                  {item.name}
                </div>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{item.name}</DialogTitle>
                <DialogDescription className="relative">
                  <Image
                    src={item.imageUrl || "/image1.jpg"}
                    width={400}
                    height={400}
                    alt={item.name}
                    className="w-full aspect-square object-cover rounded overflow-hidden"
                  />
                  <div className="absolute bottom-0 left-0 p-4 bg-white/20 w-full text-lg">
                    Rp.{item.price}
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:justify-end">
                <DialogClose asChild>
                  <Button type="button">Edit</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button type="button" variant="destructive">
                    Delete
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ))}
    </div>
  );
}

export default Page;
