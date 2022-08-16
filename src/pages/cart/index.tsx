import React, { useEffect } from "react";
import { useStore } from "store";

const CartPage: React.FC = () => {
  const userCart = useStore((state) => state.userCart);
  const getUserCart = useStore((state) => state.getUserCart);

  useEffect(() => {
    getUserCart();
  }, []);

  console.log("userCart", userCart);
  return (
    <div className="flex-1 container my-8 max-w-screen-lg mx-auto p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userCart?.carts?.map((cart, idx) => (
          <div
            key={`cart-${idx}`}
            className="col-span-1 rounded-md border border-gray-300 p-5"
          >
            <h2 className="text-xl font-semibold mb-2">{cart?.id || ""}</h2>
            <p className="m-0">{cart.discountedTotal}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartPage;
