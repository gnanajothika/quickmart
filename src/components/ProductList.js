import React from "react";

const ProductList = ({ products, addToCart }) => {
  return (
    <div className="product-section">
      <h2>🛍 Products</h2>
      {products.map((product) => (
        <div key={product.id} className="product-card">
          {/* <img
            src={`https://via.placeholder.com/250x250?text=${product.name}`}
            alt={product.name}
          /> */}
          <h3>{product.name}</h3>
          <p>${product.price}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
