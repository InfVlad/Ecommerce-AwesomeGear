import React from "react";
import { client } from "../lib/client";
import {  Product } from "../components";



const Shop = ({products}) => {
	return (
		<div>
			<div className="products-heading">
				<h2>High Quality Products</h2>
			</div>

			<div className="products-container">
				{products?.map((product) => (
					<Product key={product._id} product={product} />
				))}
			</div>
		</div>
	);
};

export const getServerSideProps = async () => {
	const query = '*[_type == "product"]';
	const products = await client.fetch(query);


	return {
		props: { products },
	};
};
export default Shop;
