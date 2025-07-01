
import React, { useState } from 'react';
import { Merchant } from '../types';

interface PaymentScreenProps {
  merchant: Merchant;
  onConfirmPayment: (amount: string) => void;
  onCancel: () => void;
}

const PaymentScreen: React.FC<PaymentScreenProps> = ({ merchant, onConfirmPayment, onCancel }) => {
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handlePayment = () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    if (pin.length < 4) {
      setError('PIN must be at least 4 digits.');
      return;
    }
    setError('');
    onConfirmPayment(numericAmount.toFixed(2));
  };

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Confirm Payment</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Paying <span className="font-semibold text-indigo-500 dark:text-indigo-300">{merchant.name}</span>
        </p>
        <p className="text-xs text-slate-400 dark:text-slate-500">{merchant.upiId}</p>
      </div>
      
      <div className="flex-grow space-y-6">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
            Enter Amount (USD)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 dark:text-slate-400">$</span>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-slate-100 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-lg pl-7 pr-4 py-3 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>
        </div>

        <div>
          <label htmlFor="pin" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
            Enter UPI PIN
          </label>
          <input
            type="password"
            id="pin"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            maxLength={6}
            className="w-full bg-slate-100 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-lg px-4 py-3 text-slate-800 dark:text-white tracking-[8px] text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            placeholder="••••"
          />
        </div>

        {error && <p className="text-sm text-red-500 dark:text-red-400 text-center">{error}</p>}
      </div>

      <div className="mt-6 flex flex-col space-y-3">
        <button
          onClick={handlePayment}
          disabled={!amount || pin.length < 4}
          className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-500 transition-all duration-200 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:text-slate-500 dark:disabled:text-slate-400 disabled:cursor-not-allowed transform hover:scale-105"
        >
          Pay Now
        </button>
        <button
          onClick={onCancel}
          className="w-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold py-3 px-4 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PaymentScreen;
