import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/common/Layout/Layout';
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import Product from './pages/Product/Product';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import OrderSuccess from './pages/OrderSuccess/OrderSuccess';
import Profile from './pages/Profile/Profile';
import Wishlist from './pages/Wishlist/Wishlist';
// import Collections from './pages/Collections/Collections';
// import NotFound from './pages/NotFound/NotFound';
import './styles/globals.scss';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* Public Routes */}
              <Route index element={<Home />} />
              <Route path="shop" element={<Shop />} />
              {/* <Route path="collections" element={<Collections />} /> */}
              <Route path="product/:id" element={<Product />} />
              <Route path="cart" element={<Cart />} />
              
              {/* Protected Routes */}
              <Route path="checkout" element={<Checkout />} />
              <Route path="order-success" element={<OrderSuccess />} />
              <Route path="profile" element={<Profile />} />
              <Route path="wishlist" element={<Wishlist />} />
              
              {/* 404 Page */}
              {/* <Route path="*" element={<NotFound />} /> */}
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;