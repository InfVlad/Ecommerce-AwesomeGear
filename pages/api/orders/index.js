import { getSession } from 'next-auth/react';
import Order from '../../../models/Order';
import db from '../../../lib/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({
        error: "Signin required",
    });
  } 

  const { user } = session;
  await db.connect();
  const newOrder = new Order({
    ...req.body,
    user: user._id,
  });

  const order = await newOrder.save();
  return res.status(201).json({msg : "Order created successfully", order});
};
export default handler;