import confetti from "canvas-confetti";
import toast from "react-hot-toast";

export const getImage = (item) => {
	return item.image[0].asset._ref
		.replace("image-", "https://cdn.sanity.io/images/y64aoq1q/production/")
		.replace("-webp", ".webp");
};

export const getData = async (endpoint) => {
	const res = await fetch(endpoint);
	return res;
};

export const postData = async (endpoint, post) => {
	const res = await fetch(endpoint, {
		method: "POST",
		body: JSON.stringify(post),
		headers: {
			"Content-Type": "application/json",
		},
	});
	return res;
};



export const putData = async (endpoint, post) => {
	const res = await fetch(endpoint, {
		method: "PUT",
		body: JSON.stringify(post),
		headers: {
			"Content-Type": "application/json",
		},
	});
	return res;
}
export const deleteData = async (endpoint, post) => {
	const res = await fetch(endpoint, {
		method: "DELETE",
		body: JSON.stringify(post),
		headers: {
			"Content-Type": "application/json",
		},
	});
	return res;
}

export const paymentNotification = (paymentStatus, orderid) => {
	if (paymentStatus === "cancel") {
		toast.error("Payment Canceled!");
		toast(orderid);
	}
	if (paymentStatus === "success") {
		toast.success("Payment Successful!");
	}
};

export const runFireworks = () => {
	var duration = 5 * 1000;
	var animationEnd = Date.now() + duration;
	var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

	function randomInRange(min, max) {
		return Math.random() * (max - min) + min;
	}

	var interval = setInterval(function () {
		var timeLeft = animationEnd - Date.now();

		if (timeLeft <= 0) {
			return clearInterval(interval);
		}

		var particleCount = 50 * (timeLeft / duration);
		// since particles fall down, start a bit higher than random
		confetti(
			Object.assign({}, defaults, {
				particleCount,
				origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
			})
		);
		confetti(
			Object.assign({}, defaults, {
				particleCount,
				origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
			})
		);
	}, 250);
};
