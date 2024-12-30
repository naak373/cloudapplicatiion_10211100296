"use client";

import { useCartStore } from "../stores/cartStore";
import { Button } from "@/components/ui/button";

interface AddToCartProps {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export default function AddToCart({ id, name, price, image, description }: AddToCartProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    const item = { id, name, price, image, description, quantity: 1 };
    addToCart(item);
  };

  return (
    <Button onClick={handleAddToCart} className="w-full">
      Add to Cart
    </Button>
  );
}
