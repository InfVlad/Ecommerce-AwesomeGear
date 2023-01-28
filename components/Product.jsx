import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";
import { motion } from "framer-motion";

const Product = ({ product: { image, name, slug, price, manufacturer } }) => {
	return (
		<motion.div layout>
			<Link href={`/product/${slug.current}`}>
				<div className="product-card">
					<img
						src={urlFor(image && image[0])}
						width={250}
						height={250}
						className="product-image"
						alt=""
					/>
					<p className="product-name">{name}</p>
					<p className="product-manufacturer">{manufacturer}</p>
					<p className="product-price">${price}</p>
				</div>
			</Link>
		</motion.div>
	);
};

export default Product;
