
import React, { createContext, useContext, useReducer } from 'react';
import { ActionType, addToCart, cartReducer, decreaseFromCart, initialState, removeFromCart } from './cartReducer'; 

export type CartContextType = {
  state: typeof initialState;
  dispatch: React.Dispatch<ActionType>; 
  addToCart: (productId: string, page: number) => void;
  decreaseFromCart: (productId: string, page: number) => void;
  removeFromCart: (productId: string, quantity: number, page: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState); 

  
  const addToCartHandler = (productId: string, page: number) => {
    addToCart(productId, page, dispatch);
  };

  const decreaseFromCartHandler = (productId: string, page: number) => {
    decreaseFromCart(productId, page, dispatch);
  };

  const removeFromCartHandler = (productId: string, quantity: number, page: number) => {
    removeFromCart(productId, quantity, page, dispatch);
  };

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch, 
        addToCart: addToCartHandler,
        decreaseFromCart: decreaseFromCartHandler,
        removeFromCart: removeFromCartHandler,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};