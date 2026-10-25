import { useState } from 'react';
import { useCart, useCartDispatch, useCartTotals } from './cartContext';

export default function Cart() {
  const cart = useCart();
  const dispatch = useCartDispatch();
  const { count, subtotal, discount, shipping, total } = useCartTotals();
  const [code, setCode] = useState('');

  if (cart.items.length === 0) {
    return (
      <div className="cart">
        <h3>Cart</h3>
        <p className="cart-empty">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <h3>Cart ({count} items)</h3>
      {cart.items.map(item => (
        <div key={item.id} className="cart-line">
          <span>{item.name}</span>
          <div className="cart-qty">
            <button onClick={() => dispatch({ type: 'quantityChanged', id: item.id, qty: item.qty - 1 })}>-</button>
            <span>{item.qty}</span>
            <button onClick={() => dispatch({ type: 'quantityChanged', id: item.id, qty: item.qty + 1 })}>+</button>
          </div>
          <span>₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
          <button className="cart-remove" onClick={() => dispatch({ type: 'removed', id: item.id })}>×</button>
        </div>
      ))}

      <form
        className="cart-coupon"
        onSubmit={e => {
          e.preventDefault();
          dispatch({ type: 'couponApplied', code: code.trim().toUpperCase() });
        }}
      >
        <input value={code} onChange={e => setCode(e.target.value)} placeholder="Coupon (try SAVE10)" />
        <button type="submit">Apply</button>
      </form>

      <div className="cart-totals">
        <p>Subtotal <span>₹{subtotal.toFixed(2)}</span></p>
        {discount > 0 && <p>Discount <span>-₹{discount.toFixed(2)}</span></p>}
        <p>Shipping <span>{shipping === 0 ? 'Free' : '₹' + shipping.toFixed(2)}</span></p>
        <p className="cart-total">Total <span>₹{total.toFixed(2)}</span></p>
      </div>
      <button onClick={() => dispatch({ type: 'cleared' })}>Clear cart</button>
    </div>
  );
}
