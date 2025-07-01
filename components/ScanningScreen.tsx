
import React, { useEffect } from 'react';

interface WifiIconProps {
  className?: string;
}

const WifiIcon: React.FC<WifiIconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
    <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
    <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
    <line x1="12" y1="20" x2="12.01" y2="20"></line>
  </svg>
);


interface ScanningScreenProps {
  onScanComplete?: () => void;
  mode: 'simulated' | 'real';
}

const ScanningScreen: React.FC<ScanningScreenProps> = ({ onScanComplete, mode }) => {
  useEffect(() => {
    if (mode === 'simulated' && onScanComplete) {
      const timer = setTimeout(() => {
        onScanComplete();
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [mode, onScanComplete]);

  const title = mode === 'simulated' ? 'Scanning for Merchants...' : 'Awaiting Device Selection...';
  const subtitle = mode === 'simulated' 
    ? 'Please wait while we detect nearby BLE beacons.'
    : 'Select your merchant from the browser dialog.';


  return (
    <div className="flex flex-col items-center justify-center text-center h-full animate-fade-in">
        <div className="relative flex items-center justify-center w-40 h-40">
            <div className="absolute w-full h-full bg-indigo-500/10 rounded-full animate-pulse"></div>
            <div className="absolute w-2/3 h-2/3 bg-indigo-500/20 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
             <WifiIcon className="w-16 h-16 text-indigo-400"/>
        </div>
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-8">{title}</h2>
      <p className="text-slate-500 dark:text-slate-400 mt-2">{subtitle}</p>
    </div>
  );
};

export default ScanningScreen;
