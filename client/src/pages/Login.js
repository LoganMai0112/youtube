/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiFillGithub, AiFillFacebook } from 'react-icons/ai';
import FacebookLogin from 'react-facebook-login';
import { useGoogleLogin } from '@react-oauth/google';

function Login() {
	const navigate = useNavigate();
	const [successLogin, setSuccessLogin] = useState(true);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (user) => {
		await axios
			.post('login', { user })
			.then(async (res) => {
				if (res.status === 200) {
					await localStorage.setItem('token', res.headers.get('Authorization'));
					await localStorage.setItem(
						'current_user',
						JSON.stringify(res.data.data)
					);
					navigate('/');
				}
			})
			.catch((err) => {
				setSuccessLogin(false);
			});
	};

	const responseFacebook = async (res) => {
		await axios
			.post('/auth/facebook/callback', { res })
			.then(async (response) => {
				if (response.data.code === '200') {
					await localStorage.setItem(
						'token',
						response.headers.get('Authorization')
					);
					await localStorage.setItem(
						'current_user',
						JSON.stringify(response.data.data)
					);
					navigate('/');
				} else if (response.data.code === '422') {
					navigate('/signup');
				}
			})
			.catch((err) => err);
	};

	const responseGoogle = useGoogleLogin({
		onSuccess: (codeResponse) => {
			axios
				.post('/auth/google_oauth2/callback', {
					code: codeResponse.code,
				})
				.then(async (res) => {
					if (res.data.code === '200') {
						await localStorage.setItem(
							'token',
							res.headers.get('Authorization')
						);
						await localStorage.setItem(
							'current_user',
							JSON.stringify(res.data.data)
						);
						navigate('/');
					}
				});
		},
		flow: 'auth-code',
	});
	return (
		<div className="w-full h-screen bg-purple-800 flex justify-center items-center">
			<div className="max-w-5xl w-full h-fit bg-gray-900 flex p-3 rounded-3xl">
				<div className="flex-1 flex flex-col items-center justify-center">
					<div className="w-72 flex flex-col">
						<p className="text-white decoration-2 text-3xl mb-10">
							Welcome back
						</p>
						<form onSubmit={handleSubmit(onSubmit)}>
							<input
								className="mb-6 rounded-md border-2 text-md w-full border-main-color bg-sec-color px-2 h-10 focus:outline-none focus:border-main-color placeholder-text-color  text-main-color focus:invalid:border-red-800 focus:invalid:text-red-600"
								placeholder="Enter your email"
								type="email"
								onChange={() => {
									setSuccessLogin(true);
								}}
								{...register('email', {
									required: 'You must specify an email',
									pattern: {
										value: /[^\s@]+@[^\s@]+\.[^\s@]+/gi,
										message: 'Invalid email',
									},
								})}
							/>
							<input
								className="mb-2 rounded-md border-2 text-md w-full border-main-color bg-sec-color px-2 h-10 focus:outline-none focus:border-main-color placeholder-text-color  text-main-color focus:invalid:border-red-800 focus:invalid:text-red-600"
								type="password"
								placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
								onChange={() => {
									setSuccessLogin(true);
								}}
								{...register('password', {
									required: 'You must specify a password',
									minLength: {
										value: 8,
										message: 'Password must have at least 8 characters',
									},
								})}
							/>
							{errors.email && (
								<p className="text-red-700">{errors.email.message}</p>
							)}
							{errors.password && (
								<p className="text-red-700">{errors.password.message}</p>
							)}
							{!successLogin && (
								<p className="text-red-700">Wrong email or password</p>
							)}
							<div className="w-full flex justify-end items-center mb-6">
								<a href className="text-white cursor-pointer hover:underline">
									Forgot password?
								</a>
							</div>
							<input
								className="text-md w-full h-8 bg-main-color rounded-md mb-6 cursor-pointer hover:bg-yellow-300 hover:ring hover:ring-yellow-500"
								type="submit"
								value="Login"
							/>
						</form>
						<div className="flex flex-col gap-2">
							<p className="w-full text-center text-white">
								Don&apos;t have an account?{' '}
								<Link
									to="/signup"
									className="text-main-color hover:underline cursor-pointer"
								>
									Sign up
								</Link>
							</p>
							{/* <button
                className="bg-[#24292e] flex justify-center items-center gap-1 h-10 w-full rounded-md text-white"
                type="submit"
                onClick={() => oauth('github')}
              >
                <AiFillGithub />
                Continue with Github
              </button>
              */}
							<FacebookLogin
								appId={783380446539231}
								fields="name, email, picture"
								scope="public_profile"
								cookie
								xfbml
								callback={responseFacebook}
								cssClass="bg-[#1877f2] flex justify-center items-center gap-1 h-10 w-full rounded-md text-white"
								icon={<AiFillFacebook />}
							/>
							<button
								className="bg-white flex justify-center items-center gap-1 h-10 w-full rounded-md text-color"
								type="submit"
								onClick={() => responseGoogle()}
							>
								<AiFillGithub />
								Continue with Google
							</button>
						</div>
					</div>
				</div>
				<div className="flex-1">
					<img
						className="h-full w-full rounded-2xl"
						src="./login.jpeg"
						alt="login"
					/>
				</div>
			</div>
		</div>
	);
}

export default Login;
