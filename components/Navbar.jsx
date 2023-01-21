import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import Cart from "./Cart";
import { useStateContext } from "../context/StateContext";

const Navbar = () => {
	const { showCart, setShowCart, totalQuantities } = useStateContext();
	const { status, data: session } = useSession();
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
					{status === "loading"
						? ""
						: session?.user && (
								<div className="user-icon">
									<FaUser className="fa-icon" />
								</div>
						  )}

					<div className="user-name">
						{status === "loading" ? (
							"Loading"
						) : session?.user ? (
							session.user.name
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
