import { getSession } from "next-auth/react";
import User from "../../../models/User";
import db from "../../../lib/db";

async function handler(req, res) {
	if (req.method !== "PUT") {
		return res.status(400).send({ message: `${req.method} not supported` });
	}

	const session = await getSession({ req });
	if (!session) {
		return res.status(401).send({ message: "Signin required" });
	}

	const { user } = session;
	const { name } = req.body;

	if (!name) {
		res.status(422).json({
			message: "Validation error",
		});
		return;
	}

	await db.connect();
	const toUpdateUser = await User.findById(user._id);
	toUpdateUser.name = name;

	await toUpdateUser.save();
	await db.disconnect();
	res.send({
		message: "User updated",
	});
	
}

export default handler;
