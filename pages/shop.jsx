import React, { useState, useEffect } from "react";
import { client } from "../lib/client";
import { Product } from "../components";
import { useRouter } from "next/router";
// import { useForm } from "react-hook-form";

const Shop = ({ products }) => {
	const manufacturersList = ["All", "ASUS", "Logitech G", "Corsair"];
	const categoriesList = ["All", "Mouse pad", "Mouse", "Keyboard", "Headset"];

	const router = useRouter();
	const [category, setCategory] = useState("All");
	const [manufacturer, setManufacturer] = useState("All");
	const [productsList, setProductsList] = useState(products);
	const [query, setQuery] = useState("");

	useEffect(() => {
		if (!router.query.category) return;
		if (router.query.category === "Mousepad") {
			setCategory("Mouse pad");
		} else {
			setCategory(router.query.category);
		}
	}, []);

	const handleCategory = (e) => {
		setCategory(e.target.value);
	};
	const handleManufacturer = (e) => {
		setManufacturer(e.target.value);
	};
	useEffect(() => {
		let updatedList = [...products];
		if (query.length > 0) {
			updatedList = updatedList.filter((product) =>
				product.name.toLowerCase().includes(query.toLowerCase())
			);
		}
		if (category !== "All") {
			updatedList = updatedList.filter(
				(product) => product.category === category.toLowerCase()
			);
		}
		if (manufacturer !== "All") {
			updatedList = updatedList.filter(
				(product) => product.manufacturer === manufacturer
			);
		}
		setProductsList(updatedList)
	}, [category, manufacturer, query]);

	const logStuff = () => {
		console.log("Manufacturers", manufacturersList);

		console.log("Categories", categoriesList);
		console.log(category);
		console.log(manufacturer);
	};

	return (
		<div className="shop-container">
			<div className="products-heading">
				<h2>High Quality Products</h2>
			</div>
			<button onClick={logStuff}>Log Stuff</button>
			<label htmlFor="Query" className="search-label">
				Search products
			</label>
			<input
				type="text"
				className="products-search"
				onChange={(e) => {
					setQuery(e.target.value);
				}}
				autoFocus
			/>
			<div className="shop-products">
				<div className="products-filters">
					<label htmlFor="Category">Category</label>
					<select value={category} onChange={handleCategory}>
						{categoriesList.map((category, i) => {
							return (
								<option value={category} key={i}>
									{category}
								</option>
							);
						})}
					</select>
					<label htmlFor="Manufacturer">Manufacturer</label>
					<select value={manufacturer} onChange={handleManufacturer}>
						{manufacturersList.map((manufacturer, i) => {
							return (
								<option value={manufacturer} key={i}>
									{manufacturer}
								</option>
							);
						})}
					</select>
				</div>
				<div className="products-container">
					{productsList?.map((product) => (
						<Product key={product._id} product={product} />
					))}
				</div>
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
