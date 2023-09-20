



import React, { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [typeLogin, setTypeLogin] = useState(true);

  const handleLogin = () => {
    // Add your login logic here
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white rounded-xl py-16 px-8">
        <div>
          <div className="flex justify-between mb-8 border border-transparent text-sm font-semibold border-gray-200 rounded-3xl">
            <button
              type="submit"
              onClick={() => setTypeLogin(true)}
              className={
                typeLogin
                  ? "p-4 w-full bg-yellow-400 rounded-3xl shadow"
                  : "p-4 w-full text-gray-500"
              }
            >
              Log in
            </button>
            <button
              type="submit"
              onClick={() => setTypeLogin(false)}
              className={
                typeLogin
                  ? "p-4 w-full text-gray-500"
                  : "p-4 w-full bg-yellow-400 rounded-3xl shadow"
              }
            >
              Create Account
            </button>
          </div>
          <h2 className="font-google2 mt-0 text-center text-xl font-extrabold text-gray-900">
            {typeLogin ? "Log in to your account" : "Create an account"}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label
                                htmlFor="remember-me"
                                className="ml-2 block text-sm text-gray-900"
                            >
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a
                                href="#"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-semibold font-google2 rounded-xl text-black bg-yellow-400 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                        >
                            Log in
                        </button>
                    </div>
                </form>
      </div>
    </div>
  );
};

export default LoginPage;
