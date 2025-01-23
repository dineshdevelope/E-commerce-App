import "./App.css";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import CartPage from "./pages/CartPage";
import AddProduct from "./pages/AddProduct";
import ProductEdit from "./pages/ProductEdit";
import AdminHomePage from "./pages/AdminHomePage";

function App() {
  const [cardItems, setcardItems] = useState([]);
  return (
    <>
      <Router>
        <ToastContainer theme="dark" position="top-center" autoClose={1200} />
        <Header cardItems={cardItems} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<HomePage />} />
          <Route
            path="/products/:id"
            element={
              <ProductDetail
                cardItems={cardItems}
                setcardItems={setcardItems}
              />
            }
          />
          <Route
            path="cart"
            element={
              <CartPage cardItems={cardItems} setcardItems={setcardItems} />
            }
          />
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="editproduct/:id" element={<ProductEdit />} />
          <Route path="admin" element={<AdminHomePage />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
