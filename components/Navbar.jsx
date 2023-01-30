import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { FaShoppingCart, FaUser, FaMoon, FaSun } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import Cart from "./Cart";
import { useStateContext } from "../context/StateContext";
import { Menu } from "@headlessui/react";
import { deleteData, paymentNotification } from "../lib/utils";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import HamburgerMenu from "./HamburgerMenu";
// import { HamburgerMenu } from ""

const Navbar = () => {
	const [showHamMenu, setShowHamMenu] = useState(false);
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
					transition={{ duration: 0.15, delay: 0.1 }}
					className="logo-container"
				>
					<img src="/logo.png" alt="" className="logo" />
					<div className="navbar-shop-name">AwesomeGear</div>
				</motion.div>
			</Link>
			<div className="navbar-buttons-container">
				<Link href={`/shop?category=Mouse`}>
					<motion.div
						initial={{ translateY: -25, opacity: 0 }}
						animate={{ translateY: 0, opacity: 1 }}
						transition={{ duration: 0.09, delay: 0.25 }}
						className="navbar-button"
					>
						Mice
					</motion.div>
				</Link>

				<Link href={`/shop?category=Keyboard`}>
					<motion.div
						initial={{ translateY: -25, opacity: 0 }}
						animate={{ translateY: 0, opacity: 1 }}
						transition={{ duration: 0.09, delay: 0.34 }}
						className="navbar-button"
					>
						Keyboards
					</motion.div>
				</Link>
				<Link href={`/shop?category=Headset`}>
					<motion.div
						initial={{ translateY: -25, opacity: 0 }}
						animate={{ translateY: 0, opacity: 1 }}
						transition={{ duration: 0.09, delay: 0.43 }}
						className="navbar-button"
					>
						Headsets
					</motion.div>
				</Link>
				<Link href={`/shop?category=Mousepad`}>
					<motion.div
						initial={{ translateY: -25, opacity: 0 }}
						animate={{ translateY: 0, opacity: 1 }}
						transition={{ duration: 0.09, delay: 0.52 }}
						className="navbar-button"
					>
						Mouse pads
					</motion.div>
				</Link>
			</div>
			<div className="navbar-user-container">
				<motion.button
					initial={{ translateY: -25, opacity: 0 }}
					animate={{ translateY: 0, opacity: 1 }}
					transition={{ duration: 0.15, delay: 0.65 }}
					type="button"
					className="cart-icon-btn"
					aria-label="dark/light theme toggle"
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
					transition={{ duration: 0.15, delay: 0.8 }}
					type="button"
					aria-label="shopping cart toggle"
					className="cart-icon-btn"
					onClick={() => {
						setShowCart(true);
						if (showHamMenu) setShowHamMenu(false);
					}}
				>
					<FaShoppingCart className="cart-icon" />
					<span className="cart-item-qty">{totalQuantities}</span>
				</motion.button>
				<motion.div
					initial={{ translateY: -25, opacity: 0 }}
					animate={{ translateY: 0, opacity: 1 }}
					transition={{ duration: 0.15, delay: 1.0 }}
					className="user-container"
				>
					<div className="user-name">
						<div className="navbar-hamburger-container">
							<div
								className={"hamburger-lines" + (showHamMenu ? " active" : "")}
								onClick={() => setShowHamMenu((prev) => !prev)}
							>
								<span className="line line1"></span>
								<span className="line line2"></span>
								<span className="line line3"></span>
							</div>
							{showHamMenu && (
								<HamburgerMenu logoutClickHandler={logoutClickHandler} />
							)}
						</div>
						{status === "loading" ? (
							<div className="dropdown-menu-container">Loading</div>
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
							<Link href="/login">
								<div className="login">Login</div>
							</Link>
						)}
					</div>
				</motion.div>
			</div>
			{showCart && <Cart />}
		</div>
	);
};

export default Navbar;
