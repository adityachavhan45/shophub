import React, { useState, useEffect } from 'react';
import './Wishlist.css';

const Wishlist = ({ user, onAddToCart }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, you would fetch the wishlist from the backend
    // For now, we'll use mock data
    const mockWishlist = [
      {
        id: 1,
        name: "Oversized Cotton T-Shirt",
        price: 29.99,
        image: "path/to/image1.jpg"
      },
      {
        id: 2,
        name: "Acid Wash Tee",
        price: 34.99,
        image: "path/to/image2.jpg"
      }
    ];

    setWishlist(mockWishlist);
    setLoading(false);
  }, []);

  const removeFromWishlist = (productId) => {
    setWishlist(wishlist.filter(item => item.id !== productId));
  };

  if (loading) {
    return <div className="wishlist-loading">Loading wishlist...</div>;
  }

  return (
    <div className="wishlist-page">
      <h2>My Wishlist</h2>
      {wishlist.length > 0 ? (
        <div className="wishlist-grid">
          {wishlist.map(product => (
            <div key={product.id} className="wishlist-item">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-details">
                <h3>{product.name}</h3>
                <p className="price">${product.price.toFixed(2)}</p>
                <div className="button-group">
                  <button
                    className="add-to-cart-btn"
                    onClick={() => {
                      onAddToCart(product);
                      removeFromWishlist(product.id);
                    }}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromWishlist(product.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-wishlist">
          <p>Your wishlist is empty</p>
          <a href="/" className="continue-shopping-btn">Continue Shopping</a>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
