import React, { useRef } from "react";
import Link from "next/link";
import {
	AiOutlineMinus,
	AiOutlinePlus,
	AiOutlineLeft,
	AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import getError from "../lib/error";
import { motion } from "framer-motion";

const Cart = () => {
	const cartRef = useRef();
	const {
		totalPrice,
		totalQuantities,
		cartItems,
		setShowCart,
		toggleCartItemQuantity,
		onRemove,
		setInCheckoutProcess,
	} = useStateContext();

	const { data: session } = useSession();
	const router = useRouter();
	const { redirect } = router.query;
	const loginDemo = async (email, password) => {
		try {
			const result = await signIn("credentials", {
				redirect: false,
				email,
				password,
			});
			if (result.error) {
				toast.error(result.error);
			}
		} catch (err) {
			toast.error(getError(err));
		}
	};

	const handlePlaceOrder = async () => {
		setShowCart(false);

		if (!session?.user) {
			const asDemo = confirm("Do you want to login with a Demo Account?");
			if (asDemo) {
				await loginDemo("user1@example.com", "123456");
				router.push(redirect || "/checkout");
			} else {
				toast("Please login before placing an order");
				setInCheckoutProcess(true);
				setTimeout(() => router.push("/login"), 600);
			}
		} else {
			router.push("/checkout");
		}
	};

	const variants = {
		initial: { opacity: 0, x: "100%" },
		animate: { opacity: 1, x: 0 },
		transition: { duration: 0.5 },
	};

	return (
		<div className="cart-wrapper" ref={cartRef}>
			<motion.div {...variants} className="cart-container">
				<button
					className="cart-heading"
					type="button"
					onClick={() => setShowCart(false)}
				>
					<AiOutlineLeft />
					<span className="heading">Your Cart</span>
					<span className="cart-num-items">({totalQuantities} items)</span>
				</button>
				{cartItems.length < 1 && (
					<div className="empty-cart">
						<AiOutlineShopping size={150} />
						<h3>Your shopping bag is empty</h3>
						<Link href={"/"}>
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

				<div className="product-container">
					{cartItems.length >= 1 &&
						cartItems.map((item, index) => (
							<div className="product" key={item._id}>
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
					<div className="cart-bottom">
						<div className="total">
							<h3>Subtotal:</h3>
							<h3>${totalPrice}</h3>
						</div>
						<div className="btn-container">
							<button type="button" className="btn" onClick={handlePlaceOrder}>
								Proceed to Checkout
							</button>
						</div>
					</div>
				)}
			</motion.div>
		</div>
	);
};

export default Cart;
