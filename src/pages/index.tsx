import React, { useEffect } from "react";
import axios from "axios";

import { Container, Header, Main, Footer, Cards, Button } from "components";
import { useStore } from "store";

const Home: React.FC = () => {
  const ecommerceProducts = useStore((state) => state.ecommerceProducts);
  const getProducts = useStore((state) => state.getProducts);

  useEffect(() => {
    getProducts();
  }, []);

  console.log("ecommerceProducts", ecommerceProducts);
  return (
    <>
      {/* <Main /> */}
      <Cards />
    </>
  );
};

export default Home;
