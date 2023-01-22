import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import getStripe from "../lib/getStripe";
import { useStateContext } from "../context/StateContext";
import toast from "react-hot-toast";

const Checkout = () => {
	const {
		totalPrice,
		totalQuantities,
		cartItems,
		setShowCart,
		toggleCartItemQuantity,
		onRemove,
	} = useStateContext();
    const {
        handleSubmit,
        register,
        formState: {errors},
        setValue,
    } = useForm();

	const handelCheckout = async () => {
		const stripe = await getStripe();

		const response = await fetch("/api/stripe", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(cartItems),
		});
		if (response.statusCode === 500) return;

		const data = await response.json();
		toast.loading("Redirecting...");
		stripe.redirectToCheckout({ sessionId: data.id });
	};

	return <div></div>;
};

export default Checkout;
