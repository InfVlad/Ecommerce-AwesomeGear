import React from "react";
import { client } from "../lib/client";
import { HeroBanner, FooterBanner, CategoryMenu } from "../components";

const Home = ({ bannerData, featuredItems, categoryMenuItems }) => {
	// console.log(categoryMenuItems);
	return (
		<>
			<HeroBanner heroBanner={bannerData.length && bannerData[0]} />
			<CategoryMenu categoryMenuItems={categoryMenuItems} />
			<FooterBanner footerBanner={bannerData && bannerData[0]} />
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

	const featuredItems = [keyboard, mouse, headset, mousePad];
	return {
		props: { bannerData, featuredItems, categoryMenuItems },
	};
};
export default Home;
