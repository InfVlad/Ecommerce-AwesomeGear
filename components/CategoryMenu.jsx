import React from "react";
import { urlFor } from "../lib/client";
import {BsArrowRightCircle} from "react-icons/bs"

const MenuItem = ({ category, product: { image, price } }) => {
	return (
		<>
			<div className="category-menu-item">
                <div className="category-menu-text">Starting from</div>
                <div className="category-menu-lowest-price">$ {price}</div>
				<div className="category-menu-bg-text">{category}</div>
				<h1>{category}</h1>
                <div className="category-menu-button-container">
                <BsArrowRightCircle/>
                <div className="category-menu-button-text">BROWSE</div>
                </div>
				<img
					src={urlFor(image && image[0])}
					width={250}
					height={250}
					className="category-item-image"
					alt=""
				/>

			</div>
		</>
	);
};

const CategoryMenu = ({ categoryMenuItems }) => {
	// console.log(categoryMenuItems)
	return (
		<>
			<div className="category-menu-container">
				<MenuItem category={"Mouse"} product={categoryMenuItems[0]} />
				<MenuItem category={"Keyboard"} product={categoryMenuItems[1]} />
				<MenuItem category={"Headphones"} product={categoryMenuItems[2]} />
				<MenuItem category={"Mousepad"} product={categoryMenuItems[3]} />
			</div>
		</>
	);
};

export default CategoryMenu;
