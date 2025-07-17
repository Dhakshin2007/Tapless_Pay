
import React, { useState, useCallback, useEffect } from 'react';
import { AppState, Merchant, User } from './types';
import { MOCK_MERCHANTS } from './constants';
import InitialScreen from './components/InitialScreen';
import ScanningScreen from './components/ScanningScreen';
import MerchantListScreen from './components/MerchantListScreen';
import PaymentScreen from './components/PaymentScreen';
import SuccessScreen from './components/SuccessScreen';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import ProfileScreen from './components/ProfileScreen';
import { SpeedInsights } from "@vercel/speed-insights/react" 


type View = 'login' | 'register' | 'app' | 'profile';
type Theme = 'light' | 'dark';

const ProfileIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><path d="M12 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm0-4a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"/><path d="M12 13.5c-2.1 0-4.1.8-4.1 2.5V17a1 1 0 0 0 2 0v-.5c0-.8 1.1-1.5 2.1-1.5s2.1.7 2.1 1.5V17a1 1 0 0 0 2 0v-1c0-1.7-2-2.5-4.1-2.5z"/></svg>
);


const App: React.FC = () => {
  // Global App State
  const [view, setView] = useState<View>('login');
  const [theme, setTheme] = useState<Theme>('dark');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  // Payment Flow State
  const [currentScreen, setCurrentScreen] = useState<AppState>(AppState.INITIAL);
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<string>('');
  const [isRealBleMode, setIsRealBleMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // --- Effects for Initialization and Persistence ---
  useEffect(() => {
    const loadInitialData = async () => {
        // Load users from localStorage or fetch from file
        const storedUsers = localStorage.getItem('ble-pay-users');
        if (storedUsers) {
            setUsers(JSON.parse(storedUsers));
        } else {
            try {
                const response = await fetch('./users.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const initialUsers = await response.json();
                setUsers(initialUsers);
                localStorage.setItem('ble-pay-users', JSON.stringify(initialUsers));
            } catch (error) {
                console.error("Failed to load initial user data from users.json:", error);
                setUsers([]); // Fallback to an empty array if fetch fails
            }
        }

        // Check for logged-in user
        const loggedInUser = localStorage.getItem('ble-pay-currentUser');
        if (loggedInUser) {
            setCurrentUser(JSON.parse(loggedInUser));
            setView('app');
        }
        
        // Check for saved theme
        const savedTheme = localStorage.getItem('ble-pay-theme') as Theme;
        if (savedTheme) {
            setTheme(savedTheme);
        }
    };
    
    loadInitialData();
  }, []);
  
  useEffect(() => {
    // Apply theme to HTML element
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('ble-pay-theme', theme);
  }, [theme]);


  // --- Auth Handlers ---
  const handleLogin = (email: string, pass: string): boolean => {
    const user = users.find(u => u.email === email && u.password === pass);
    if (user) {
      const userToStore = { ...user };
      delete userToStore.password; // Don't store password in currentUser state/storage
      setCurrentUser(userToStore);
      localStorage.setItem('ble-pay-currentUser', JSON.stringify(userToStore));
      setView('app');
      return true;
    }
    return false;
  };

  const handleRegister = (name: string, email: string, pass: string): boolean => {
    if (users.some(u => u.email === email)) {
      return false; // User already exists
    }
    const newUser: User = { 
      id: `user-${Date.now()}`, 
      name, 
      email, 
      password: pass,
      profilePicture: `https://i.pravatar.cc/150?u=${email}`
    };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('ble-pay-users', JSON.stringify(updatedUsers));
    
    const userToStore = { ...newUser };
    delete userToStore.password;
    setCurrentUser(userToStore);
    localStorage.setItem('ble-pay-currentUser', JSON.stringify(userToStore));
    setView('app');
    return true;
  };
  
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('ble-pay-currentUser');
    setView('login');
    // Reset payment flow state
    setCurrentScreen(AppState.INITIAL);
    setSelectedMerchant(null);
  };
  
  const handleUpdateProfile = (updatedUser: User) => {
    if (!currentUser) return;
    const userToStore = { ...currentUser, ...updatedUser };
    setCurrentUser(userToStore);
    localStorage.setItem('ble-pay-currentUser', JSON.stringify(userToStore));

    // Also update the main users list
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        const newUsers = [...users];
        newUsers[userIndex] = { ...newUsers[userIndex], ...updatedUser };
        setUsers(newUsers);
        localStorage.setItem('ble-pay-users', JSON.stringify(newUsers));
    }

    setView('app');
};


  // --- Payment Flow Handlers ---
  const handleSimulatedGesture = useCallback(() => {
    setErrorMessage('');
    setCurrentScreen(AppState.SCANNING);
  }, []);
  
  const handleRealBleScan = useCallback(async () => {
    setErrorMessage('');
    if (!navigator.bluetooth) {
      alert('Web Bluetooth API is not available on this browser.');
      return;
    }
    setCurrentScreen(AppState.SCANNING);
    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['generic_access', 'device_information']
      });
      if (!device.name) {
        setErrorMessage('Could not get device name.');
        setCurrentScreen(AppState.INITIAL);
        return;
      }
      const newMerchant: Merchant = {
        id: device.id,
        name: device.name,
        upiId: `${device.name.toLowerCase().replace(/[^a-z0-9]/g, '')}@bleupi`,
        rssi: -50,
      };
      setSelectedMerchant(newMerchant);
      setCurrentScreen(AppState.PAYMENT);
    } catch (error) {
      console.error('BLE Scan Error:', error);
      setErrorMessage('Scan cancelled or failed.');
      setCurrentScreen(AppState.INITIAL);
    }
  }, []);

  const handleScanComplete = useCallback(() => setCurrentScreen(AppState.MERCHANT_LIST), []);
  const handleSelectMerchant = useCallback((merchant: Merchant) => {
    setSelectedMerchant(merchant);
    setCurrentScreen(AppState.PAYMENT);
  }, []);
  const handleConfirmPayment = useCallback((amount: string) => {
    setPaymentAmount(amount);
    setCurrentScreen(AppState.SUCCESS);
  }, []);
  const handleCancelPayment = useCallback(() => {
    setSelectedMerchant(null);
    setCurrentScreen(isRealBleMode ? AppState.INITIAL : AppState.MERCHANT_LIST);
  }, [isRealBleMode]);
  const handleStartOver = useCallback(() => {
    setSelectedMerchant(null);
    setPaymentAmount('');
    setErrorMessage('');
    setCurrentScreen(AppState.INITIAL);
  }, []);
  
  const handleInitiateScan = isRealBleMode ? handleRealBleScan : handleSimulatedGesture;

  const renderPaymentScreen = () => {
     if (errorMessage && currentScreen === AppState.INITIAL) {
        // Persist error message on initial screen
    } else if (errorMessage) {
        // Clear error message when navigating away
        setErrorMessage('');
    }
    switch (currentScreen) {
      case AppState.INITIAL: return <InitialScreen onSimulateGesture={handleInitiateScan} />;
      case AppState.SCANNING: return <ScanningScreen onScanComplete={handleScanComplete} mode={isRealBleMode ? 'real' : 'simulated'} />;
      case AppState.MERCHANT_LIST: return <MerchantListScreen merchants={MOCK_MERCHANTS} onSelectMerchant={handleSelectMerchant} onRestart={handleStartOver} />;
      case AppState.PAYMENT:
        if (selectedMerchant) return <PaymentScreen merchant={selectedMerchant} onConfirmPayment={handleConfirmPayment} onCancel={handleCancelPayment} />;
        handleStartOver(); return null;
      case AppState.SUCCESS:
        if (selectedMerchant) return <SuccessScreen merchantName={selectedMerchant.name} amount={paymentAmount} onStartOver={handleStartOver} />;
        handleStartOver(); return null;
      default: return <InitialScreen onSimulateGesture={handleInitiateScan} />;
    }
  };

  const renderView = () => {
    if (view === 'login') {
      return <LoginScreen onLogin={handleLogin} onSwitchToRegister={() => setView('register')} />;
    }
    if (view === 'register') {
      return <RegisterScreen onRegister={handleRegister} onSwitchToLogin={() => setView('login')} />;
    }
    if (view === 'profile' && currentUser) {
      return <ProfileScreen 
        user={currentUser} 
        onLogout={handleLogout} 
        onUpdateProfile={handleUpdateProfile}
        theme={theme}
        onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
        onBack={() => setView('app')}
      />;
    }
    if (view === 'app' && currentUser) {
      return (
        <>
          <div className="p-4 bg-slate-100/50 dark:bg-slate-900/50 flex justify-between items-center border-b border-slate-300 dark:border-slate-700">
              <h1 className="text-sm font-bold text-slate-500 dark:text-slate-300">BLE Pay</h1>
              <button onClick={() => setView('profile')} className="text-slate-600 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
                  <ProfileIcon className="w-6 h-6"/>
              </button>
          </div>
          <div className="flex-grow p-6 flex flex-col relative">
              {errorMessage && currentScreen === AppState.INITIAL && (
                <div className="absolute top-0 left-6 right-6 bg-red-500/20 text-red-300 text-center text-xs p-2 rounded-b-lg animate-fade-in">
                    {errorMessage}
                </div>
              )}
              {renderPaymentScreen()}
          </div>
        </>
      );
    }
    // Fallback if no view matches
    handleLogout();
    return <LoginScreen onLogin={handleLogin} onSwitchToRegister={() => setView('register')} />;
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-white flex flex-col items-center justify-center p-4 font-sans transition-colors duration-300">
        <div className="w-full max-w-md mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-2xl shadow-indigo-500/10 dark:shadow-indigo-500/20 overflow-hidden min-h-[700px] flex flex-col">
            {renderView()}
        </div>
        
        {view === 'app' && (
          <div className="mt-6 w-full max-w-md flex flex-col items-center">
              <div className="flex items-center justify-center space-x-3 bg-white dark:bg-slate-800 p-2 rounded-full shadow-md">
                <span className={`px-3 text-sm font-medium ${!isRealBleMode ? 'text-slate-800 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>Simulated</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={isRealBleMode} onChange={() => setIsRealBleMode(!isRealBleMode)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 rounded-full peer peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-offset-white dark:peer-focus:ring-offset-slate-800 peer-focus:ring-indigo-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
                <span className={`px-3 text-sm font-medium ${isRealBleMode ? 'text-slate-800 dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>Real BLE</span>
              </div>

              <footer className="text-center mt-4 text-slate-500 dark:text-slate-500 text-xs">
                  <p>This is a UI simulation. No real payments are processed.</p>
                  {isRealBleMode && <p className="text-indigo-500/70 dark:text-indigo-400/70 mt-1">Real BLE mode requires a compatible browser.</p>}
              </footer>
          </div>
        )}
    </div>
  );
};

export default App;
