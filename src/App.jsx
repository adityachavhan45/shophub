// src/App.js
import { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductGrid from './components/ProductGrid';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Footer from './components/Footer';
import ImageSlider from './components/ImageSlider';
import Cart from './pages/Cart';

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

  const products = [
    {
      id: 1,
      name: "Oversized Cotton T-Shirt",
      price: 29.99,
      rating: 4,
      reviews: 312,
      category: "T-Shirt Types",
      image: "data:image/jpeg;base64,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"
    },
    {
      id: 2,
      name: "Acid Wash Tee",
      price: 34.99,
      rating: 4,
      reviews: 198,
      category: "T-Shirt Types",
      image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUTExIVFhUVFxgVFRcVFxcVFRgVGBUYFxcbGBYYHSggGBolGxUYITEhJSkrLi4vFx8zODMsNyouLisBCgoKDQ0NGxAQGisfICMwKy0yNzcvLy0tLzUrMy8tKy0vLS0rLS0rNS03NTY3NSs3KzUtNis4LjYtLSstNzcrLf/AABEIARMAtwMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAAAwECBAUHCAb/xABJEAACAQICBgUGCwUFCQAAAAAAAQIDEQQhBRITMUFRBgciYXFCcnOBkbIjJDJSYpKhosHh8BSxw+LxCDOz0dIXNENEY4KTtML/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAQIDBP/EACARAQEBAAEDBQEAAAAAAAAAAAABEQISEzEhIkFhcQP/2gAMAwEAAhEDEQA/AO4gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGp050iw+EjetUSe9QWc34R5d7y7wNsYktKUFPZutTU1vg5x1/q3uco091qVp60MPBU1uUn2p2/cn7bczi+lpyliKsqjcm6kpNvtXUnrLf3NAeyUxc8gYTSdWCtCvVgvozqQ91mQ9PYp/85X/APNW/wAwPWdfEQgtacoxXOTUV7WWYPHUqy1qVSFSN7XhKM1db1eLeZ46x+JdTOc3N85uUn7ZH0XQDT1fBKdSjNx1pK63xkoxvnHc94HqsHOujvWbCdo4qOo/nwu4euO9eq/qPv8AC4qFSKnTlGUXmpRaafg0BMAAAAAAAAAAAAAAAAY+OxtOjCVSrOMIRV3KTskWaU0hChSlVqS1YQV29+XhxfccE6b9K6mMnrSbjSUrU4cI52Tl9N3z5bgPqOlXWhOd6eDThDc6sl235sX8ld7z7kc6xOJnNuc5SlJu7lJtt+LebLJSv7CGfJfpgW13ldb1vt+v1a3EwdIYfaJTjnJK0lxlHg1za5crciaU99iFVdV9zA1sUGbWUYTu2s35UXZ+vKz8bEMsFT+m/GSt9kU/tA1lOjKpLVj63wiubPoKVNRjGEdyXHjxd/FmLCooq0UkuS3X775t+N2TUZAZ0J/r/M2+hOkeJwk9ajUt86DzhLzo/jv7zQwdyaAHeOiHT6jjLU52pVn5LfZn5kuL+i8/HefYo8vrJeGd927PfwOn9XfT+UlGhi3nkoVXx4JTfPlL28wOogomVAAAAAAAAAAGq6TaYhhMPUrT3QWS3OUnlGK722l6wOcdcnSHWccFB3WU6374QfveqPM5BjW1qpPsucMnnkmnk+HhuNhj8ZOtUnVqO8pycpPhd55clwS4JI1WkJ5w89AZu0K34kKL9bICklmRShcysRhZ01Fyg4qaum+O72OzTs87ST3NN3YPBzqtxglkrttqMVwV5SaSbeS5tgYezsXuDt/Qq4tNpppptNNWaadmmuDTRemBjKmZFOPIyMHgpVbtJWjvlKUYxTd7K7aV3Z5b8m+AxOEnTSckrNtKUZRnG6tdXi2r5p270Fy5q2BJAhw1OdRuMISk0nK0U27JZvLh+RdCWV/YETVZ9irbhTn7rMbCV21C7dmksvDmSSzhU5unO31WQaPjelB28lAeh+rjpB+1YZRm71aVoT5vLsy9aXtTPrjz10I088LXhUb7D7FTzG9/qefqfM9A0KilFNO6avkBIAAAAAAACjZxDrd6SbeusNCXYou87bnVa3f9qftcuR0zp50hWCws6l1rvsUk+NRp2y4pZt9yPOcpOTcm7ttttvNtu7d+Lf4gWy3Gtxz7UPO/Az6hrsZLtU/O/BgZdzZ6GS1qknFSdOnrxTzWttKcE2t0ra7dnldK91dPVRZttCrKv6Bf+xQJfDfCbyjc16EZTcLylGo3Gopu8trGEZualz+ETUt/alF3V9bGw+zjTtNSUFRpVexv2lV0bzafy7KpJauWSsmm23lU3LaU9acJdtxahHVaqbOnfXerHWlqypLWz3bzG/Z3UhqRtd4XD2u1FLVWH1m29yUVKT7kzL0XzvzjX6ZrQk4pNVJxVp1I3tPdqJKSTk4pW1mk3dK1opvaxweqp040o1HRpNTtRjVm6snqPtarklGpUsreTTvzNQ4LDVadRrawUtaDi3BScLO3ai2nGTi3FrdbhJM2ekGsM5TV9e+rSUmpNVEkqs27JSUJ60YuyvKz8mSNOXHPdeTF0fJyw8oy/wCHWio8GtpCptL886MN+6z5mdjaEdecYq1OcK8tRu9pUdtq2bzydO6e+0mnfO+t0N/cVPTUfcrm5xWU3dW7GNlnybxNn4NK67miXy3xt6JPqsLC0YqLhr7JKlSra/GVapsXBze9Qjtmlb5NtbNt3w9OqKkvk7Rp7ZQcXBTvlZxy1n5Sj2U9z3xjsHh5VITjCOtJ4bC5clq4Vtt7lFWzbySzZocdhZU3Z2aavGUXeE43teLsuKas0mmmmkyxj+l9JPxfhHdNc019hBop/Aw8CuDeZFoqXwUPAri2eElZ5/mdo6rtPbSl+zzfapLs33unw+ru8NU4jQl2j6HQWlJYatTrR8l5rdrR3SXs/AD0WDF0bjI1qcakHeMkpJ9zVzKAAAAUnKyKnxnWfp6WGwso03apVvCL3aqt25X5pbu9oDlnWZ0j/bMW4xbdKg3ThbdKV+3L2qy7o3W8+UckkX06Nt3qLK0QMWcjCrO84eP4MzZoxK0c4vvfusDJibHRmkFTU4TTdOpq6zhbXi43cWrtKW93g2k+aaTWtiVuFlsuxv59I4TtenJbG2wUZN3ityqybTUk0m5wWa7KSSi44+E0nGSar6zSblF01FSV25OCTtFQbbt8zgmro0lPeZEd5Ma7nLd1t8Hj4yxEKtbs0qV5qEeCgnKEIJ73Keqm3v1nJs1eOxkq03OWV8kk3aMV8mKb4JceObebZFVZDcrO1udF4+ns9lOWztN1FJRclJtJWmlndW7LXOStncysdpONpuM3Vq1b69WSdlGSaaippNykm05NZLJcz5q+Zk09xMa7nLp6W2wmkKbjq1nKMoRUVKmrupBKyhLgpJJJTeVlmslfBx+PlVaulGMVaEF8mEeSvvb3uTzbzMSSEGXEvO2ZU+C+UvEw8DUtTh4GZgl2l4o1uFfYj4BltKDvI2sHkaXCO7N1SeVtzA6f1UaetfCzeWc6V/bOK976x1A826OxEqc4Tg7Tg9aL71wfdzXed/6PaUjiaEKsfKWa4p7mn4O6A2YAAGh6T6DWJhqtJ+PM3wA4TpvoRUpNuCyzy/M+Lx+ElB2nFxffufgz1LWw8ZKzSPmtN9D6VZPsrPuA82Tv+v1kRVd8fH8GdJ6Q9XM6d3Sy7ndr1Pej4LSOjqlGVpwazdnw3PjuAxblUUmGwKJZkqkRLeSICtR5EEiWoyJgW8TJpzyMWRNRkBWoytJltQpTAy8K+0vH8TX4SOUV3Gbh/lL1FmEw8m9VJ3vwVwJ8PCzubXD03K39fyNroLohVrNXjZdx0vo/0DhTSckgPhNEaAqVWrRduZ13onor9npKFrcX3vi335GywejYU1aMUZiAAAAAAAAAjq0YyyaOS9dWAhToQlFWbqxX3Jv8Drxyjr5fxal6Zf4dQDiusUTLGIMCWJcmRl0QFREbJXuzMdgVuSU2QMkhIC+bLqbIy+AE9FtM7n0Q6GUtnGpqrtJS9qucLp7z050IlfB0fRw91AbPB6OhTVoxRmAAAAAAAAAAAAAORdfkvgaK/wCt/DmddOPdf391Q9L/AA5gcYuIyLGyoExdBlkSsWBfNkTLpFEBZJF0Nxc0WxAqi6LLYIrxAyKT7SPTPQJ/E6Po4e6jzLSeaPS/V8/iVH0cfdQH0wAAAAAAAAAAAAAcd6/38FQ9L/8AEjsRxr+0E/gqHpf4cgOL3CZSJVgTwZenmRQZemBdcsYTKASWLNYqpWRHJgX02XMhovMyGgL6XA9L9Xb+JUfMj+480Uz0p1bP4lR8xAfVgAAAAAAAAAAAABxn+0G/g6HpX/hyOzHGf7QEbwoekfuMDjEUVSLUVAlQZbcNgVbKRZWRSIF0mRykXy3EMpgXU3mZMWYUJGTSe4DJhvPSXVn/ALjR81Hm6irtHpHqzVsDR81AfWgAAAAAAAAAAAABxzr8ts6HpH7jv+87GfAdZvReWNhFJtODurK6zVs0B52jAtlE+/XVnXXlv6n5l3+zSt89/V/MDn9gkdCXVpW+e/q/mWT6ta2fbef0f5gOf1fB+xiLtwZ93Pq1r/P+5w+sVXVvX+d9x7vrAfBz9f2kE733HQZdW1f533P5iOXVlXfl/c/mA+CpxdzIVN2/qfaR6ssQvL+4/wDUTLq4xFra/wBx/wCoD5TAptrL2npDq6XxOl5pyTAdXteMl2vu/mdr6KYB0KEKb8mKX2AboAAAAAAAAAAAAAKSimVAFmxjyQ2MeReALNkuRTYx5IkAEewjyQ2EeSJABHsI8kU2EeSJQBFsI8kV2EeSJABHsY8kXpFQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//Z"
    },
    {
      id: 3,
      name: "Graphic Printed Tee",
      price: 24.99,
      rating: 5,
      reviews: 402,
      category: "T-Shirt Types",
      image: "data:image/jpeg;base64,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"
    },
    {
      id: 4,
      name: "Solid Color Basic Tee",
      price: 19.99,
      rating: 4,
      reviews: 271,
      category: "T-Shirt Types",
      image: "data:image/jpeg;base64,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"
    },
    {
      id: 5,
      name: "Classic Polo T-Shirt",
      price: 39.99,
      rating: 5,
      reviews: 193,
      category: "T-Shirt Types",
      image: "https://www.google.com/imgres?q=Classic%20Polo%20T-Shirt%20only%20image&imgurl=https%3A%2F%2Fi.cubmcpaws.com%2Ffit-in%2Fboys_classic_polo_bottle_green_img_5062.jpg&imgrefurl=https%3A%2F%2Fwww.cubmcpaws.com%2Fboys-polo-t-shirt-bottle-green-aw20-3637.html&docid=c6WO4pYEGNxynM&tbnid=8TYxFON8CHAqLM&vet=12ahUKEwjoq5WmpcuMAxVxkVYBHao2FukQM3oECBcQAA..i&w=1080&h=1440&hcb=2&ved=2ahUKEwjoq5WmpcuMAxVxkVYBHao2FukQM3oECBcQAA"
    },
    {
      id: 6,
      name: "Sleeveless Muscle Tee",
      price: 22.99,
      rating: 4,
      reviews: 167,
      category: "T-Shirt Types",
      image: "data:image/jpeg;base64,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"
    },
    {
      id: 7,
      name: "Long Sleeve Streetwear Tee",
      price: 32.99,
      rating: 4,
      reviews: 143,
      category: "T-Shirt Types",
      image: "https://representclo.com/cdn/shop/products/REPRESENT_OWNERS_CLUB_LONG_SLEEVE_TEE_BLACK_1_1200x.jpg"
    },
    {
      id: 8,
      name: "Henley Neck T-Shirt",
      price: 27.99,
      rating: 4,
      reviews: 129,
      category: "T-Shirt Types",
      image: "https://oldnavy.gap.com/webcontent/0051/938/687868082.jpg"
    },
    {
      id: 9,
      name: "Hooded Longline T-Shirt",
      price: 37.99,
      rating: 5,
      reviews: 221,
      category: "T-Shirt Types",
      image: "https://us.boohoo.com/on/demandware.static/-/Sites-boohoo-master-catalog/default/dw9f5f2f2e/images/zoom/mzz73489_black_xl.jpg"
    },
    {
      id: 10,
      name: "Women’s Crop Top Tee",
      price: 24.99,
      rating: 5,
      reviews: 303,
      category: "T-Shirt Types",
      image: "https://cdn.shopify.com/s/files/1/0016/0074/9623/products/womens-crop-top-tee_720x.jpg"
    },
    
    // Comic-Based Themes
    {
      id: 11,
      name: "Marvel Universe Avengers Tee",
      price: 29.99,
      rating: 5,
      reviews: 456,
      category: "Comic-Based Themes",
      image: "https://www.80stees.com/cdn/shop/products/avengers-characters-and-logo-marvel-comics-t-shirt_1200x.jpg"
    },
    {
      id: 12,
      name: "DC Comics Justice League Tee",
      price: 28.99,
      rating: 4,
      reviews: 389,
      category: "Comic-Based Themes",
      image: "https://www.80stees.com/cdn/shop/products/justice-league-dc-comics-t-shirt_1200x.jpg"
    },
    {
      id: 13,
      name: "Anime Hero Naruto Tee",
      price: 26.99,
      rating: 5,
      reviews: 488,
      category: "Comic-Based Themes",
      image: "https://m.media-amazon.com/images/I/71c0A1T1pFL._AC_UX679_.jpg"
    },
    {
      id: 14,
      name: "Classic Superman Vintage Tee",
      price: 24.99,
      rating: 4,
      reviews: 321,
      category: "Comic-Based Themes",
      image: "https://m.media-amazon.com/images/I/71c0A1T1pFL._AC_UX679_.jpg"
    },
    {
      id: 15,
      name: "Star Wars Darth Vader Tee",
      price: 31.99,
      rating: 5,
      reviews: 354,
      category: "Comic-Based Themes",
      image: "https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/7807107060819M"
    },
    {
      id: 16,
      name: "Zelda Video Game Graphic Tee",
      price: 27.99,
      rating: 4,
      reviews: 298,
      category: "Comic-Based Themes",
      image: "https://m.media-amazon.com/images/I/71c0A1T1pFL._AC_UX679_.jpg"
    },
    {
      id: 17,
      name: "Custom Fan Art Spider-Verse Tee",
      price: 33.99,
      rating: 5,
      reviews: 210,
      category: "Comic-Based Themes",
      image: "https://m.media-amazon.com/images/I/71c0A1T1pFL._AC_UX679_.jpg"
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
  };

  const handleLogout = () => {
    setUser(null);
    setCartItems([]);
    setCartCount(0);
  };

  const handleAddToCart = (updatedCart) => {
    if (Array.isArray(updatedCart)) {
      setCartItems(updatedCart);
      setCartCount(updatedCart.reduce((total, item) => total + item.quantity, 0));
    }
  };

  return (
    <Router>
      <div className="app">
        <Navbar
          cartCount={cartCount}
          onSearch={handleSearch}
          user={user}
          onLogout={handleLogout}
        />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={<HomePage products={filteredProducts} searchTerm={searchTerm} onAddToCart={handleAddToCart} user={user} />}
            />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/category/:categoryName"
              element={<CategoryPage products={filteredProducts} onAddToCart={handleAddToCart} user={user} />}
            />
            <Route path="/cart" element={<Cart user={user} onUpdateCart={handleAddToCart} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
