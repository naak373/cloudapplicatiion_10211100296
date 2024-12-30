import { FC } from "react";
import { useCartStore } from "../stores/cartStore";



interface Props {
    visible?: boolean;
    onRequestClose?(): void;
}

const SideCart: FC<Props> = ({ visible, onRequestClose }) => {
    const { cartItems, totalPrice, removeItem, updateQuantity, clearCart } =
        useCartStore();

    return (
        <div
            style={{ right: visible ? "0" : "-100%" }}
            className="shadow-md transition-all w-96 bg-white min-h-screen fixed right-0 top-0 flex flex-col z-50"
        >
            <div className="p-4 flex justify-between">
                <h1 className="font-semibold uppercase text-gray-600">Cart</h1>
                <button
                    onClick={clearCart}
                    className="uppercase text-sm hover:underline"
                >
                    Clear
                </button>
            </div>
            <div className="w-full h-0.5 bg-gray-200" />

            <div className="p-4">
                {cartItems.map((item) => (
                    <div className="flex space-x-4 mb-4" key={item.id}>
                        <img
                            src={item.image}
                            alt={item.name}
                            className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
                        />
                        <div className="flex-1">
                            <h2 className="font-semibold">{item.name}</h2>
                            <div className="flex text-gray-400 text-sm space-x-1">
                                <span>{item.quantity}</span>
                                <span>x</span>
                                <span>{item.price}</span>
                            </div>
                        </div>

                        <div className="ml-auto flex flex-col items-end">
                            <button
                                onClick={() => removeItem(item.id)}
                                className="text-xs uppercase hover:underline"
                            >
                                Remove
                            </button>

                            <div className="flex items-center justify-between mt-2">
                                <button
                                    onClick={() =>
                                        updateQuantity(item.id, Math.max(item.quantity - 1, 1))
                                    }
                                >
                                    -
                                </button>
                                <span className="text-xs mx-2">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="w-full h-0.5 bg-gray-200" />

            <div className="mt-auto p-4">
                <div className="py-4">
                    <h1 className="font-semibold text-xl uppercase">Total</h1>
                    <p className="font-semibold">
                        <span className="text-gray-400 font-normal">
                            The total of your cart is:
                        </span>{" "}
                        ${totalPrice.toFixed(2)}
                    </p>
                </div>

                <button className="border-2 border-orange-600 py-2 w-full rounded text-orange-600 uppercase">
                    Checkout
                </button>
                <button
                    onClick={onRequestClose}
                    className="outline-none block mt-4 text-center w-full uppercase"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default SideCart;