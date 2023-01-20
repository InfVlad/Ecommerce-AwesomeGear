import React from "react";
import Link from "next/link";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import Cart from "./Cart";
import { useStateContext } from "../context/StateContext";

const Navbar = () => {
	const { showCart, setShowCart, totalQuantities } = useStateContext();

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
					<div className="user-icon">
						<FaUser className="fa-icon" />
					</div>
					<div className="user-name">Vladimir Infante</div>
				</div>
			</div>
			{showCart && <Cart />}
		</div>
	);
};

export default Navbar;
