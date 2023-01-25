import Stripe from "stripe";
import { putData } from "../../lib/utils";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    
    try {
        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
                { shipping_rate: 'shr_1Lv1wQFzRgi0pLUVRjlviJbV'},
            ],
            line_items: req.body.cartItems.map(item => {
                const img = item.image[0].asset._ref;
                const newImage = img.replace("image-","https://cdn.sanity.io/images/y64aoq1q/production/").replace("-webp",".webp")
                const newItem = {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: item.name,
                            images: [newImage],
                        },
                        unit_amount: Math.floor(item.price * 100),
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1,
                    },
                    quantity: item.quantity,
                };
                return newItem;
            }),
            success_url: `${req.headers.origin}/success?status=success&orderid=${req.body.orderId}`,
            cancel_url: `${req.headers.origin}/?status=canceled&orderid=${req.body.orderId}`,
        }

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (error) {
      res.status(error.statusCode || 500).json(error.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}