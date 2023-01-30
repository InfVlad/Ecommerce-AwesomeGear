import React, { useState, useEffect } from "react";
import { client } from "../lib/client";
import { Product } from "../components";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
// import { useForm } from "react-hook-form";

const Shop = ({ products }) => {
	const router = useRouter();
	const [category, setCategory] = useState("All");
	const [manufacturer, setManufacturer] = useState("All");
	const [productsList, setProductsList] = useState(products);
	const [query, setQuery] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [sort, setSort] = useState("featured");

	const manufacturersList = ["All", "ASUS", "Logitech G", "Corsair"];
	const categoriesList = ["All", "Mouse pad", "Mouse", "Keyboard", "Headset"];

	useEffect(() => {
		if (!router.query.category) return;
		if (router.query.category === "Mousepad") {
			setCategory("Mouse pad");
		} else {
			setCategory(router.query.category);
		}
	}, [router.query.category]);

	const handleCategory = (e) => {
		setCategory(e.target.value);
	};
	const handleManufacturer = (e) => {
		setManufacturer(e.target.value);
	};
	const handleSort = (e) => {
		setSort(e.target.value);
	};
	const showFilterHandler = () => {
		setIsOpen((prev) => !prev);
		console.log(isOpen);
	};
	const sortProducts = (products, filter) => {
		//lets just say the original order is by "featured"
		//sort array method doesn't make a copy, it changes the array in place
		//normally i would make a deepcopy with JSON stringify and parse but in this case isn't needed
		if (filter === "featured") return products;
		if (filter === "low to high") {
			return products.sort((a, b) => a.price - b.price);
		}
		if (filter === "high to low") {
			return products.sort((a, b) => b.price - a.price);
		}
	};
	const filterProducts = (products) => {
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
		return updatedList;
	};
	useEffect(() => {
		let updatedList = filterProducts(products);
		updatedList = sortProducts(updatedList, sort);
		setProductsList(updatedList);
	}, [category, manufacturer, query, sort]);

	return (
		<div className="shop-container">
			<div className="products-heading">
				<h2>High Quality Products</h2>
			</div>
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
			<button className="btn show-filters-btn" onClick={showFilterHandler}>
				Show Filters
			</button>
			<div className="shop-products">
				<div
					className={"products-filters-container " + (isOpen ? "" : "closed")}
				>
					{
						<div className={"products-filters"}>
							<label htmlFor="Category" className="filter-label">
								Category
							</label>
							<select value={category} onChange={handleCategory}>
								{categoriesList.map((category, i) => {
									return (
										<option className="filter-option" value={category} key={i}>
											{category}
										</option>
									);
								})}
							</select>
							<label htmlFor="Manufacturer" className="filter-label">
								Manufacturer
							</label>
							<select value={manufacturer} onChange={handleManufacturer}>
								{manufacturersList.map((manufacturer, i) => {
									return (
										<option
											className="filter-option"
											value={manufacturer}
											key={i}
										>
											{manufacturer}
										</option>
									);
								})}
							</select>
							<label htmlFor="Sort Products" className="filter-label">
								Sort by
							</label>
							<select value={sort} onChange={handleSort}>
								<option className="filter-option" value={"featured"}>
									Featured
								</option>
								<option className="filter-option" value={"low to high"}>
									Price: Low to High
								</option>
								<option className="filter-option" value={"high to low"}>
									Price: High to Low
								</option>
							</select>
						</div>
					}
				</div>

				<motion.div
					layout
					transition={{ duration: 0.3 }}
					className={"products-container " + (isOpen ? "" : "closed")}
				>
					<AnimatePresence>
						{productsList?.map((product) => (
							<Product key={product._id} product={product} />
						))}
					</AnimatePresence>
				</motion.div>
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
