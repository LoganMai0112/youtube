/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from 'react-hook-form';
import { Link, redirect, useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

function Signup() {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm();
	const password = useRef();
	const [req, setReq] = useState({ status: true, message: null });
	password.current = watch('password', '');

	const onSubmit = async (user) => {
		await axios
			.post('signup', { user })
			.then(async (res) => {
				if (res.data.status.code === 200) {
					await localStorage.setItem('token', res.headers.get('Authorization'));
					navigate('/');
				}
				if (res.data.status.code === 409) {
					setReq({ status: false, message: res.data.status.message });
				}
			})
			.catch((err) => console.error(err));
	};
	return (
		<div className="w-full h-screen bg-purple-800 flex justify-center items-center">
			<div className="max-w-5xl w-full h-fit bg-gray-900 flex p-3 rounded-3xl">
				<div className="flex-1">
					<img
						className="h-full w-full rounded-2xl"
						src="./Mytube-1.png"
						alt="signup"
					/>
				</div>
				<div className="flex-1 flex flex-col items-center justify-center">
					<div className="w-72 flex flex-col">
						<p className="text-white decoration-2 text-3xl mb-10">
							Create an account
						</p>
						<form onSubmit={handleSubmit(onSubmit)}>
							<input
								className="mb-6 rounded-md border-2 text-md w-full border-main-color bg-sec-color px-2 h-10 focus:outline-none focus:border-main-color placeholder-text-color  text-main-color focus:invalid:border-red-800 focus:invalid:text-red-600"
								placeholder="Enter your email"
								type="email"
								{...register('email', {
									required: 'You must specify an email',
									pattern: {
										value: /[^\s@]+@[^\s@]+\.[^\s@]+/gi,
										message: 'Invalid email',
									},
								})}
								onChange={() => setReq({ status: true, message: null })}
							/>
							<input
								className="mb-6 rounded-md border-2 text-md w-full border-main-color bg-sec-color px-2 h-10 focus:outline-none focus:border-main-color placeholder-text-color  text-main-color focus:invalid:border-red-800 focus:invalid:text-red-600"
								type="password"
								placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
								{...register('password', {
									required: 'You must specify a password',
									minLength: {
										value: 8,
										message: 'Password must have at least 8 characters',
									},
								})}
							/>
							<input
								className="mb-6 rounded-md border-2 text-md w-full border-main-color bg-sec-color px-2 h-10 focus:outline-none focus:border-main-color placeholder-text-color  text-main-color focus:invalid:border-red-800 focus:invalid:text-red-600"
								type="password"
								placeholder="Repeat the password"
								{...register('password_confirmation', {
									validate: (value) =>
										value === password.current || 'Passwords do not match',
								})}
							/>
							{req.status === false && (
								<p className="text-red-700">{req.message}</p>
							)}
							{errors.email && (
								<p className="text-red-700">{errors.email.message}</p>
							)}
							{errors.password && (
								<span className="text-red-700">{errors.password.message}</span>
							)}
							{errors.password_confirmation && (
								<p className="text-red-700">
									{errors.password_confirmation.message}
								</p>
							)}
							<input
								className="mt-4 text-md w-full h-8 bg-main-color rounded-md mb-6 cursor-pointer"
								type="submit"
								value="Sign up"
							/>
						</form>
						<p className="w-full text-center text-white">
							Already have an account?{' '}
							<Link
								to="/login"
								className="text-main-color hover:underline cursor-pointer"
							>
								Login
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Signup;
