import React from "react";
import { useNavigate } from "react-router-dom";

export const Logo: React.FC = () => {
  const navigate = useNavigate();
  return <img src="/icons/cart.svg" alt="react" width="96" height="58"  onClick={()=> navigate('/')} className="cursor-pointer"/>;
};
