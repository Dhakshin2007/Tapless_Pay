
import React, { useState } from 'react';

interface RegisterScreenProps {
  onRegister: (name: string, email: string, pass: string) => boolean;
  onSwitchToLogin: () => void;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ onRegister, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }
     if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    const success = onRegister(name, email, password);
    if (!success) {
      setError('An account with this email already exists.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">Create Account</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-8">Get started with BLE Pay.</p>
      
      <form onSubmit={handleRegister} className="w-full space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Alex Doe"
            className="w-full bg-slate-100 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-lg px-4 py-3 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>
        <div>
          <label htmlFor="email-reg" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email-reg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full bg-slate-100 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-lg px-4 py-3 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>
        <div>
          <label htmlFor="password-reg" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password-reg"
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
          Sign Up
        </button>
      </form>

      <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
        Already have an account?{' '}
        <button onClick={onSwitchToLogin} className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
          Log In
        </button>
      </p>
    </div>
  );
};

export default RegisterScreen;
