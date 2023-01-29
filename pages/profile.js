import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getData, putData } from "../lib/utils";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Loader } from "../components";

const Profile = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [orders, setOrders] = useState([]);

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();


	//this is needed to show the new name after an update but to make it work
	//the SessionProvider property "refetchOnWindowFocus" need to be true,
	//but that makes it auto-update the session when a user switches windows and i don't want that
	// const reloadSession = () => {
	// 	const event = new Event("visibilitychange");
	// 	document.dispatchEvent(event);
	// };

	const handleUpdate = async ({ name }) => {
		try {
			const updateRes = await putData("/api/auth/update", { name });
			const updateData = await updateRes.json();
			console.log(updateData);
			toast.success("Name updated successfully!");
			toast("SignIn again to see the changes");
			//reloadSession();
			if (updateData.error) {
				toast.error(updateData.error);
			}
		} catch (error) {
			toast.error(error);
		}
	};

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const res = await getData(`/api/orders/history`);
				const data = await res.json();
				if (data.error) {
					console.log(data.error);
				} else {
					setIsLoading(false);
				}
				setOrders(data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchOrders();
	}, []);
	return (
		<>
			<div className="profile-container">
				<form onSubmit={handleSubmit(handleUpdate)}>
					<h2 className="profile-title">Update Profile</h2>
					<div className="update-input">
						<label htmlFor="name">Name</label>
						<input
							type="name"
							{...register("name", {
								required: "Please enter name",
							})}
							className="register-input"
							id="name"
							autoFocus
						/>
						{errors.name && (
							<div style={{ color: "#dd6666" }}>{errors.name.message}</div>
						)}
					</div>
					<div className="update-button">
						<button className="update-btn ">Update Name</button>
					</div>
				</form>

				<h2 className="profile-title">Order History</h2>
				{isLoading ? (
					<Loader />
				) : orders.length < 1 ? (
					<div className="order-history-empty order-history">
						You don't have orders yet
					</div>
				) : (
					<div className="table-container order-history">
						<table className="table">
							<thead className="table-head">
								<tr>
									<th className="column-title">ID</th>
									<th className="column-title">DATE</th>
									<th className="column-title">TOTAL</th>
									<th className="column-title">PAID</th>
									<th className="column-title">ACTION</th>
								</tr>
							</thead>
							<tbody>
								{orders?.map((order) => (
									<tr key={order._id} className="table-row">
										<td className="table-item">
											{order._id.substring(20, 24)}
										</td>
										<td className="table-item">
											{order.createdAt.substring(0, 10)}
										</td>
										<td className="table-item">${order.totalPrice}</td>
										<td className="table-item">
											{order.isPaid
												? `${order.paidAt.substring(0, 10)}`
												: "not paid"}
										</td>
										<td className="table-item details">
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
			</div>
		</>
	);
};

Profile.auth = true;
export default Profile;
