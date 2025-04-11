import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cartService from '../services/cartService';
import CustomAlert from './CustomAlert';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart, user }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [showCartAlert, setShowCartAlert] = useState(false);
  const [cartAlertMessage, setCartAlertMessage] = useState('');

  const handleImageLoad = () => setImageLoaded(true);

  const formatPrice = (price) => {
    const priceInRupees = price * 83;
    return `₹${priceInRupees.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  const renderRatingStars = (rating) => (
    <div className="rating-stars">
      {[...Array(5)].map((_, index) => (
        <span key={index} className="star">
          {index < rating ? '★' : '☆'}
        </span>
      ))}
    </div>
  );

  const toggleWishlist = () => setIsWishlisted(!isWishlisted);

  const handleAddToCart = async () => {
    if (!user) {
      setShowLoginAlert(true);
      return;
    }

    setAddingToCart(true);
    try {
      const currentCart = await cartService.getCart(user.id);
      const existingItem = currentCart.items.find(item => item.productId === product.id);

      let updatedItems;
      if (existingItem) {
        updatedItems = currentCart.items.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedItems = [
          ...currentCart.items,
          {
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
          },
        ];
      }

      const result = await cartService.updateCart(user.id, updatedItems);
      onAddToCart && onAddToCart(result);
      setCartAlertMessage('Item added to cart successfully!');
      setShowCartAlert(true);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setCartAlertMessage('Failed to add item to cart. Please try again.');
      setShowCartAlert(true);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleLoginClick = () => {
    setShowLoginAlert(false);
    navigate('/login');
  };

  const handleViewCart = () => {
    setShowCartAlert(false);
    navigate('/cart');
  };

  return (
    <>
      <div className="product-card">
        {product.badge && <div className="product-badge">{product.badge}</div>}

        <div className="quick-actions">
          <button
            className="quick-action-btn"
            onClick={toggleWishlist}
            title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            {isWishlisted ? '❤️' : '🤍'}
          </button>
        </div>

        <div className="product-image-container">
          <img
            src={product.image}
            alt={product.name}
            className={`product-image ${imageLoaded ? 'loaded' : ''}`}
            onLoad={handleImageLoad}
          />
        </div>

        <div className="product-info">
          <h3 className="product-title">{product.name}</h3>
          <p className="product-price">{formatPrice(product.price)}</p>
          <p className="product-description">{product.description}</p>
        </div>

        <div className="product-footer">
          <div className="product-rating">
            {renderRatingStars(product.rating)}
            <span className="rating-count">({product.reviews})</span>
          </div>
        </div>

        <button
          className={`add-to-cart ${addingToCart ? 'loading' : ''}`}
          onClick={handleAddToCart}
          disabled={addingToCart}
        >
          {addingToCart ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>

      {showLoginAlert && (
        <CustomAlert
          message="Please login to add items to your cart"
          onClose={() => setShowLoginAlert(false)}
          actionText="Login Now"
          onAction={handleLoginClick}
        />
      )}

      {showCartAlert && (
        <CustomAlert
          message={cartAlertMessage}
          onClose={() => setShowCartAlert(false)}
          actionText={cartAlertMessage.includes('successfully') ? 'View Cart' : null}
          onAction={cartAlertMessage.includes('successfully') ? handleViewCart : null}
          showOkButton={cartAlertMessage.includes('successfully')}
        />
      )}
    </>
  );
};

export default ProductCard;
