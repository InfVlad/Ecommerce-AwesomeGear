import { getSession } from "next-auth/react";
import Order from "../../../../models/Order";
import db from "../../../../lib/db";

const deleteHandler = async (req, res) => {
	const session = await getSession({ req });
	if (!session) {
		return res.status(401).json({ error: "Error: Signin required" });
	}

	await db.connect();
	const order = await Order.findById(req.body.orderId);
	if (order) {
		await order.remove();
		await db.disconnect();
		res.send({ message: "Order Deleted" });
	} else {
		await db.disconnect();
		res.status(404).send({ message: "Order Not Found" });
	}
};

export default deleteHandler;