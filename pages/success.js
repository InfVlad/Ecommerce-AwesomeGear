import React, { useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { useStateContext } from "../context/StateContext";
import { runFireworks } from "../lib/utils";

const Success = () => {
	const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

	useEffect(() => {
	  setCartItems([])
	  setTotalPrice(0)
	  setTotalQuantities(0)
	  runFireworks();
	  return () => {
		
	  }
	}, [])
	

	return (
        <div className="success-wrapper">
			<div className="success">
				<div className="icon">
					<BsBagCheckFill/>
				</div>
				<h2>Thank you for your order!</h2>
				<p className="email-msg">Check your email inbox for the receipt</p>
				<p className="description">
					If you have any questions, please email
					<a href="mailto:order@example.com" className="email">
					order@example.com
					</a>
				</p>
				<Link href={"/"}>
					<button type="button" width="300px" className="btn">
						Continue Shopping
					</button>
				</Link>
			</div>
		</div>
    )
};
Success.auth=true
export default Success;
