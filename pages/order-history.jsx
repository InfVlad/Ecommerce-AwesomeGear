import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getError } from "../lib/error";
import { getData } from "../lib/utils";

const OrderHistory = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [orders, setOrders] = useState([]);
	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const data = await getData(`/api/orders/history`);
				if (!data.error) {
					setIsLoading(false);
				} else {
					setError(data.error);
				}

				console.log(data);
                setOrders(data);
			} catch (error) {
				console.loading(getError(error));
			}
		};
		fetchOrders();
	}, []);
	return (
		<>
			<h1 className="order-history-title">Order History</h1>
			{isLoading ? (
				<div>Loading...</div>
			) : error ? (
				<div className="alert-error">{error}</div>
			) : (
				<div className="table-container">
					<table className="min-w-full">
						<thead className="border-b">
							<tr>
								<th className="column-title">ID</th>
								<th className="column-title">DATE</th>
								<th className="column-title">TOTAL</th>
								<th className="column-title">PAID</th>
								<th className="column-title">DELIVERED</th>
								<th className="column-title">ACTION</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => (
								<tr key={order._id} className="table-border">
									<td className="table-item">{order._id.substring(20, 24)}</td>
									<td className="table-item">{order.createdAt.substring(0, 10)}</td>
									<td className="table-item">${order.totalPrice}</td>
									<td className="table-item">
										{order.isPaid
											? `${order.paidAt.substring(0, 10)}`
											: "not paid"}
									</td>
									<td className="table-item">
										{order.isDelivered
											? `${order.deliveredAt.substring(0, 10)}`
											: "not delivered"}
									</td>
									<td className="table-item">
										<Link href={`/order/${order._id}`} passHref>
											<a>Details</a>
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</>
	);
};

OrderHistory.auth = true;
export default OrderHistory;
