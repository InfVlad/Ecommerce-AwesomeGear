import { getSession } from "next-auth/react";
import Order from "../../../../models/Order";
import db from "../../../../lib/db";

const handler = async (req, res) => {
	const session = await getSession({ req });
	if (!session) {
		return res.status(401).json({error:"Signin required"});
	}
	try{
		await db.connect();
	
		const order = await Order.findById(req.query.id);
		await db.disconnect();
		res.status(200).send(order);
	} catch (error){
		console.log(error)
		res.status(404).json({error})
	}
};


export default handler;
