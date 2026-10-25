import { memo } from 'react';
import { useCartDispatch } from './cartContext';

const PRODUCTS = [
  { id: 1, name: 'Wireless mouse', price: 799 },
  { id: 2, name: 'Keyboard', price: 1499 },
  { id: 3, name: 'USB-C hub', price: 1199 },
  { id: 4, name: 'Monitor stand', price: 2499 },
];

const ProductList = memo(function ProductList() {
  const dispatch = useCartDispatch();
  console.log('ProductList rendered');

  return (
    <div className="products">
      {PRODUCTS.map(p => (
        <div key={p.id} className="product">
          <b>{p.name}</b>
          <span>₹{p.price.toLocaleString('en-IN')}</span>
          <button onClick={() => dispatch({ type: 'added', product: p })}>Add to cart</button>
        </div>
      ))}
    </div>
  );
});

export default ProductList;
