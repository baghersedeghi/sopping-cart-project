import { BrowserRouter, Route, Routes } from 'react-router';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './pages/Cart';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
}

export default App;
