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
// import NotFound from './pages/NotFound/NotFound';
import './styles/globals.scss';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
<<<<<<< HEAD
        <Router basename="/Rags-Rebellion/">
=======
        <Router basename="/viperswag-store">
>>>>>>> e7a9b7aa9fdf5b17e38da5c5d36c23ab38b9e1b5
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="shop" element={<Shop />} />
              <Route path="product/:id" element={<Product />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="order-success" element={<OrderSuccess />} />
              <Route path="profile" element={<Profile />} />
              <Route path="wishlist" element={<Wishlist />} />
              {/* <Route path="*" element={<NotFound />} /> */}
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;