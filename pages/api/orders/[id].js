import { getSession } from "next-auth/react";
import Order from "../../../models/Order";
import db from "../../../lib/db";

const handler = async (req, res) => {
	const session = await getSession({ req });
	if (!session) {
		return res.status(401).json({error:"Signin required"});
	}

	await db.connect();

	const order = await Order.findById(req.query.id);
	await db.disconnect();
	res.send(order);
};

export default handler;
