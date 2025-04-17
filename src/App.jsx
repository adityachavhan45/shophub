// src/App.js
import { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductGrid from './components/ProductGrid';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AdminLogin from './components/admin/AdminLogin';
import Dashboard from './components/admin/Dashboard';
import Footer from './components/Footer';
import ImageSlider from './components/ImageSlider';
import Cart from './pages/Cart';
import UserProfile from './pages/UserProfile';
import Orders from './pages/Orders';
import Wishlist from './pages/Wishlist';
import Settings from './pages/Settings';
import ScrollToTop from './components/ScrollToTop';

// Import all images
import oversizedTee from './Images/Oversized Cotton T-Shirt.webp';
import acidWashTee from './Images/Acid Wash Tee.webp';
import graphicTee from './Images/Graphic Printed Tee.webp';
import poloTee from './Images/Classic Polo T-Shirt.webp';
import longSleeveTee from './Images/Long Sleeve Streetwear Tee.webp';
import henleyTee from './Images/Henley Neck T-Shirt.webp';
import marvelTee from './Images/Marvel Universe Avengers Tee.webp';
import dcTee from './Images/DC Comics Justice League Tee.webp';
import starWarsTee from './Images/Star Wars Darth Vader Tee.webp';
import narutoTee from './Images/Anime Hero Naruto Tee.webp';
import supermanTee from './Images/Classic Superman Vintage Tee.webp';
import spiderVerseTee from './Images/Custom Fan Art Spider-Verse Tee.webp';
import zeldaTee from './Images/Zelda Video Game Graphic Tee.webp';
import solidTee from './Images/Solid Color Basic Tee.webp';
import sleevelessTee from './Images/Sleeveless Muscle Tee.webp';
const cropTopTee = new URL('./Images/Women\'s Crop Top Tee.webp', import.meta.url).href;
import hoodedTee from './Images/Hooded Longline T-Shirt.webp';

import './App.css';

// Home page component
const HomePage = ({ products, searchTerm, onAddToCart, user }) => (
  <>
    <ImageSlider />
    <div className="product-grid-container">
      {searchTerm && (
        <div className="search-results-header">
          <h2>Search Results for "{searchTerm}"</h2>
          <p>{products.length} products found</p>
        </div>
      )}
      <ProductGrid products={products} onAddToCart={onAddToCart} user={user} />
    </div>
  </>
);

// Category page
const CategoryPage = ({ products, onAddToCart, user }) => {
  const { categoryName } = useParams();
  const categoryProducts = products.filter(
    product => product.category.toLowerCase() === categoryName.toLowerCase()
  );

  return (
    <div className="product-grid-container">
      <h1 className="category-header">{categoryName}</h1>
      <ProductGrid products={categoryProducts} onAddToCart={onAddToCart} user={user} />
    </div>
  );
};

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const products = [
    {
      id: 1,
      name: "Oversized Cotton T-Shirt",
      price: 29.99,
      rating: 4,
      reviews: 312,
      category: "T-Shirt Types",
      image: oversizedTee
    },
    {
      id: 2,
      name: "Acid Wash Tee",
      price: 34.99,
      rating: 4,
      reviews: 198,
      category: "T-Shirt Types",
      image: acidWashTee
    },
    {
      id: 3,
      name: "Graphic Printed Tee",
      price: 24.99,
      rating: 3.5,
      reviews: 156,
      category: "T-Shirt Types",
      image: graphicTee
    },
    {
      id: 4,
      name: "Classic Polo T-Shirt",
      price: 39.99,
      rating: 4.5,
      reviews: 245,
      category: "T-Shirt Types",
      image: poloTee
    },
    {
      id: 5,
      name: "Long Sleeve Streetwear Tee",
      price: 44.99,
      rating: 4,
      reviews: 167,
      category: "T-Shirt Types",
      image: longSleeveTee
    },
    {
      id: 6,
      name: "Henley Neck T-Shirt",
      price: 32.99,
      rating: 4.5,
      reviews: 189,
      category: "T-Shirt Types",
      image: henleyTee
    },
    {
      id: 7,
      name: "Marvel Universe Avengers Tee",
      price: 27.99,
      rating: 4,
      reviews: 278,
      category: "Fandom T-Shirts",
      image: marvelTee
    },
    {
      id: 8,
      name: "DC Comics Justice League Tee",
      price: 26.99,
      rating: 4,
      reviews: 234,
      category: "Fandom T-Shirts",
      image: dcTee
    },
    {
      id: 9,
      name: "Star Wars Darth Vader Tee",
      price: 29.99,
      rating: 4.5,
      reviews: 312,
      category: "Fandom T-Shirts",
      image: starWarsTee
    },
    {
      id: 10,
      name: "Anime Hero Naruto Tee",
      price: 25.99,
      rating: 4,
      reviews: 198,
      category: "Fandom T-Shirts",
      image: narutoTee
    },
    {
      id: 11,
      name: "Classic Superman Vintage Tee",
      price: 28.99,
      rating: 4,
      reviews: 267,
      category: "Fandom T-Shirts",
      image: supermanTee
    },
    {
      id: 12,
      name: "Custom Fan Art Spider-Verse Tee",
      price: 31.99,
      rating: 4.5,
      reviews: 189,
      category: "Fandom T-Shirts",
      image: spiderVerseTee
    },
    {
      id: 13,
      name: "Zelda Video Game Graphic Tee",
      price: 27.99,
      rating: 4,
      reviews: 156,
      category: "Fandom T-Shirts",
      image: zeldaTee
    },
    {
      id: 14,
      name: "Solid Color Basic Tee",
      price: 19.99,
      rating: 4,
      reviews: 423,
      category: "Basic T-Shirts",
      image: solidTee
    },
    {
      id: 15,
      name: "Sleeveless Muscle Tee",
      price: 22.99,
      rating: 4,
      reviews: 178,
      category: "Basic T-Shirts",
      image: sleevelessTee
    },
    {
      id: 16,
      name: "Women's Crop Top Tee",
      price: 24.99,
      rating: 4.5,
      reviews: 289,
      category: "Basic T-Shirts",
      image: cropTopTee
    },
    {
      id: 17,
      name: "Hooded Longline T-Shirt",
      price: 36.99,
      rating: 4,
      reviews: 167,
      category: "Basic T-Shirts",
      image: hoodedTee
    }
  ];

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    const lower = searchTerm.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(lower) ||
      product.category.toLowerCase().includes(lower)
    );
  }, [products, searchTerm]);

  const handleSearch = (term) => setSearchTerm(term);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAdmin(userData.isAdmin || false);
  };

  const handleRegister = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setCartItems([]);
    setCartCount(0);
    setIsAdmin(false);
  };

  const updateCartCount = (items) => {
    setCartCount(items.reduce((total, item) => total + item.quantity, 0));
  };

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    const updatedItems = existingItem
      ? cartItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...cartItems, { ...product, quantity: 1 }];
    
    setCartItems(updatedItems);
    updateCartCount(updatedItems);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    const updatedItems = cartItems
      .map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
      .filter(item => item.quantity > 0);
    
    setCartItems(updatedItems);
    updateCartCount(updatedItems);
  };

  const handleRemoveFromCart = (productId) => {
    const updatedItems = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedItems);
    updateCartCount(updatedItems);
  };

  // Protected Route component for admin routes
  const AdminRoute = ({ children }) => {
    if (!user || !isAdmin) {
      return <Navigate to="/admin/login" />;
    }
    return children;
  };

  return (
    <Router>
      <div className="app">
        <ScrollToTop />
        <Navbar
          cartCount={cartCount}
          onSearch={handleSearch}
          user={user}
          onLogout={handleLogout}
          isAdmin={isAdmin}
        />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  products={filteredProducts}
                  searchTerm={searchTerm}
                  onAddToCart={handleAddToCart}
                  user={user}
                />
              }
            />
            <Route
              path="/category/:categoryName"
              element={
                <CategoryPage
                  products={products}
                  onAddToCart={handleAddToCart}
                  user={user}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cartItems={cartItems}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveFromCart={handleRemoveFromCart}
                  user={user}
                />
              }
            />
            <Route
              path="/profile"
              element={<UserProfile user={user} onLogout={handleLogout} />}
            />
            <Route
              path="/orders"
              element={<Orders user={user} />}
            />
            <Route
              path="/wishlist"
              element={<Wishlist user={user} onAddToCart={handleAddToCart} />}
            />
            <Route
              path="/settings"
              element={<Settings user={user} />}
            />
            <Route
              path="/login"
              element={<Login onLogin={handleLogin} />}
            />
            <Route
              path="/register"
              element={<Register onRegister={handleRegister} />}
            />
            <Route
              path="/admin/login"
              element={<AdminLogin onLogin={handleLogin} />}
            />
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <Dashboard />
                </AdminRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
