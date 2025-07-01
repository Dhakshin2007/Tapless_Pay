
import React from 'react';

interface CheckCircleIconProps {
  className?: string;
}

const CheckCircleIcon: React.FC<CheckCircleIconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm4.3 7.61-4.57 6a1 1 0 0 1-.79.39 1 1 0 0 1-.79-.38l-2.44-3.21a1 1 0 0 1 1.58-1.2l1.65 2.16 3.78-5a1 1 0 1 1 1.6 1.22z"></path>
    </svg>
);


interface SuccessScreenProps {
  merchantName: string;
  amount: string;
  onStartOver: () => void;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({ merchantName, amount, onStartOver }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full animate-fade-in">
      <CheckCircleIcon className="w-24 h-24 text-green-400 mb-6"/>
      <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Payment Successful!</h2>
      <p className="text-slate-500 dark:text-slate-400 mt-4 text-lg">
        You sent <span className="font-bold text-slate-900 dark:text-white">${amount}</span> to
      </p>
      <p className="font-semibold text-indigo-500 dark:text-indigo-300 text-lg">{merchantName}</p>
      
      <div className="w-full mt-12">
        <button
            onClick={onStartOver}
            className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-500 transition-all duration-200 transform hover:scale-105"
        >
            Make Another Payment
        </button>
      </div>
    </div>
  );
};

export default SuccessScreen;
