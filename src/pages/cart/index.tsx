import axios from "axios";
import { Button } from "components";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "store";

const CartPage: React.FC = () => {
  const userCart = useStore((state) => state.userCart);
  const getUserCart = useStore((state) => state.getUserCart);
  const updateCart = useStore((state) => state.updateCart);
  const navigate = useNavigate();

  useEffect(() => {
    getUserCart();
    fetch("https://dummyjson.com/carts/1", {
      method: "PUT" /* or PATCH */,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        products: [
          {
            id: 1,
            quantity: 1,
          },
        ],
      }),
    })
      .then((res) => res.json())
      .then(console.log);
  }, []);

  console.log("userCart", userCart);
  return (
    <div className="flex-1 container my-8 max-w-screen-lg mx-auto p-5">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
        {userCart?.carts[0]?.products?.map((cartProduct, idx) => (
          <div
            key={`cart-${idx}`}
            className="grid grid-cols-2 rounded-md border border-gray-300 p-5"
          >
            <div className="col-span-1">
              <h2 className="text-xl font-semibold mb-2">
                {cartProduct?.title || ""}
              </h2>
              <h3 className="font-semibold text-gray-500 line-through">
                US$ {cartProduct?.price * cartProduct?.quantity}
              </h3>
              <h3 className="font-semibold text-red-500 ">
                US$ {cartProduct?.discountedPrice}
              </h3>
            </div>
            <div className="col-span-1 flex flex-row justify-end items-center ">
              <button
                className={`mr-4 py-2 px-4 rounded bg-red-500 hover:bg-red-600 focus:outline-none ring-opacity-75 ring-red-400 focus:ring text-white text-lg `}
                onClick={() => {
                  const manipulatedCartProduct =
                    userCart.carts[0].products.findIndex(
                      (product) => product.id === cartProduct?.id
                    );
                  userCart?.carts[0]?.products.splice(
                    manipulatedCartProduct,
                    1
                  );
                  const newUserCartState = userCart?.carts[0];
                  console.log("newUserCartState remove", newUserCartState);
                  updateCart(newUserCartState, userCart?.carts[0]?.id);
                }}
              >
                X
              </button>
              <Button
                onClick={() => {
                  const manipulatedCartProduct =
                    userCart.carts[0].products.find(
                      (product) => product.id === cartProduct?.id
                    );
                  manipulatedCartProduct.quantity -= 1;
                  const newUserCartState = userCart?.carts[0];
                  updateCart(newUserCartState, userCart?.carts[0]?.id);
                }}
              >
                -
              </Button>
              <p className="m-0 text-right mx-4">{cartProduct?.quantity} pcs</p>
              <Button
                onClick={() => {
                  const manipulatedCartProduct =
                    userCart.carts[0].products.find(
                      (product) => product.id === cartProduct?.id
                    );
                  manipulatedCartProduct.quantity += 1;
                  const newUserCartState = userCart?.carts[0];
                  updateCart(newUserCartState, userCart?.carts[0]?.id);
                }}
              >
                {" "}
                +
              </Button>
            </div>
          </div>
        ))}
        <h1 className="text-right">Total: US$ {userCart?.carts[0]?.total}</h1>
        <h1 className="text-right">
          Discounted Total: US$ {userCart?.carts[0]?.discountedTotal}
        </h1>
        <Button
          onClick={() => {
            window.alert(
              "Successfully Checkout, Navigating to Last Visited Product"
            );
            navigate(-1);
          }}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
