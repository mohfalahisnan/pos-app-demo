'use client';
import { useCart } from './product-cart-context';

function Cart() {
  const { cartState, cartDispatch } = useCart();

  const handleRemoveFromCart = (id: string) => {
    cartDispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  };
  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cartState.cartItems.map(item => (
          <li key={item.id}>
            {item.name} x {item.quantity} = {item.price * item.quantity}
            <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total Items: {cartState.totalItems}</p>
      <p>Total Price: {cartState.totalPrice}</p>
    </div>
  );
}

export default Cart;
