import React from "react";
import { AiFillGithub } from "react-icons/ai";

const Footer = () => {
	return (
		<div className="footer-container">
			<p>Site made by Vladimir Infante</p>
			<p>Copyright © 2023 Awesome Gear. All rights reserved</p>
			<p className="icons">
				<a
					href="https://github.com/InfVlad"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="If you wanna know more about the developer checkout the github page"
				>
					<AiFillGithub />
				</a>
			</p>
		</div>
	);
};

export default Footer;
