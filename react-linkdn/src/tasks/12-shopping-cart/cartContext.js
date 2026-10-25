import { createContext, useContext } from 'react';

export const CartStateContext = createContext(null);
export const CartDispatchContext = createContext(null);

export function useCart() {
  const cart = useContext(CartStateContext);
  if (!cart) throw new Error('useCart must be used inside CartProvider');
  return cart;
}

export function useCartDispatch() {
  const dispatch = useContext(CartDispatchContext);
  if (!dispatch) throw new Error('useCartDispatch must be used inside CartProvider');
  return dispatch;
}

export function useCartTotals() {
  const cart = useCart();
  const count = cart.items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = cart.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const discount = cart.coupon === 'SAVE10' ? subtotal * 0.1 : 0;
  const shipping = subtotal === 0 || subtotal - discount > 2000 ? 0 : 99;
  const total = subtotal - discount + shipping;
  return { count, subtotal, discount, shipping, total };
}
