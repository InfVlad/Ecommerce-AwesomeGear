import Link from "next/link";
import React, { useState, useEffect } from "react";
import { urlFor } from "../lib/client";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const HeroBanner = ({ heroBannerData }) => {
	const [heroItem, setHeroItem] = useState(0);

	const heroBannerUpdate = (action) => {
		if (action === "right") {
			if (heroItem === 2) {
				setHeroItem(0);
			} else {
				setHeroItem((prev) => prev + 1);
			}
		}
		if (action === "left") {
			if (heroItem === 0) {
				setHeroItem(2);
			} else {
				setHeroItem((prev) => prev - 1);
			}
		}
	};

	const heroBanner = heroBannerData[heroItem];
	return (
		<div className="hero-banner-container">
			<div>
				<p className="top-small-text">{heroBanner.smallText}</p>
				<h3>{heroBanner.midText}</h3>
				<h1>{heroBanner.largeText1}</h1>
				<p className="old-price">${heroBanner.oldPrice}</p>
				<p className="new-price">${heroBanner.price}</p>
				<img
					src={urlFor(heroBanner.image)}
					alt="best sellers"
					className={"hero-banner-image"}
				/>
				<div>
					<Link href={`/product/${heroBanner.slug.current}`}>
						<button type="button">{heroBanner.buttonText}</button>
					</Link>
					<div className="hero-product-name">{heroBanner.product}</div>
					<FaChevronRight
						className="right-icon"
						onClick={() => heroBannerUpdate("right")}
					/>
					<FaChevronLeft
						className="left-icon"
						onClick={() => heroBannerUpdate("left")}
					/>
					<div className="desc">
						<h5>Description</h5>
						<p>{heroBanner.desc}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeroBanner;
