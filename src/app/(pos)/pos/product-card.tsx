'use client';

import { Prisma, Product } from '@prisma/client';
import { Loader, Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { DebouncedInput } from '@/components/ui/debounced-input';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAllProduct, useProduct } from '@/hooks/product';
import { formatToRupiah } from '@/lib/currency';

import { useCart } from './product-cart-context';

function ProductCard() {
  const { data: products, isLoading } = useAllProduct();
  if (isLoading)
    return (
      <div className="flex w-full py-8 justify-center items-center">
        <Loader className="animate-spin" />
      </div>
    );

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {products &&
        products.map(item => {
          return <ProductItem key={item.id} item={item} />;
        })}
    </div>
  );
}

export default ProductCard;

const ProductItem = ({ item }: { item: Product }) => {
  const { cartDispatch } = useCart();
  const [qty, setQty] = useState(1);
  const [selectedAttribute, setSelectedAttribute] = useState<string>();
  const handleAddToCart = (product: Product) => {
    console.log('Adding to cart:', product);
    cartDispatch({
      type: 'ADD_TO_CART',
      payload: { ...product, quantity: qty }
    });
    setQty(1);
  };
  const data = useProduct(item.id, {
    Variant: {
      include: {
        attributes: {
          include: {
            Stock: true,
            WholesalePrice: true
          }
        }
      }
    }
  });
  const product = data.data as Prisma.ProductGetPayload<{
    include: {
      Variant: {
        include: {
          attributes: {
            include: {
              Stock: true;
              WholesalePrice: true;
            };
          };
        };
      };
    };
  }>;
  return (
    <Dialog>
      <DialogTrigger>
        <div className="w-full bg-card rounded-lg shadow-sm p-1">
          <Image src={item.imageUrl || '/image1.jpg'} alt="iamge" width={200} height={200} className="w-full aspect-square object-cover rounded" />
          <div className="p-4">
            <h4 className="text-lg font-bold">{item.name}</h4>
            <h5 className="text-zinc-700">{formatToRupiah(item.price)}</h5>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle className="capitalize">{item.name}</DialogTitle>
        <DialogDescription>
          {data.data &&
            product.Variant.map(variant => {
              return (
                <div key={variant.id} className="mb-4">
                  <h3 className="font-bold text-lg capitalize">{variant.name} :</h3>
                  <div className="flex gap-2">
                    {variant.attributes.map(attribute => (
                      <Button
                        variant={selectedAttribute === attribute.id ? 'default' : 'secondary'}
                        key={attribute.id}
                        onClick={() => setSelectedAttribute(attribute.id)}
                      >
                        {attribute.name}
                      </Button>
                    ))}
                  </div>
                </div>
              );
            })}
          <div className="flex w-full justify-between items-center gap-2">
            <Button onClick={() => setQty(qty !== 0 ? qty - 1 : 0)}>
              <Minus />
            </Button>

            <DebouncedInput type="number" className="text-center" value={qty} onChange={e => setQty(parseInt(e as string))} />
            <Button onClick={() => setQty(qty + 1)}>
              <Plus />
            </Button>
          </div>
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={() => handleAddToCart(item)}>Add to cart</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
