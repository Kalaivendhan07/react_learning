import CartProvider from './CartProvider';
import ProductList from './ProductList';
import Cart from './Cart';
import './style.css';

export default function ShoppingCart() {
  return (
    <CartProvider>
      <p className="cart-note">Free shipping over ₹2,000. Open the console: the product list does not re-render when the cart changes.</p>
      <div className="shop">
        <ProductList />
        <Cart />
      </div>
    </CartProvider>
  );
}
