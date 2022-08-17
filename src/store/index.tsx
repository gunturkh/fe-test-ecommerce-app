import axios from "axios";
import create from "zustand";

type EcommerceProducts = {
  limit: number;
  skip: number;
  total: number;
  products: Product[];
};

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

type Cart = {
  id: number;
  products: Product[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
};

type UserCart = {
  carts: Cart[];
  total: number;
  skip: number;
  limit: number;
};

interface Ecommerce {
  count: number;
  inc: () => void;
  dec: () => void;
  ecommerceProducts: EcommerceProducts;
  ecommerceProduct: Product;
  getProducts: () => void;
  getProduct: (id: number) => void;
  userCart: UserCart;
  getUserCart: () => void;
}

export const useStore = create<Ecommerce>((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
  dec: () => set((state) => ({ count: state.count - 1 })),
  ecommerceProducts: {
    skip: 0,
    limit: 10,
    total: 0,
    products: [],
  },
  ecommerceProduct: {
    id: 1,
    title: "iPhone 9",
    description: "An apple mobile which is nothing like apple",
    price: 549,
    discountPercentage: 12.96,
    rating: 4.69,
    stock: 94,
    brand: "Apple",
    category: "smartphones",
    thumbnail: "...",
    images: ["...", "...", "..."],
  },
  userCart: { skip: 0, limit: 10, total: 0, carts: [] },
  getProducts: async () => {
    const response = await axios.get("https://dummyjson.com/products");
    set({ ecommerceProducts: response?.data });
  },
  getProduct: async (id: number) => {
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    set({ ecommerceProduct: response?.data });
  },
  getUserCart: async () => {
    const response = await axios.get("https://dummyjson.com/carts/user/5");
    set({ userCart: response?.data });
  },
}));
