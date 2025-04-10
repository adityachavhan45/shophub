import React from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css';

const ProductGrid = ({ products, onAddToCart, user }) => {
  const productsByCategory = products.reduce((acc, product) => {
    const category = product.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  return (
    <div className="products-wrapper">
      {Object.entries(productsByCategory).map(([category, categoryProducts]) => (
        <section key={category} className="category-section">
          <h2 className="category-title">{category}</h2>
          <div className="product-grid">
            {categoryProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                user={user}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default ProductGrid;
