
import { useEffect, useMemo, useState } from "react";

export default function UseMemoPractice() {
  const [price, setPrice] = useState(1500);
  const [quantity, setQuantity] = useState(2);
  const [theme, setTheme] = useState("light");

  useEffect(()=>{
    console.log('render checking...');
    
  })

  const total = useMemo(() => {
    console.log("Calculating total...");

    return price * quantity;
  }, [price, quantity]);

// const total = price * quantity;

  return (
    <div>
      <h2>Total: ₹{total}</h2>

      <button onClick={() => setQuantity(q => q + 1)}>
        Increase Quantity
      </button>

      <button onClick={() => setTheme(t =>
        t === "light" ? "dark" : "light"
      )}>
        Change Theme
      </button>

      <p>Theme: {theme}</p>
    </div>
  );
}
