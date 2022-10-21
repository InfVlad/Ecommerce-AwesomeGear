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
				<div className="logo-container">AG</div>
			</Link>
			<ul className="navbar-buttons-container">
				<li className="navbar-button">Mice</li>
				<li className="navbar-button">Keyboards</li>
				<li className="navbar-button">Headsets</li>
				<li className="navbar-button">Mouse pads</li>
			</ul>
			<div className="navbar-user-container">
				<button
					type="button"
					className="cart-icon"
					onClick={() => setShowCart(true)}
				>
					<FaShoppingCart />
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
