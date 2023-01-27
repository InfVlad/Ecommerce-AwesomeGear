import bcryptjs from "bcryptjs";
import User from "../../../models/User";
import db from "../../../lib/db";

const handler = async (req, res) => {
	if (req.method !== "POST") {
		return res.status(405).send({ message: `${req.method} not supported` });
	}
	const { name, email, password } = req.body;
	if (
		!name ||
		!email ||
		!email.includes("@") ||
		!password ||
		password.trim().length < 5
	) {
		return res.status(422).json({
		error: "Validation error",
	});
		
	}

	await db.connect();

	const existingUser = await User.findOne({ email: email });
	if (existingUser) {
    await db.disconnect();
		res.status(422).json({ error: "User already exists!" });
		return;
	}
	try{

		const newUser = new User({
			name,
			email,
			password: bcryptjs.hashSync(password),
			isAdmin: false,
		});
	
		await newUser.save();
		await db.disconnect();
	} catch(error){
		res.status(422).json({error})
		return 
	}
	res.status(201).json({
		msg: "Created user!",
  });
  return;
};

export default handler;
