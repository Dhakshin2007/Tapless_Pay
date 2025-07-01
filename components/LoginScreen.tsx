
import React, { useState } from 'react';

interface LoginScreenProps {
  onLogin: (email: string, pass: string) => boolean;
  onSwitchToRegister: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    const success = onLogin(email, password);
    if (!success) {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">Welcome Back</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-8">Log in to continue with BLE Pay.</p>
      
      <form onSubmit={handleLogin} className="w-full space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full bg-slate-100 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-lg px-4 py-3 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>

        <div>
          <label htmlFor="password"className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-100 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-lg px-4 py-3 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>

        {error && <p className="text-sm text-red-500 dark:text-red-400 text-center">{error}</p>}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-500 transition-all duration-200 disabled:bg-slate-600 transform hover:scale-105"
        >
          Log In
        </button>
      </form>

      <p className="mt-8 text-sm text-slate-500 dark:text-slate-400">
        Don't have an account?{' '}
        <button onClick={onSwitchToRegister} className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default LoginScreen;
