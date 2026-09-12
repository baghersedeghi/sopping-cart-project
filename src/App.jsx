// import React from 'react'

import { BrowserRouter, Route, Routes } from "react-router"
import Home from "./pages/Home"
import { ToastContainer } from 'react-toastify';
import ProductList from "./conponents/ProductList";
import Header from "./conponents/Header";
import Cart from "./pages/Cart";
function App() {
   return (
      <>
         <BrowserRouter>
            <Header></Header>
            <Routes>
               <Route path="/" element={<Home />}></Route>
               <Route path="/products" element={<ProductList />}></Route>
               <Route path="/cart" element={<Cart />}></Route>
            </Routes>
            <ToastContainer position='top-center' />         </BrowserRouter>
      </>
   )
}

export default App  