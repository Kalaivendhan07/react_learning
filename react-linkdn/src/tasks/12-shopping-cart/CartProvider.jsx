import { useReducer } from 'react';
import { cartReducer, initialCart } from './cartReducer';
import { CartDispatchContext, CartStateContext } from './cartContext';

export default function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  return (
    <CartStateContext.Provider value={cart}>
      <CartDispatchContext.Provider value={dispatch}>{children}</CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
}
