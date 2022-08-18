import React, { useEffect, useState } from "react";
import axios from "axios";

import { Container, Header, Main, Footer, Cards, Button } from "components";
import { useStore } from "store";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetailPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const params = useParams();
  const navigate = useNavigate();
  const { productId } = params;
  const ecommerceProduct = useStore((state) => state.ecommerceProduct);
  const ecommerceProducts = useStore((state) => state.ecommerceProducts);
  const getProduct = useStore((state) => state.getProduct);
  const getProductsByCategory = useStore(
    (state) => state.getProductsByCategory
  );

  useEffect(() => {
    getProduct(parseInt(productId));
  }, [productId]);

  useEffect(() => {
    if (ecommerceProduct.category)
      getProductsByCategory(ecommerceProduct.category);
  }, [ecommerceProduct, productId]);

  console.log("product detail", ecommerceProduct);
  console.log("products by category", ecommerceProducts);
  return (
    <>
      <div className="flex flex-row rounded-md border border-gray-300 p-5 hover:shadow-lg cursor-pointer">
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
          <Button
            onClick={async () => {
              
              const response = await fetch(`https://dummyjson.com/carts/19`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  products: [
                    {
                      id: ecommerceProduct?.id,
                      quantity: 1,
                    },
                  ],
                }),
              });
              if(response) window.alert(`Success add ${ecommerceProduct.title} to cart`);
              console.log("response add product ", response);
            }}
          >
            Add to cart
          </Button>
          <div className="mt-4 grid grid-cols-2">
            <p className="m-0 text-gray-500">
              ⭐ {ecommerceProduct.rating} / 5
            </p>
            <p className="m-0 text-right">Stock: {ecommerceProduct.stock}</p>
          </div>
        </div>
      </div>
      <div className="mt-4 p-2">
        <h1 className="text-red-500 font-semibold">
          Product in the same category
        </h1>
        <div className="flex-1 container my-8 max-w-screen-lg mx-auto p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ecommerceProducts?.products?.map((product, idx) => (
              <div
                key={`product-${idx}`}
                className="flex flex-col col-span-1 rounded-md border border-gray-300 p-5 hover:shadow-lg cursor-pointer"
                onClick={() =>
                  navigate(`/product/${product.id}`, { replace: true })
                }
              >
                <div className="flex justify-center">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="max-h-40"
                  />
                </div>
                <h2 className="text-xl font-semibold my-2">
                  {product?.title || ""}
                </h2>
                <h3 className="text-sm text-yellow-500 font-semibold my-2">
                  {product?.category || ""}
                </h3>
                <div className="flex flex-row justify-between">
                  <h3
                    className={`text-lg font-semibold mb-2 ${
                      product?.discountPercentage ? "line-through" : ""
                    }`}
                  >
                    US${product?.price || ""}
                  </h3>
                  {product?.discountPercentage && (
                    <h3 className="text-lg font-semibold mb-2 text-red-500">
                      US$
                      {(
                        product?.price -
                        product?.price * (product?.discountPercentage / 100)
                      ).toFixed(2)}
                    </h3>
                  )}
                </div>
                <p className="m-0 flex-1">{product.description}</p>
                <div className="mt-4 grid grid-cols-2">
                  <p className="m-0 text-gray-500">⭐ {product.rating} / 5</p>
                  <p className="m-0 text-right">Stock: {product.stock}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
