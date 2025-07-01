
import React from 'react';

interface TapIconProps {
  className?: string;
}

const TapIcon: React.FC<TapIconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 24a1 1 0 0 1-1-1V15a1 1 0 0 1 2 0v8a1 1 0 0 1-1 1z" />
    <path d="M11 24a1 1 0 0 1-1-1V15a1 1 0 0 1 2 0v8a1 1 0 0 1-1 1z" />
    <path d="M15 24a1 1 0 0 1-1-1V15a1 1 0 0 1 2 0v8a1 1 0 0 1-1 1z" />
    <path d="M9.33 13.3a1 1 0 0 1-.7-1.64l4-4.5a1 1 0 0 1 1.48 1.34l-4 4.5a1 1 0 0 1-.78.3z" />
    <path d="M17.5 14H10a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5zm-7.5-2H17.5a3.5 3.5 0 0 0 3.5-3.5v0A3.5 3.5 0 0 0 17.5 5H10v7z" />
    <path d="M5 13a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3a1 1 0 0 1 0 2H6v7a1 1 0 0 1-1 1z" />
  </svg>
);

interface InitialScreenProps {
  onSimulateGesture: () => void;
}

const InitialScreen: React.FC<InitialScreenProps> = ({ onSimulateGesture }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full animate-fade-in">
      <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">Ready to Pay?</h2>
      <p className="text-slate-500 dark:text-slate-400 mb-12 max-w-xs">
        Simulate a tap gesture to scan for nearby merchants using BLE technology.
      </p>
      <button
        onClick={onSimulateGesture}
        className="group relative flex items-center justify-center w-48 h-48 bg-slate-200 dark:bg-slate-700 rounded-full border-4 border-slate-300 dark:border-slate-600 hover:bg-indigo-500 hover:border-indigo-400 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
      >
        <span className="absolute h-full w-full rounded-full bg-indigo-500 opacity-0 group-hover:opacity-20 animate-ping-slow"></span>
        <TapIcon className="w-20 h-20 text-slate-500 dark:text-slate-400 group-hover:text-white transition-colors" />
      </button>
      <p className="mt-8 text-slate-600 dark:text-slate-400 font-semibold">Simulate Phone Tap Gesture</p>
      <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">(3-4 Times)</p>
    </div>
  );
};

export default InitialScreen;
