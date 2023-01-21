import React from "react";
import { AiFillGithub, AiOutlineYoutube } from "react-icons/ai";

const Footer = () => {
	return (
		<div className="footer-container">
			<p>Site made by Vladimir Infante</p>
			<p>© 2023 Awesome Gear. All rights reserved</p>
			<p className="icons">
				<a
					href="https://github.com/SpicyArepa"
					target="_blank"
					rel="noopener noreferrer"
				>
					<AiFillGithub />
				</a>
				<a
					href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
					target="_blank"
					rel="noopener noreferrer"
				>
					<AiOutlineYoutube />
				</a>
			</p>
		</div>
	);
};

export default Footer;
