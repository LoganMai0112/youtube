import React from 'react';

function Login() {
	return (
		<div className="w-full h-screen bg-fuchsia-900 flex justify-center items-center">
			<div className="max-w-5xl w-full h-fit bg-gray-900 flex p-3 rounded-3xl">
				<div className="flex-1 flex flex-col items-center justify-center">
					<div>
						<p className="text-white decoration-2">Welcome back</p>
					</div>
				</div>
				<div className="flex-1">
					<img
						className="h-full w-full rounded-2xl"
						src="Mytube-login.jpeg"
						alt="login"
					/>
				</div>
			</div>
		</div>
	);
}

export default Login;
