import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Loader } from "../../components";
import { getData } from "../../lib/utils";

const OrderScreen = () => {
	// order/:id
	const [isLoading, setIsLoading] = useState(true);
	const [order, setOrder] = useState({});
	const { query } = useRouter();
	const orderId = query.id;
  const regex = /T.*/i

	useEffect(() => {
		const fetchOrder = async () => {
			try {
				const res = await getData(`/api/orders/${orderId}`);
				if (res.error) {
					console.log(res.error);
					return;
				} else {
					const data = await res.json();
					console.log(data);
					setIsLoading(false);
					setOrder(data);
				}
			} catch (err) {
				console.log(err);
			}
		};
		if (!order._id || (order._id && order._id !== orderId)) {
			fetchOrder();
		}
	}, [order, orderId]);
	const {
		shippingAddress,
		orderItems,
		itemsPrice,
		shippingPrice,
		totalPrice,
		paidAt,
	} = order;

	return (
		<div className="order-details-container">
			<h1 className="order-details-title">{`Order Details`}</h1>
			<h2 className="order-details-id">{`ID: ${orderId}`}</h2>
			{isLoading ? (
				<Loader/>
			) : (
				<>
					<h2 className="order-details-subtitle">Shipping Address</h2>
					<p className="order-details-address">
						{shippingAddress.fullName}, {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
					</p>


						<h2 className="order-details-subtitle">Payment</h2>
						<div className="order-details-payment">Paid with Stripe at {paidAt.replace(regex,"")}</div>


					<h2 className="order-details-subtitle">Order Items</h2>
          <div className="order-details-table-container">
					<table className="order-details-table">
						<thead className="order-details-table-head">
							<tr>
								<th className="order-details-table-column-title">Item</th>
								<th className="order-details-table-column-title">Quantity</th>
								<th className="order-details-table-column-title">Price</th>
								<th className="order-details-table-column-title">Subtotal</th>
							</tr>
						</thead>
						<tbody className="order-details-table-body">
							{orderItems.map((item) => (
								<tr key={item._id} className="border-b">
									<td>
										<a className="order-details-image-container">
											<img
												src={item.image}
												alt={item.name}
												width={50}
												height={50}
											/>
											&nbsp;
											{item.name}
										</a>
									</td>
									<td className="order-details-table-column-item">
										{item.quantity}
									</td>
									<td className="order-details-table-column-item">
										${item.price}
									</td>
									<td className="order-details-table-column-item">
										${item.quantity * item.price}
									</td>
								</tr>
							))}
						</tbody>
					</table>
          </div>

					<div className="order-details-card">
						<h2 className="order-details-subtitle">Order Summary</h2>
						<ul className="order-details-summary">
							<li>
								<div className="order-details-summary-item">
									<div>Items</div>
									<div>${itemsPrice}</div>
								</div>
							</li>
							<li>
								<div className="order-details-summary-item">
									<div>Shipping</div>
									<div>${shippingPrice}</div>
								</div>
							</li>
							<li>
								<div className="order-details-summary-item bold">
									<div>Total</div>
									<div>${totalPrice}</div>
								</div>
							</li>
						</ul>
					</div>
				</>
			)}
		</div>
	);
};

OrderScreen.auth = true;
export default OrderScreen;
