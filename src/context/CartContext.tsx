import React, { createContext, useContext, useReducer, type ReactNode } from 'react';
import {type  Product, type CartItem } from '../types';

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number; size: string; color: string } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' };

interface CartContextType {
  items: CartItem[];
  total: number;
  itemsCount: number;
  addToCart: (product: Product, quantity: number, size?: string, color?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity, size = 'M', color = 'Black' } = action.payload;
      const existingCartItem = state.items.find(item => 
        item.product.id === product.id && item.size === size && item.color === color
      );

      if (existingCartItem) {
        const updatedItems = state.items.map(item =>
          item.id === existingCartItem.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        return { items: updatedItems };
      }

      const newCartItem: CartItem = {
        id: `${product.id}-${size}-${color}`,
        product,
        quantity,
        size,
        color
      };

      return { items: [...state.items, newCartItem] };
    }

    case 'REMOVE_FROM_CART': {
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      return { items: filteredItems };
    }

    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      
      if (quantity <= 0) {
        const filteredItems = state.items.filter(item => item.id !== productId);
        return { items: filteredItems };
      }

      const updatedItems = state.items.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
      
      return { items: updatedItems };
    }

    case 'CLEAR_CART':
      return { items: [] };

    default:
      return state;
  }
};

const initialState: CartState = {
  items: []
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (
    product: Product, 
    quantity: number = 1, 
    size: string = 'M', 
    color: string = 'Black'
  ): void => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { product, quantity, size, color }
    });
  };

  const removeFromCart = (productId: string): void => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId: string, quantity: number): void => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = (): void => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const calculateTotal = (): number => {
    return state.items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  const calculateItemsCount = (): number => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  const contextValue: CartContextType = {
    items: state.items,
    total: calculateTotal(),
    itemsCount: calculateItemsCount(),
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};