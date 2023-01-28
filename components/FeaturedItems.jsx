import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";
import { BsArrowRightCircle } from "react-icons/bs";
import { motion } from "framer-motion";

const Item = ({
	product: { image, name, slug, price, manufacturer },
	rotate = false,
}) => {
	return (
		<div>
			<Link href={`/product/${slug.current}`}>
				<div className="featured-product-card">
					<img
						src={urlFor(image && image[0])}
						width={250}
						height={250}
						className={
							rotate
								? "featured-product-image rotate"
								: "featured-product-image"
						}
						alt=""
					/>
					<p className="featured-product-name">{name}</p>
					<p className="featured-product-manufacturer">{manufacturer}</p>
					<p className="featured-product-price">${price}</p>
					<div className="featured-product-button-container">
						<BsArrowRightCircle className="featured-arrow-icon" />
						<div className="featured-product-button-text">Buy Now!</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

const FeaturedItems = ({ featuredItems }) => {
	return (
		<motion.div
			initial={{ opacity: 0, translateY: 50 }}
			transition={{ duration: 0.4, delay: 0.4 }}
			whileInView={{ translateY: 0, opacity: 1 }}
			className="featured-items-container"
		>
			<div className="featured-top-text">Featured Gears:</div>
			<div className="featured-bg-text">FEATURED</div>
			<Item product={featuredItems[0]} />
			<Item product={featuredItems[1]} rotate={true} />
			<Item product={featuredItems[2]} />
			<Item product={featuredItems[3]} rotate={true} />
		</motion.div>
	);
};

export default FeaturedItems;
