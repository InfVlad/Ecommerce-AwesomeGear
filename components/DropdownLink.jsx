import Link from "next/link";
import React from "react";

const DropdownLink = (props) => {
	let { ref, children, ...rest } = props;
	return (
		<Link href={ref}>
			<a {...rest}>{children}</a>
		</Link>
	);
};

export default DropdownLink;
