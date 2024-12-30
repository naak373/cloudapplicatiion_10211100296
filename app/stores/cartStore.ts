import { create } from "zustand";

interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  cartItems: CartItem[]; // Unified array for cart items
  isCartVisible: boolean; // To manage cart visibility
  totalPrice: number; // Total price of items in the cart
  toggleCart: () => void; // Function to toggle cart visibility
  addToCart: (item: CartItem) => void; // Add an item to the cart
  removeItem: (id: string) => void; // Remove an item from the cart
  updateQuantity: (id: string, quantity: number) => void; // Update the quantity of an item
  clearCart: () => void; // Clear the cart
}

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],
  isCartVisible: false,
  totalPrice: 0,

  // Toggle cart visibility
  toggleCart: () =>
    set((state) => ({ isCartVisible: !state.isCartVisible })),

  // Add an item to the cart
  addToCart: (item) => {
    set((state) => {
      const existingItem = state.cartItems.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        // If the item exists, update the quantity
        return {
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
              : cartItem
          ),
          totalPrice: state.totalPrice + item.price * item.quantity,
        };
      }

      // If the item doesn't exist, add it to the cart
      return {
        cartItems: [...state.cartItems, item],
        totalPrice: state.totalPrice + item.price * item.quantity,
      };
    });
  },

  // Remove an item from the cart
  removeItem: (id) => {
    set((state) => {
      const itemToRemove = state.cartItems.find((cartItem) => cartItem.id === id);
      if (!itemToRemove) return state;

      return {
        cartItems: state.cartItems.filter((cartItem) => cartItem.id !== id),
        totalPrice: state.totalPrice - itemToRemove.price * itemToRemove.quantity,
      };
    });
  },

  // Update the quantity of an item in the cart
  updateQuantity: (id, quantity) => {
    set((state) => ({
      cartItems: state.cartItems.map((cartItem) =>
        cartItem.id === id ? { ...cartItem, quantity } : cartItem
      ),
      totalPrice: state.cartItems.reduce(
        (total, cartItem) =>
          total +
          (cartItem.id === id
            ? quantity * cartItem.price
            : cartItem.quantity * cartItem.price),
        0
      ),
    }));
  },

  // Clear the entire cart
  clearCart: () =>
    set(() => ({
      cartItems: [],
      totalPrice: 0,
    })),
}));
