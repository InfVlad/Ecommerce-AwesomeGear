import React, { useEffect } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import getError from "../lib/error";
import { useStateContext } from "../context/StateContext";
import { postData } from "../lib/utils";

const Register = () => {
	const { data: session } = useSession();

	const router = useRouter();
	const { redirect } = router.query;
	const { inCheckoutProcess, setInCheckoutProcess } = useStateContext();

	useEffect(() => {
		if (session?.user) {
			if (!inCheckoutProcess) {
				router.push(redirect || "/");
			} else {
				setInCheckoutProcess(false);
				router.push(redirect || "/checkout");
			}
		}
	}, [router, session, redirect]);
	const {
		handleSubmit,
		register,
		getValues,
		formState: { errors },
	} = useForm();

	const submitHandler = async ({ name, email, password }) => {
		const userData = {
			name,
			email,
			password,
		};
		try {
			const res = await postData("/api/auth/signup",userData);
			const data = await res.json();
			if(res.error){
			toast.error(res.error)
			return;
			} else {
				toast.success(data.msg)
			}
		} catch (error) {
			toast.error(getError(error));
			return;
		}
		try {
			const result = await signIn("credentials", {
				redirect: false,
				email,
				password,
			});
			if (result.error) {
				toast.error(result.error);
			}
		} catch (error) {
			toast.error(getError(error));
		}
	};
	return (
		<>
			<form
				action=""
				className="login-form-container"
				onSubmit={handleSubmit(submitHandler)}
			>
				<h1 className="register-form-top-text">Register</h1>
				<div className="register-input-item">
					<label htmlFor="name">Name</label>
					<input
						type="name"
						{...register("name", {
							required: "Please enter name",
						})}
						className="register-input"
						id="name"
						autoFocus
					/>
					{errors.name && (
						<div style={{ color: "#dd6666" }}>{errors.name.message}</div>
					)}
				</div>
				<div className="register-input-item">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						{...register("email", {
							required: "Please enter email",
							pattern: {
								value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
								message: "Please enter valid email",
							},
						})}
						className="register-input"
						id="email"
						autoFocus
					/>
					{errors.email && (
						<div style={{ color: "#dd6666" }}>{errors.email.message}</div>
					)}
				</div>
				<div className="register-input-item">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						className="register-input"
						{...register("password", {
							required: "Please enter password",
							minLength: {
								value: 6,
								message: "Password requires 6 characters minimum",
							},
						})}
						id="password"
						autoFocus
					/>
					{errors.password && (
						<div style={{ color: "#dd6666" }}>{errors.password.message}</div>
					)}
				</div>
				<div className="register-input-item">
					<label htmlFor="password">Confirm Password</label>
					<input
						type="password"
						className="register-input"
						{...register("confirmPassword", {
							required: "Please enter confirm password",
							validate: (value) => value === getValues("password"),
							minLength: {
								value: 6,
								message: "Password requires 6 characters minimum",
							},
						})}
						id="password"
						autoFocus
					/>
					{errors.confirmPassword && (
						<div style={{ color: "#dd6666" }}>
							{errors.confirmPassword.message}
						</div>
					)}
					{errors.confirmPassword &&
						errors.confirmPassword.type === "validate" && (
							<div style={{ color: "#dd6666" }}>Passwords do not match</div>
						)}
				</div>
				<div className="login-button">
					<button className="login-btn">Register</button>
				</div>
				<div className="login-botton-text">
					Already have an account? &nbsp;
					<Link href={"/login"} className="link">
						<a className="link">Login</a>
					</Link>
				</div>
			</form>
		</>
	);
};

export default Register;
