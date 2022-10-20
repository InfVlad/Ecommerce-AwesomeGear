import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
	const [showCart, setShowCart] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalQuantities, setTotalQuantities] = useState(0);
	const [qty, setQty] = useState(1);

	let foundProduct;
	let index;

	const onAdd = (product, quantity) => {
		const checkProductInCart = cartItems.find(
			(item) => item._id === product._id
		);

		setTotalPrice(
			(prevTotalPrice) => prevTotalPrice + product.price * quantity
		);
		setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
		if (checkProductInCart) {
			const updatedCardItems = cartItems.map((cartProduct) => {
				if (cartProduct._id === product._id)
					return {
						...cartProduct,
						quantity: cartProduct.quantity + quantity,
					};
			});
			setCartItems(updatedCardItems);
		} else {
			product.quantity = quantity;

			setCartItems([...cartItems, { ...product }]);
		}
		toast.success(`${qty} ${product.name} added to the cart.`);
	};

	const onRemove = (product) => {
		foundProduct = cartItems.find((item) => item._id === product._id);
		const newCartItems = cartItems.filter((item) => item._id !== product._id);
		setCartItems(newCartItems);
		setTotalPrice((prev) => prev - foundProduct.price * foundProduct.quantity);
		setTotalQuantities((prev) => prev - foundProduct.quantity);
	};

	const toggleCartItemQuantity = (id, value) => {
		foundProduct = cartItems.find((item) => item._id === id);
		index = cartItems.findIndex((product) => product._id === id);
		let newCartItems = cartItems.filter((item) => item._id !== id);

		if (value === "inc") {
			newCartItems.splice(index, 0, {
				...foundProduct,
				quantity: foundProduct.quantity + 1,
			});

			setCartItems(newCartItems);
			setTotalPrice((prev) => prev + foundProduct.price);
			setTotalQuantities((prev) => prev + 1);
		} else if (value === "dec") {
			if (foundProduct.quantity > 1) {
				newCartItems.splice(index, 0, {
					...foundProduct,
					quantity: foundProduct.quantity - 1,
				});

				setCartItems(newCartItems);
				setTotalPrice((prev) => prev - foundProduct.price);
				setTotalQuantities((prev) => prev - 1);
			}
		}
	};

	const incQty = () => {
		setQty((prev) => prev + 1);
	};
	const decQty = () => {
		setQty((prevQty) => {
			if (prevQty > 1) return prevQty - 1;
			else return 1;
		});
	};

	return (
		<Context.Provider
			value={{
				showCart,
				cartItems,
				totalPrice,
				totalQuantities,
				qty,
				incQty,
				decQty,
				onAdd,
				setShowCart,
				toggleCartItemQuantity,
				onRemove,
				setQty,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export const useStateContext = () => useContext(Context);
