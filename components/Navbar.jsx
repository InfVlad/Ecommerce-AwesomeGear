import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import Cart from "./Cart";
import { useStateContext } from "../context/StateContext";
import { Menu } from "@headlessui/react";
import DropdownLink from "./DropdownLink";

const Navbar = () => {
	const {
		showCart,
		setShowCart,
		totalQuantities,
		setCartItems,
		setTotalPrice,
		setTotalQuantities,
	} = useStateContext();
	const { status, data: session } = useSession();

	const logoutClickHandler = () => {
		setCartItems([]);
		setTotalPrice(0);
		setTotalQuantities(0);
		signOut({ callbackUrl: "/login" });
	};

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
										<DropdownLink className="dropdown-link" href="/profile">
											Profile
										</DropdownLink>
									</Menu.Item>
									<Menu.Item className="dropdown-menu-item">
										<DropdownLink
											className="dropdown-link"
											href="/order-history"
										>
											Order History
										</DropdownLink>
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
