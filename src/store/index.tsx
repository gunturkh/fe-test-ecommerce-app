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
  category: Category;
  thumbnail: string;
  images: string[];
};

type Category =
  | "smartphones"
  | "laptops"
  | "fragrances"
  | "skincare"
  | "groceries"
  | "home-decoration"
  | "furniture"
  | "tops"
  | "womens-dresses"
  | "womens-shoes"
  | "mens-shirts"
  | "mens-shoes"
  | "mens-watches"
  | "womens-watches"
  | "womens-bags"
  | "womens-jewellery"
  | "sunglasses"
  | "automotive"
  | "motorcycle"
  | "lighting";

type CartProduct = {
  discountPercentage: number;
  discountedPrice: number;
  id: number;
  price: number;
  quantity: number;
  title: string;
  total: number;
};

type Cart = {
  id: number;
  products: CartProduct[];
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
  inc: (productId: number) => void;
  dec: (productId: number) => void;
  ecommerceProducts: EcommerceProducts;
  ecommerceProduct: Product;
  getProducts: () => void;
  getProductsByCategory: (category: Category) => void;
  getProduct: (id: number) => void;
  userCart: UserCart;
  getUserCart: () => void;
  updateCart: (cart: Cart, cartId: number) => void;
}

export const useStore = create<Ecommerce>((set, get) => ({
  count: 1,
  inc: (productId) =>
    set((state) => {
      console.log("productId", productId);
      console.log("cartState", state);
      const manipulatedCartProduct = state.userCart.carts[0].products.find(
        (product) => product.id === productId
      );
      manipulatedCartProduct.quantity += 1;
      console.log("manipulatedCartProduct", manipulatedCartProduct);
      const newUserCartState = state.userCart;
      console.log("newUserCartState", newUserCartState);
      // const result = {
      //   userCart: {
      //     ...state.userCart,
      //     carts: [...state.userCart?.carts, manipulatedCartProduct],
      //   },
      // };
      // console.log("result", result);

      return { userCart: newUserCartState };
    }),
  dec: (productId) => set((state) => ({ count: state.count - 1 })),
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
    const response = await axios.get(
      "https://dummyjson.com/products?limit=100"
    );
    set({ ecommerceProducts: response?.data });
  },
  getProductsByCategory: async (category: Category) => {
    const response = await axios.get(
      `https://dummyjson.com/products/category/${category}`
    );
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
  updateCart: async (cart: Cart, cartId: number) => {
    const { products } = cart;
    console.log("products", products);
    const response = await fetch(`https://dummyjson.com/carts/${cartId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        products,
      }),
    });
    console.log("response updateCart", response);
    const userCart = get().userCart;
    console.log("userCart updateCart", userCart);
    const filteredCarts = userCart.carts.findIndex((c) => c.id === cartId);
    const newUserCart = userCart.carts.splice(filteredCarts, 1, cart);
    console.log("filteredCarts", filteredCarts);
    console.log("newUserCart", newUserCart);
    // const newUserCartState = ;
    set({ userCart: { ...userCart, carts: newUserCart } });
  },
}));
