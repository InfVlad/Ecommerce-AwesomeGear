import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { FaUser } from "react-icons/fa";

const HamburgerMenu = ({ logoutClickHandler }) => {
	const { status, data: session } = useSession();

	return (
		<div className="navbar-hamburger-menu-wrapper">
			<div className="navbar-hamburger-menu-items">
				{session?.user ? (
					<>
						<div className="hamburger-menu-user">
							<div className="user-icon">
								<FaUser className="fa-icon" />
							</div>
							<div className="hamburger-menu-user-name">
								{session.user.name}
							</div>
						</div>
						<Link href="/profile">
							<div className="hamburger-menu-item">Profile</div>
						</Link>
					</>
				) : (
					<Link href="/login">
						<div className="hamburger-menu-item">Login</div>
					</Link>
				)}
				<div className="hamburger-separator"></div>

				<Link href={`/shop?category=Mouse`}>
					<div className="hamburger-menu-item">Mice</div>
				</Link>
				<Link href={`/shop?category=Keyboard`}>
					<div className="hamburger-menu-item">Keyboards</div>
				</Link>
				<Link href={`/shop?category=Headset`}>
					<div className="hamburger-menu-item">Headsets</div>
				</Link>
				<Link href={`/shop?category=Mousepad`}>
					<div className="hamburger-menu-item">Mouse pads</div>
				</Link>
				{session?.user ? (
					<>
						<div className="hamburger-separator"></div>
						<div className="hamburger-menu-item" onClick={logoutClickHandler}>
							Logout
						</div>
					</>
				) : null}
			</div>
		</div>
	);
};

export default HamburgerMenu;
