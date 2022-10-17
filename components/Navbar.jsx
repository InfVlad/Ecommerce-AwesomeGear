import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <p>
        <Link href={"/"}>JSM Headphones</Link>
      </p>
    </div>
  )
};

export default Navbar;
