import Order from '../../models/Order';
import data from '../../lib/data';
import db from '../../lib/db';

const handler = async (req, res) => {
  await db.connect();
  await Order.deleteMany();
  await db.disconnect();
  res.send({ message: 'seeded successfully' });
};
export default handler;