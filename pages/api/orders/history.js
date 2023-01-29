import { getSession } from "next-auth/react";
import Order from "../../../models/Order";
import db from "../../../lib/db";

const handler = async (req, res) => {
	const session = await getSession({ req });
	if (!session) {
		return res.status(401).send({ message: "Signin required" });
	}
	const { user } = session;
	try {
		await db.connect();
		const orders = await Order.find({ user: user._id });
		res.send(orders);
	} catch (error) {

		return res.status(422).json({ error });
	}
};

export default handler;