import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";

const Login = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();
	const submitHandler = ({ email, password }) => {
		console.log(email, password);
	};
	return (
		<>
			<form
				action=""
				className="login-form-container"
				onSubmit={handleSubmit(submitHandler)}
			>
				<h1 className="login-form-top-text">Login</h1>
				<div className="login-email">
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
						className="email-input"
						id="email"
						autoFocus
					/>
					{errors.email && (
						<div style={{ color: "#dd6666" }}>{errors.email.message}</div>
					)}
				</div>
				<div className="login-password">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						className="password-input"
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
				<div className="login-button">
					<button className="login-btn">Login</button>
				</div>
				<div className="login-botton-text">
					Don&apos;t have an account? &nbsp;
					<Link href={"/register"} className="link">
						<a className="link">Register</a>
					</Link>
				</div>
			</form>
		</>
	);
};

export default Login;
