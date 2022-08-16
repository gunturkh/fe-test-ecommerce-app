import React from "react";

import { Logo } from "components";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  return (
    <nav className="text-center bg-gray-800 flex flex-row items-center p-4">
      <div className="flex-1">
        <Logo />
      </div>
      <Link to="/cart" className="text-lg text-white">
        Cart
      </Link>
    </nav>
  );
};
