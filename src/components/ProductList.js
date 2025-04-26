import React from "react";

const ProductList = ({ products, addToCart }) => {
  return (
    <div className="product-section">
      <h2>🛍 Products</h2>
      {products.map((product) => {
        let imagePath = extractImagePath(product.img);

        return (
          <div key={product.id} className="product-card">
            {imagePath && <img src={imagePath} alt={product.name} />}
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        );
      })}
    </div>
  );
};

const extractImagePath = (imageName) => {
  try {
    return require(`./../assets/product-images/${imageName}`);
  } catch {
    return null;
  }
};

export default ProductList;
