import React, { useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { useStateContext } from "../context/StateContext";
import { runFireworks, putData } from "../lib/utils";
import { useRouter } from "next/router";

const Success = () => {
	const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
	// const router = useRouter();
	// const { status, order } = router.query;

	// const updateOrderPayment = async () => {
	// 	if (status && order && status === "success") {
	// 		const res = await putData(`/api/orders/${order}/pay`,);
	// 	}
	// };

	useEffect(() => {
		setCartItems([]);
		setTotalPrice(0);
		setTotalQuantities(0);
		runFireworks();
		return () => {};
	}, []);

	return (
		<div className="success-wrapper">
			<div className="success">
				<div className="icon">
					<BsBagCheckFill />
				</div>
				<h2>Thank you for your order!</h2>
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
	);
};
Success.auth = true;
export default Success;
