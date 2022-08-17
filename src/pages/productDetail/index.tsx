import React, { useEffect, useState } from "react";
import axios from "axios";

import { Container, Header, Main, Footer, Cards, Button } from "components";
import { useStore } from "store";
import { useParams } from "react-router-dom";

const ProductDetailPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const params = useParams();
  const { productId } = params;
  const ecommerceProduct = useStore((state) => state.ecommerceProduct);
  const getProduct = useStore((state) => state.getProduct);

  useEffect(() => {
    getProduct(parseInt(productId));
  }, []);

  console.log("product detail", ecommerceProduct);
  return (
    <>
      <div
        // key={`product-${idx}`}
        className="flex flex-row rounded-md border border-gray-300 p-5 hover:shadow-lg cursor-pointer"
        // onClick={() => navigate(`product/${product.id}`)}
      >
        <div className="flex flex-col justify-center">
          <img
            src={
              selectedImage !== "" ? selectedImage : ecommerceProduct.thumbnail
            }
            alt={ecommerceProduct.title}
            className="max-h-[400px] object-cover"
          />
          <div className="flex flex-row">
            {ecommerceProduct.images.map((image, idx) => (
              <img
                src={image}
                alt={ecommerceProduct.title}
                key={idx}
                className="max-h-10"
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col flex-1 px-4">
          <h2 className="text-xl font-semibold my-2">
            {ecommerceProduct?.title || ""}
          </h2>
          <h3 className="text-sm text-yellow-500 font-semibold my-2">
            {ecommerceProduct?.category || ""}
          </h3>
          <div className="flex flex-row justify-between">
            <h3
              className={`text-lg font-semibold mb-2 ${
                ecommerceProduct?.discountPercentage ? "line-through" : ""
              }`}
            >
              US${ecommerceProduct?.price || ""}
            </h3>
            {ecommerceProduct?.discountPercentage && (
              <h3 className="text-lg font-semibold mb-2 text-red-500">
                US$
                {(
                  ecommerceProduct?.price -
                  ecommerceProduct?.price *
                    (ecommerceProduct?.discountPercentage / 100)
                ).toFixed(2)}
              </h3>
            )}
          </div>
          <p className="m-0 flex-1">{ecommerceProduct.description}</p>
          <div className="mt-4 grid grid-cols-2">
            <p className="m-0 text-gray-500">
              ⭐ {ecommerceProduct.rating} / 5
            </p>
            <p className="m-0 text-right">Stock: {ecommerceProduct.stock}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
