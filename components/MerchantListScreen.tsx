
import React from 'react';
import { Merchant } from '../types';

interface StoreIconProps { className?: string; }
const StoreIcon: React.FC<StoreIconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M21.82 5.59a1 1 0 0 0-.82-.59H3a1 1 0 0 0-.82.59l-2 4A1 1 0 0 0 1 11v8a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2v-8a1 1 0 0 0-.18-.59zM12 18H4v-5h8zm0-7H3.33L4.6 7h7.4zM20 18h-6v-7h6z"></path></svg>
);

interface SignalIconProps { className?: string; }
const SignalIcon: React.FC<SignalIconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M5.54 21a1 1 0 0 1-1-1.74 12.08 12.08 0 0 1 21-1.85 1 1 0 0 1-2 0 10 10 0 0 0-17.15 1.55 1 1 0 0 1-1.85.2z"></path><path d="M5.54 16a1 1 0 0 1-.85-1.52A8.11 8.11 0 0 1 12 11.2a8.11 8.11 0 0 1 7.31 3.28 1 1 0 1 1-1.7 1A6.11 6.11 0 0 0 12 13.2a6.11 6.11 0 0 0-5.46 2.48 1 1 0 0 1-.85.32z"></path><path d="M12 11.2a4.2 4.2 0 0 1 3.16 1.34 1 1 0 1 1-1.52 1.3A2.2 2.2 0 0 0 12 12.2a2.2 2.2 0 0 0-1.64.64 1 1 0 1 1-1.52-1.3A4.2 4.2 0 0 1 12 11.2z"></path><path d="M12 21a1 1 0 0 1 0-2 1 1 0 0 1 0 2z"></path></svg>
);


interface MerchantListScreenProps {
  merchants: Merchant[];
  onSelectMerchant: (merchant: Merchant) => void;
  onRestart: () => void;
}

const MerchantListScreen: React.FC<MerchantListScreenProps> = ({ merchants, onSelectMerchant, onRestart }) => {
  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Merchants Found</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Select a merchant to begin payment.</p>
      </div>
      <div className="flex-grow overflow-y-auto pr-2 space-y-3">
        {merchants.map((merchant) => (
          <button
            key={merchant.id}
            onClick={() => onSelectMerchant(merchant)}
            className="w-full flex items-center p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg text-left hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <div className="p-3 bg-slate-200 dark:bg-slate-600 rounded-lg mr-4">
                <StoreIcon className="w-6 h-6 text-indigo-500 dark:text-indigo-300" />
            </div>
            <div className="flex-grow">
              <h3 className="font-bold text-slate-800 dark:text-slate-100">{merchant.name}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Tap to pay</p>
            </div>
            <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                <SignalIcon className="w-4 h-4 mr-1 text-green-500 dark:text-green-400"/>
                <span>{merchant.rssi}dBm</span>
            </div>
          </button>
        ))}
      </div>
       <div className="mt-6 text-center">
            <button
                onClick={onRestart}
                className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
            >
                Scan Again
            </button>
        </div>
    </div>
  );
};

export default MerchantListScreen;
