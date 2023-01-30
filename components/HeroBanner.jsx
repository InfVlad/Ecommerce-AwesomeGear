import Link from "next/link";
import React, { useState, useEffect } from "react";
import { urlFor } from "../lib/client";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const HeroBanner = ({ heroBannerData }) => {
	const [heroItem, setHeroItem] = useState(0);
	const [direction, setDirection] = useState(1);

	const heroBannerUpdate = (action) => {
		if (action === "right") {
			if (direction !== 1) {
				setDirection((prev) => prev * -1);
			}
			if (heroItem === 2) {
				setHeroItem(0);
			} else {
				setHeroItem((prev) => prev + 1);
			}
		}
		if (action === "left") {
			if (direction === 1) {
				setDirection((prev) => prev * -1);
			}
			if (heroItem === 0) {
				setHeroItem(2);
			} else {
				setHeroItem((prev) => prev - 1);
			}
		}
	};
	//i being the order of animation
	const imageAnimation = (i) => {
		return {
			initial: { translateX: -50 * direction, opacity: 0 },
			animate: { translateX: 0, opacity: 1 },
			transition: { duration: 0.6, delay: 1+ 0.55 * i },
			exit: {
				translateX: 50 * direction,
				opacity: 0,
				transition: { duration: 0.1, delay: 0.3},
			},
		};
	};
	const leftSidAnimation = (initialMovement, i) => {
		
		return {
			initial: { translateX: -50 * initialMovement, opacity: 0 },
			animate: { translateX: 0, opacity: 1 },
			transition: { duration: 0.45, delay: 1.1 + 0.25* i },
			exit: {
				translateX: 50,
				opacity: 0,
				transition: { duration: 0.1, delay: 0.2 },
			},
		};
	};
	//im actually using this one for the image, the product name and description
	const rightSideAnimation = (i) => {
		return {
			initial: {  opacity: 0 },
			animate: { opacity: 1 },
			transition: { duration: 0.55, delay: 1.5 +  0.2* i },
		};
	};

	const heroBanner = heroBannerData[heroItem];
	return (
		<div className="hero-banner-container">
			<div>
				<AnimatePresence>
					<motion.p
						key={heroBanner.smallText + heroItem.toString()}
						{...leftSidAnimation(1, 1)}
						className="top-small-text"
					>
						{heroBanner.smallText}
					</motion.p>
					<motion.h3
						{...leftSidAnimation(1, 2)}
						key={heroBanner.midText + heroItem.toString()}
					>
						{heroBanner.midText}
					</motion.h3>
					<motion.h1
						{...leftSidAnimation(6, 3)}
						key={heroBanner.largeText1 + heroItem.toString()}
					>
						{heroBanner.largeText1}
					</motion.h1>
					<motion.p
						className="old-price"
						{...leftSidAnimation(1, 3)}
						key={heroBanner.oldPrice + heroItem.toString()}
					>
						${heroBanner.oldPrice}
					</motion.p>
					<motion.p
						className="new-price"
						{...leftSidAnimation(1, 3)}
						key={heroBanner.price + heroItem.toString()}
					>
						${heroBanner.price}
					</motion.p>

					<motion.img
						src={urlFor(heroBanner.image)}
						alt="best sellers"
						key={urlFor(heroBanner.image)}
						{...imageAnimation(1)}
						className={"hero-banner-image"}
					/>
				</AnimatePresence>

				<div>
					<AnimatePresence>
						<Link href={`/product/${heroBanner.slug.current}`}>
							<motion.button
								{...leftSidAnimation(1, 3)}
								key={heroBanner.buttonText + heroItem.toString() + "K"}
								type="button"
							>
								{heroBanner.buttonText}
							</motion.button>
						</Link>
						<motion.div
							className="hero-product-name"
							{...imageAnimation(2)}
							key={heroBanner.product + heroItem.toString() + "F"}
						>
							{heroBanner.product}
						</motion.div>
					</AnimatePresence>

					<motion.div {...rightSideAnimation(2)}>
						<FaChevronRight
							className="right-icon"
							onClick={() => heroBannerUpdate("right")}
						/>
						<FaChevronLeft
							className="left-icon"
							onClick={() => heroBannerUpdate("left")}
						/>
					</motion.div>
					<AnimatePresence>
						<motion.div
							{...imageAnimation(2)}
							key={heroBanner.desc + heroItem.toString() + "S"}
							className="desc"
						>
							<h5>Description</h5>
							<p>{heroBanner.desc}</p>
						</motion.div>
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
};

export default HeroBanner;
