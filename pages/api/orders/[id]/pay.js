import { getSession } from 'next-auth/react';
import Order from '../../../../models/Order';
import db from '../../../../lib/db';


const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({error:'Error: Signin required'});
  }

  await db.connect();
  try{
    const order = await Order.findById(req.body.orderId);
    console.log("stripe made the Call! trying to update order");
    if (order) {
      if (order.isPaid) {
        return res.status(400).json({ message: 'Error: order is already paid' });
      }
      order.isPaid = true;
      order.paidAt = Date.now();
      const paidOrder = await order.save();
      await db.disconnect();
      return res.json({ message: 'Order paid successfully', order: paidOrder });
    } else {
      await db.disconnect();
      return res.status(404).json({ message: 'Error: order not found' });
    }
  }catch(error){
    return res.status(500).json({error})
  }

};

export default handler;
