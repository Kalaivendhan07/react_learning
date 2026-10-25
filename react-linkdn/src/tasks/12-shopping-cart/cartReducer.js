export const initialCart = { items: [], coupon: null };

export function cartReducer(cart, action) {
  switch (action.type) {
    case 'added': {
      const found = cart.items.find(i => i.id === action.product.id);
      if (found) {
        return {
          ...cart,
          items: cart.items.map(i => (i.id === action.product.id ? { ...i, qty: i.qty + 1 } : i)),
        };
      }
      return { ...cart, items: [...cart.items, { ...action.product, qty: 1 }] };
    }
    case 'quantityChanged': {
      if (action.qty <= 0) return { ...cart, items: cart.items.filter(i => i.id !== action.id) };
      return { ...cart, items: cart.items.map(i => (i.id === action.id ? { ...i, qty: action.qty } : i)) };
    }
    case 'removed':
      return { ...cart, items: cart.items.filter(i => i.id !== action.id) };
    case 'couponApplied':
      return { ...cart, coupon: action.code };
    case 'cleared':
      return initialCart;
    default:
      throw new Error('Unknown action: ' + action.type);
  }
}
