'use client';
import { Trash2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { formatToRupiah } from '@/lib/currency';

import { CartItem, useCart } from './product-cart-context';

function Cart() {
  const { cartState, cartDispatch } = useCart();

  const handleRemoveFromCart = (id: string) => {
    cartDispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  };
  return (
    <div className="flex p-4 h-screen justify-between items-start flex-col gap-4">
      <h2>Order Details</h2>
      <div className="flex flex-col gap-4 w-full  h-full">
        {cartState.cartItems.map(item => (
          <CartItemCard key={item.id} item={item} />
        ))}
      </div>
      <div className="p-4 bg-accent w-full rounded-lg shadow-sm">
        <div className="grid grid-cols-2">
          <p>Total Items:</p>
          <p className="text-right"> {cartState.totalItems}</p>
          <p>Total Price:</p>
          <p className="text-right"> {formatToRupiah(cartState.totalPrice)}</p>
        </div>
      </div>
    </div>
  );
}

export default Cart;

const CartItemCard = ({ item }: { item: CartItem }) => {
  const { cartState, cartDispatch } = useCart();

  const handleRemoveFromCart = (id: string) => {
    cartDispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  };
  return (
    <div className="flex justify-between items-center border p-2 rounded-lg w-full">
      <div>
        {item.name} x {item.quantity} = {formatToRupiah(item.price * item.quantity)}
      </div>
      <Button variant={'outline'} size={'icon'} onClick={() => handleRemoveFromCart(item.id)}>
        <Trash2Icon className="w-4 h-4" />
      </Button>
    </div>
  );
};
