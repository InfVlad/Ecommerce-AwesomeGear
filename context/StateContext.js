import React, { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
	const [showCart, setShowCart] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalQuantities, setTotalQuantities] = useState(0);
	const [qty, setQty] = useState(1);
	const [inCheckoutProcess, setInCheckoutProcess] = useState(false);
	const [lightTheme, setLightTheme] = useState(false);

	let foundProduct;
	let index;

	const round = (number) => {
		return Math.round((number + Number.EPSILON) * 100) / 100;
	};

	const onAdd = (product, quantity) => {
		const checkProductInCart = cartItems.find(
			(item) => item._id === product._id
		);

		setTotalPrice((prevTotalPrice) =>
			round(prevTotalPrice + product.price * quantity)
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
		setTotalPrice((prev) => round(prev - foundProduct.price * foundProduct.quantity));
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
			setTotalPrice((prev) => round(prev + foundProduct.price));
			setTotalQuantities((prev) => prev + 1);
		} else if (value === "dec") {
			if (foundProduct.quantity > 1) {
				newCartItems.splice(index, 0, {
					...foundProduct,
					quantity: foundProduct.quantity - 1,
				});

				setCartItems(newCartItems);
				setTotalPrice((prev) => round(prev - foundProduct.price));
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

	// useEffect(()=>{
	// 	setTotalPrice(prev=>(Math.round((prev + Number.EPSILON) * 100) / 100))
	// },[totalPrice])

	return (
		<Context.Provider
			value={{
				showCart,
				cartItems,
				totalPrice,
				totalQuantities,
				qty,
				inCheckoutProcess,
				lightTheme,
				incQty,
				decQty,
				onAdd,
				setShowCart,
				toggleCartItemQuantity,
				onRemove,
				setQty,
				setCartItems,
				setTotalPrice,
				setTotalQuantities,
				setInCheckoutProcess,
				setLightTheme,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export const useStateContext = () => useContext(Context);
