import "styles/global.css";
import { Routes, Route, Link } from "react-router-dom";
import "tailwindcss/tailwind.css";

import Home from "pages";
import CartPage from "pages/cart";
import { Container, Footer, Header } from "components";
import ProductDetailPage from "pages/productDetail";

function App(): JSX.Element {
  return (
    <Container>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
