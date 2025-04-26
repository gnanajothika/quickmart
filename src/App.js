import React, { useEffect, useState } from "react";
import { products as productData } from "./data";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import SearchBar from "./components/SearchBar";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [checkoutMsg, setCheckoutMsg] = useState("");

  // Load cart from localStorage on first render
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Sync cart across tabs
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "cart") {
        const newCart = JSON.parse(event.newValue);
        setCart(newCart || []);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart
      .map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
    setCheckoutMsg("");
  };

  const checkout = () => {
    if (cart.length === 0) return;
    setCart([]);
    setCheckoutMsg("✅ Order placed successfully!");
    localStorage.removeItem("cart");
  };

  const filteredProducts = productData.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Quickmart</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ProductList products={filteredProducts} addToCart={addToCart} />
      <Cart
        cart={cart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        checkout={checkout}
      />
      {checkoutMsg && <p className="success-msg">{checkoutMsg}</p>}
    </div>
  );
}

export default App;
