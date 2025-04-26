import React from "react";

const Cart = ({ cart, removeFromCart, clearCart, checkout }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-section">
      <h2>🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price * item.quantity}</td>
                  <td>
                    <button onClick={() => removeFromCart(item.id)}>-</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="total">
            <strong>Total: ${total.toFixed(2)}</strong>
          </p>
          <button onClick={checkout} className="checkout-btn">
            Checkout
          </button>
          <button
            onClick={clearCart}
            className="checkout-btn"
            style={{ backgroundColor: "#e74c3c" }}
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
