import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

const LoginPage = () => {
  const { logIn } = useAuthStore()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page refresh

    await logIn({
      email,
      password
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)] p-4">
      <div className="w-full max-w-md bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-fuchsia-500/30">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-violet-600">
            Welcome Back to Vault
          </span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition duration-150"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition duration-150"
              required
            />
          </div>

          <button
            type="submit"
            disabled={!email || !password}
            className="w-full py-3 px-4 bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-700 hover:to-violet-700 text-white font-semibold rounded-xl transition duration-300 shadow-lg hover:shadow-2xl shadow-fuchsia-500/40 disabled:opacity-50"
          >
            Log In to Vault
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?
          <Link
            to="/sign-up"
            className="text-fuchsia-400 pl-1 hover:text-fuchsia-300 font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;