# Ecommerce - Awesome Gear
![](public/assets/homepage.png)

Ecommerce website built with NextJs.

- Demo live: https://awesome-gear-shop.vercel.app/

## Features

- Registration
- Input validation on forms
- Authentication
- Protected routes
- Smooth animations
- Product data managed by Sanity (headless CMS)
- User and order data managed with MongoDB
- Checkout with Stripe
- User profile with order history
- Server Side Rendered homepage for better SEO
- Static Site Generated individual product pages for the fastest response
- Product filtering on shop page
- Light/Dark theme
- Responsive design

## Chrome lighthouse scores:
---
These are the scores of the test while using incognito mode:

![](public/assets/Lighthouse%20scores.png)

## Environment Variables
---
To run this project, you will need these environment variables on your .env:

`NEXT_PUBLIC_SANITY_TOKEN`

`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

`NEXT_PUBLIC_STRIPE_SECRET_KEY`

`NEXTAUTH_SECRET`

`MONGODB_URI`

First, run the development server:

```bash
npm install --legacy-peer-deps
# to avoid deps bugs

```
Next:
```bash
npm install -g @sanity/cli
cd sanity_ecommerce
npm install --legacy-peer-deps
sanity start
```
Open [http://localhost:3333](http://localhost:3333) with your browser to see the sanity studio where you can add the products.
You can find the images and data of the products i used in the assets folder

Then:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technologies used for this project:
---

* Next.js
* NextAuth.js
* Sanity
* MongoDB
* Framer Motion

## Deployment:
---
This project is deployed in Vercel, the DB is hosted using MongoDB Atlas