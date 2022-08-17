import React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "store";

export const Cards: React.FC = () => {
  const ecommerceProducts = useStore((state) => state.ecommerceProducts);
  const navigate = useNavigate();
  console.log("ecommerceProducts", ecommerceProducts);
  return (
    <div className="flex-1 container my-8 max-w-screen-lg mx-auto p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ecommerceProducts?.products?.map((product, idx) => (
          <div
            key={`product-${idx}`}
            className="flex flex-col col-span-1 rounded-md border border-gray-300 p-5 hover:shadow-lg cursor-pointer"
            onClick={() => navigate(`product/${product.id}`)}
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
  );
};
