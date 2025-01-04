'use client';
import { Product } from '@prisma/client';
import { createContext, ReactNode, useContext, useReducer } from 'react';

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  totalItems: number;
  totalPrice: number;
}

type CartAction = { type: 'ADD_TO_CART'; payload: CartItem } | { type: 'REMOVE_FROM_CART'; payload: { id: string } } | { type: 'CLEAR_CART' };

// Initial state
const initialState: CartState = {
  cartItems: [],
  totalItems: 0,
  totalPrice: 0
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);

      if (existingItemIndex > -1) {
        // Item exists, update its quantity
        const updatedItems = state.cartItems.map((item, index) =>
          index === existingItemIndex ? { ...item, quantity: item.quantity + action.payload.quantity } : item
        );

        return {
          ...state,
          cartItems: updatedItems,
          totalItems: state.totalItems + action.payload.quantity,
          totalPrice: state.totalPrice + action.payload.quantity * action.payload.price
        };
      }

      // Item does not exist, add it to the cart
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
        totalItems: state.totalItems + action.payload.quantity,
        totalPrice: state.totalPrice + action.payload.quantity * action.payload.price
      };
    }

    case 'REMOVE_FROM_CART': {
      const filteredItems = state.cartItems.filter(item => item.id !== action.payload.id);
      const removedItem = state.cartItems.find(item => item.id === action.payload.id);

      return {
        ...state,
        cartItems: filteredItems,
        totalItems: state.totalItems - (removedItem?.quantity || 0),
        totalPrice: state.totalPrice - (removedItem?.quantity || 0) * (removedItem?.price || 0)
      };
    }

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
};

// Create context types
interface CartContextProps {
  cartState: CartState;
  cartDispatch: React.Dispatch<CartAction>;
}

// Create context
const CartContext = createContext<CartContextProps | undefined>(undefined);

// Provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return <CartContext.Provider value={{ cartState: state, cartDispatch: dispatch }}>{children}</CartContext.Provider>;
};

// Custom hook to use the CartContext
export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
