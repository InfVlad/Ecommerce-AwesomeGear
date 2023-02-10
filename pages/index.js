import React from "react";
import { client } from "../lib/client";
import Link from "next/link";
import dynamic from "next/dynamic"
import {
	HeroBanner,
	FooterBanner,
	CategoryMenu,
} from "../components";
import { BsArrowRightCircle } from "react-icons/bs";
import { motion } from "framer-motion";

const LazyFeaturedItems = dynamic(()=> import("../components/FeaturedItems"),{
	loading: () => "Loading..."
})

const Home = ({ bannerData, featuredItems, categoryMenuItems }) => {
	return (
		<>
			<HeroBanner heroBannerData={bannerData.length && bannerData} />
			<Link href={`/shop`}>
				<motion.div
					initial={{translateY:50, opacity: 0 }}
					transition={{ duration: 0.3, delay: 2.5 }}
					animate={{
						opacity: 1,
						translateY:0
					}}
					className="link-search-products-container"
				>
					<div className="checkout-products">Checkout our products!</div>
					<BsArrowRightCircle className="checkout-arrow-icon" />
				</motion.div>
			</Link>
			<CategoryMenu categoryMenuItems={categoryMenuItems} />
			<LazyFeaturedItems featuredItems={featuredItems} />
			<FooterBanner footerBanner={bannerData && bannerData[1]} />
		</>
	);
};

export const getServerSideProps = async () => {
	const bannerQuery = '*[_type == "banner"]';
	const bannerData = await client.fetch(bannerQuery);

	// Gonna use the cheapest item of each category for the menu category
	const keyboardPriceQuery =
		'*[_type == "product" && category == "keyboard"] | order(price asc) [0]';
	const keyboardLowestPrice = await client.fetch(keyboardPriceQuery);

	const mousePriceQuery =
		'*[_type == "product" && category == "mouse"] | order(price asc) [0]';
	const mouseLowestPrice = await client.fetch(mousePriceQuery);

	const headsetPriceQuery =
		'*[_type == "product" && category == "headset"] | order(price asc) [0]';
	const headsetLowestPrice = await client.fetch(headsetPriceQuery);

	const mousePadPriceQuery =
		'*[_type == "product" && category == "mouse pad"] | order(price asc) [0]';
	const mousePadLowestPrice = await client.fetch(mousePadPriceQuery);

	const categoryMenuItems = [
		mouseLowestPrice,
		keyboardLowestPrice,
		headsetLowestPrice,
		mousePadLowestPrice,
	];

	// setting arbitrary items as featured
	const keyboardQuery = '*[_type == "product" && category == "keyboard"][2]';
	const keyboard = await client.fetch(keyboardQuery);

	const mouseQuery = '*[_type == "product" && category == "mouse"][2]';
	const mouse = await client.fetch(mouseQuery);

	const headsetQuery = '*[_type == "product" && category == "headset"][2]';
	const headset = await client.fetch(headsetQuery);

	const mousePadQuery = '*[_type == "product" && category == "mouse pad"][2]';
	const mousePad = await client.fetch(mousePadQuery);

	const featuredItems = [mouse, keyboard, headset, mousePad];
	return {
		props: { bannerData, featuredItems, categoryMenuItems },
	};
};
export default Home;
