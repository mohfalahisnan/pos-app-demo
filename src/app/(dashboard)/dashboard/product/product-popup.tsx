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
import { getProductById } from "@/server/product";
import { getSelectedStore } from "@/Storage/Data";
import { Prisma, Product } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

function ProductPopup({ item }: { item: Product }) {
  const warehouseId = getSelectedStore();
  const detail = useQuery({
    queryKey: ["product-detail", item.id],
    queryFn: async () =>
      await getProductById(item.id, {
        category: true,
        Stock: {
          include: {
            VariantAttribute: true,
            warehouse: true,
            store: true,
          },
        },
      }),
  });
  const data = detail.data as Prisma.ProductGetPayload<{
    include: {
      Stock: {
        include: {
          VariantAttribute: true;
          warehouse: true;
          store: true;
        };
      };
    };
  }>;
  console.log(data);
  return (
    <Dialog>
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
            <br />
            {data?.Stock &&
              data.Stock.map((stock) => (
                <div key={stock.id}>
                  {stock.warehouse?.id && stock.warehouseId === warehouseId && (
                    <div>
                      {stock.quantity} {stock.VariantAttribute.name} di{" "}
                      {stock?.warehouse?.name} {stock.store?.name}
                    </div>
                  )}
                </div>
              ))}
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
  );
}

export default ProductPopup;
