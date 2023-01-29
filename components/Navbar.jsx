import React, { useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { FaShoppingCart, FaUser, FaMoon, FaSun } from "react-icons/fa";
import Cart from "./Cart";
import { useStateContext } from "../context/StateContext";
import { Menu } from "@headlessui/react";
import { deleteData, paymentNotification } from "../lib/utils";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const Navbar = () => {
	const {
		showCart,
		setShowCart,
		totalQuantities,
		setCartItems,
		setTotalPrice,
		setTotalQuantities,
		lightTheme,
		setLightTheme,
	} = useStateContext();
	const router = useRouter();
	const { status, data: session } = useSession();
	const { status: queryStatus, orderid: orderId } = router.query;

	const logoutClickHandler = () => {
		setCartItems([]);
		setTotalPrice(0);
		setTotalQuantities(0);
		signOut({ callbackUrl: "/login" });
	};
	useEffect(() => {
		if (
			(queryStatus && queryStatus === "canceled") ||
			queryStatus === "success"
		) {
			paymentNotification(queryStatus, orderId);
		}
		const deleteCanceledOrder = async () => {
			if (queryStatus && orderId && queryStatus === "canceled") {
				try {
					const res = await deleteData(`/api/orders/${orderId}/delete`, {
						orderId,
					});
					const data = await res.json();
					console.log(data);
				} catch (error) {
					console.log(error);
				}
			}
		};
		deleteCanceledOrder();
	}, [queryStatus]);

	return (
		<div className="navbar-container">
			<Link href={"/"}>
				<motion.div
					initial={{ translateY: -25, opacity: 0 }}
					animate={{ translateY: 0, opacity: 1 }}
					transition={{ duration: 0.35, delay: 0.25 }}
					className="logo-container"
				>
					<img src="/logo.png" alt="" className="logo" />
					<div className="shop-name">AwesomeGear</div>
				</motion.div>
			</Link>
			<div className="navbar-user-container">
				<motion.button
					initial={{ translateY: -25, opacity: 0 }}
					animate={{ translateY: 0, opacity: 1 }}
					transition={{ duration: 0.35, delay: 0.5 }}
					type="button"
					className="cart-icon-btn"
					onClick={() => setLightTheme((prev) => !prev)}
				>
					{lightTheme ? (
						<FaSun className="cart-icon" />
					) : (
						<FaMoon className="cart-icon" />
					)}
				</motion.button>

				<motion.button
					initial={{ translateY: -25, opacity: 0 }}
					animate={{ translateY: 0, opacity: 1 }}
					transition={{ duration: 0.35, delay: 0.5 }}
					type="button"
					className="cart-icon-btn"
					onClick={() => setShowCart(true)}
				>
					<FaShoppingCart className="cart-icon" />
					<span className="cart-item-qty">{totalQuantities}</span>
				</motion.button>
				<motion.div
					initial={{ translateY: -25, opacity: 0 }}
					animate={{ translateY: 0, opacity: 1 }}
					transition={{ duration: 0.35, delay: 0.95 }}
					className="user-container"
				>
					<div className="user-name">
						{status === "loading" ? (
							"Loading"
						) : session?.user ? (
							<Menu as="div" className="dropdown-menu-container">
								<Menu.Button className="dropdown-button">
									<div className="user-icon">
										<FaUser className="fa-icon" />
									</div>
									<div className="dropdown-button-text">
										{session.user.name}
									</div>
								</Menu.Button>
								<Menu.Items className="dropdown-menu-items">
									<Menu.Item className="dropdown-menu-item">
										<div className="dropdown-link">
											<Link href={"/profile"}>Profile</Link>
										</div>
									</Menu.Item>
									<Menu.Item className="dropdown-menu-item">
										<a
											className="dropdown-link"
											href="#"
											onClick={logoutClickHandler}
										>
											Logout
										</a>
									</Menu.Item>
								</Menu.Items>
							</Menu>
						) : (
							<Link href="/login">Login</Link>
						)}
					</div>
				</motion.div>
			</div>
			{showCart && <Cart />}
		</div>
	);
};

export default Navbar;
