"use client";

import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SideCart from "./SideCart";
import { useCartStore } from "../stores/cartStore";

const links = [
    { name: "Home", href: "/" },
    { name: "Men", href: "/Men" },
    { name: "Women", href: "/Women" },
    { name: "Teens", href: "/Teens" },
];

export default function Navbar() {
    const pathname = usePathname();
    const isCartVisible = useCartStore((state) => state.isCartVisible);
    const toggleCart = useCartStore((state) => state.toggleCart);
    const cartItems = useCartStore((state) => state.cartItems);

    // Calculate total quantity
    const totalQuantity = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    return (
        <>
            {/* Navbar */}
            <header className="mb-8 border-b">
                <div className="flex items-center justify-between mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
                    <Link href="/">
                        <h1 className="text-2xl md:text-4xl font-bold">
                            Fi<span className="text-primary">ty</span>
                        </h1>
                    </Link>

                    {/* Navigation Links */}
                    <nav className="hidden gap-12 lg:flex 2xl:ml-16">
                        {links.map((link, idx) => (
                            <div key={idx}>
                                {pathname === link.href ? (
                                    <Link
                                        className="text-lg font-semibold text-primary"
                                        href={link.href}
                                    >
                                        {link.name}
                                    </Link>
                                ) : (
                                    <Link
                                        href={link.href}
                                        className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary"
                                    >
                                        {link.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Cart Button */}
                    <div className="flex divide-x border-r sm:border-l">
                        <Button
                            variant={"outline"}
                            className="relative flex flex-col gap-y-1.5 h-12 w-12 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-none"
                            onClick={toggleCart}
                        >
                            <ShoppingBag />
                            <span className="hidden text-xs font-semibold text-gray-500 sm:block">
                                Cart
                            </span>
                            {totalQuantity > 0 && (
                                <span className="absolute top-0 right-0 flex items-center justify-center h-5 w-5 rounded-full bg-primary text-xs font-bold text-white">
                                    {totalQuantity > 9 ? "9+" : totalQuantity}
                                </span>
                            )}
                        </Button>
                    </div>
                </div>
            </header>

            {/* SideCart Component */}
            <SideCart visible={isCartVisible} onRequestClose={toggleCart} />
        </>
    );
}