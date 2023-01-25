import React, { useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import Cart from "./Cart";
import { useStateContext } from "../context/StateContext";
import { Menu } from "@headlessui/react";
import { deleteData, paymentNotification } from "../lib/utils";
import { useRouter } from "next/router";

const Navbar = () => {
	const {
		showCart,
		setShowCart,
		totalQuantities,
		setCartItems,
		setTotalPrice,
		setTotalQuantities,
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
				<div className="logo-container">
					<img src="/logo.png" alt="" className="logo" />
					<div className="shop-name">AwesomeGear</div>
				</div>
			</Link>
			<div className="navbar-user-container">
				<button
					type="button"
					className="cart-icon-btn"
					onClick={() => setShowCart(true)}
				>
					<FaShoppingCart className="cart-icon" />
					<span className="cart-item-qty">{totalQuantities}</span>
				</button>
				<div className="user-container">
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
										<div className="dropdown-link">
											<Link href={"/order-history"}>Order History</Link>
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
				</div>
			</div>
			{showCart && <Cart />}
		</div>
	);
};

export default Navbar;
