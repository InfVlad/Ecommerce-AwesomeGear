import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";

const FooterBanner = ({
	footerBanner: {
		largeText1,
		largeText2,
		smallText,
		midText,
		buttonText,
		image,
		desc,
		slug
	},
}) => {
	return (
		<div className="footer-banner-container">
			<div className="banner-desc">
				<div className="left">
					<h3>{largeText1}</h3>
					<h3>{largeText2}</h3>
				</div>
				<div className="right">
					<p>{smallText}</p>
					<h3>{midText}</h3>
					<p>{desc}</p>
					<Link href={`/product/${slug.current}`}>
						<button type="button">{buttonText}</button>
					</Link>
				</div>
			</div>
				<img src={urlFor(image)} className="footer-banner-image" alt="" />
		</div>
	);
};

export default FooterBanner;
