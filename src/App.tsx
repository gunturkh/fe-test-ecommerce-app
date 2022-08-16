import "styles/global.css";
import { Routes, Route, Link } from "react-router-dom";
import "tailwindcss/tailwind.css";

import Home from "pages";
import CartPage from "pages/cart";
import { Container, Footer, Header } from "components";

function App(): JSX.Element {
  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
