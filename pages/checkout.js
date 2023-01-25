import React from "react";
import { useForm } from "react-hook-form";
import getStripe from "../lib/getStripe";
import { useStateContext } from "../context/StateContext";
import toast from "react-hot-toast";
import { urlFor } from "../lib/client";
import {
	AiOutlineMinus,
	AiOutlinePlus,
	AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import Link from "next/link";
import { getImage, postData, putData } from "../lib/utils";
import getError from "../lib/error";

const Checkout = () => {
	const {
		totalPrice,
		cartItems,
		setShowCart,
		toggleCartItemQuantity,
		onRemove,
	} = useStateContext();
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();

	const handleCheckout = async (data) => {
		const orderItems = cartItems.map((item) => ({
			name: item.name,
			quantity: item.quantity,
			image: getImage(item),
			price: item.price,
		}));
		const shippingAddress = { ...data };
		const order = {
			orderItems,
			shippingAddress,
			itemsPrice: totalPrice,
			shippingPrice: 0,
			totalPrice,
			isPaid: false,
			paidAt: undefined,
		};
		try {

			// TO-DO: isPaid should be changed to true After the payment is successful

			const orderResponse = await postData("/api/orders", order);
			const orderData = await orderResponse.json();
			console.log("orderResponse", orderResponse, "orderData", orderData)
			const orderId = orderData.order._id;
			if (orderResponse.error) {
				toast.error(orderResponse.error);
				return;
			} else {
				toast.success(orderData.msg);
			}

			const stripe = await getStripe();
			const res = await postData("/api/stripe", {cartItems, orderId});
			const data = await res.json();
			console.log("stripe res",res);
			console.log("stripe data", data);


			if (res.statusCode === 500) return;

			toast.loading("Redirecting to Stripe...");
			//yes, im updating the isPaid status and its not even successful yet, 
			//TO-DO: create a webhook with stripe api and wait for success
			//but for now i made the api for update and im gonna use it,
			//either way if its canceled the order its gonna be deleted
			const updateResult = await putData(`/api/orders/${orderId}/pay`,{orderId})
			const dataPaymentUpdate = await updateResult.json();

			console.log(dataPaymentUpdate.message);
			stripe.redirectToCheckout({ sessionId: data.id });
		} catch (error) {
			toast.error(getError(error));
		}
	};

	return (
		<div className="checkout-container">
			<form
				className="shipping-form-container"
				onSubmit={handleSubmit(handleCheckout)}
			>
				<h1 className="checkout-title-text">Shipping Address</h1>
				<div className="shipping-form-item">
					<label htmlFor="fullName">Full Name</label>
					<input
						id="fullName"
						autoFocus
						{...register("fullName", {
							required: "Please enter full name",
						})}
					/>
					{errors.fullName && (
						<div className="input-error-message">{errors.fullName.message}</div>
					)}
				</div>
				<div className="shipping-form-item">
					<label htmlFor="address">Address</label>
					<input
						id="address"
						{...register("address", {
							required: "Please enter address",
							minLength: { value: 3, message: "Address is more than 2 chars" },
						})}
					/>
					{errors.address && (
						<div className="input-error-message">{errors.address.message}</div>
					)}
				</div>
				<div className="shipping-form-item">
					<label htmlFor="city">City</label>
					<input
						id="city"
						{...register("city", {
							required: "Please enter city",
						})}
					/>
					{errors.city && (
						<div className="input-error-message ">{errors.city.message}</div>
					)}
				</div>
				<div className="shipping-form-item">
					<label htmlFor="postalCode">Postal Code</label>
					<input
						id="postalCode"
						{...register("postalCode", {
							required: "Please enter postal code",
						})}
					/>
					{errors.postalCode && (
						<div className="input-error-message ">
							{errors.postalCode.message}
						</div>
					)}
				</div>
				<div className="shipping-form-item">
					<label htmlFor="country">Country</label>
					<input
						id="country"
						{...register("country", {
							required: "Please enter country",
						})}
					/>
					{errors.country && (
						<div className="input-error-message ">{errors.country.message}</div>
					)}
				</div>

				{/*----------------------*/}
				<h1 className="checkout-title-text">Shopping Cart</h1>

				{cartItems.length < 1 && (
					<div className="empty-cart">
						<AiOutlineShopping size={150} />
						<h3>Your shopping bag is empty</h3>
						<Link href={"/shop"}>
							<button
								type="button"
								onClick={() => setShowCart(false)}
								className="btn"
							>
								Continue Shopping
							</button>
						</Link>
					</div>
				)}
				<div className="checkout-cart-items-container">
					<div className="product-container">
						{cartItems.length >= 1 &&
							cartItems.map((item, index) => (
								<div className="product checkout-product" key={item._id}>
									<img
										src={urlFor(item?.image[0])}
										alt={item.name}
										className="cart-product-image"
									/>
									<div className="item-desc">
										<div className="flex top">
											<h5>{item.name}</h5>
											<h4>${item.price}</h4>
										</div>
										<div className="flex bottom">
											<div>
												<p className="quantity-desc">
													<span
														className="minus"
														onClick={() =>
															toggleCartItemQuantity(item._id, "dec")
														}
													>
														<AiOutlineMinus />
													</span>
													<span className="num">{item.quantity}</span>
													<span
														className="plus"
														onClick={() =>
															toggleCartItemQuantity(item._id, "inc")
														}
													>
														<AiOutlinePlus />
													</span>
												</p>
											</div>
											<button
												type="button"
												className="remove-item"
												onClick={() => onRemove(item)}
											>
												<TiDeleteOutline />
											</button>
										</div>
									</div>
								</div>
							))}
					</div>
					{cartItems.length >= 1 && (
						<div className="checkout-cart-bottom">
							<div className="total">
								<h3>Subtotal:</h3>
								<h3>${totalPrice}</h3>
							</div>
							<div className="place-order-button">
								<button className="btn">Place Order</button>
							</div>
						</div>
					)}
				</div>
			</form>
		</div>
	);
};
Checkout.auth = true;
export default Checkout;
