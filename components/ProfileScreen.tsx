
import React, { useState } from 'react';
import { User } from '../types';

interface ProfileScreenProps {
  user: User;
  onUpdateProfile: (updatedUser: Partial<User>) => void;
  onLogout: () => void;
  onBack: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M10.83 12l4.58 4.59L14 18l-6-6 6-6 1.41 1.41L10.83 12z"></path></svg>
);


const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onUpdateProfile, onLogout, onBack, theme, onToggleTheme }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [profilePic, setProfilePic] = useState(user.profilePicture);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onUpdateProfile({ name, email, profilePicture: profilePic });
    setIsEditing(false);
  };
  
  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if(e.target.files && e.target.files[0]){
          setProfilePic(URL.createObjectURL(e.target.files[0]));
      }
  }

  return (
    <div className="flex flex-col h-full animate-fade-in">
       <div className="p-4 bg-slate-100/50 dark:bg-slate-900/50 flex justify-between items-center border-b border-slate-300 dark:border-slate-700">
        <button onClick={onBack} className="text-slate-600 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100">Profile & Settings</h1>
        <div className="w-6"></div>
      </div>
      
      <div className="flex-grow p-6 overflow-y-auto">
        <div className="flex flex-col items-center space-y-4 mb-8">
            <div className="relative">
                <img src={profilePic || `https://i.pravatar.cc/150?u=${user.email}`} alt="Profile" className="w-24 h-24 rounded-full object-cover ring-4 ring-indigo-500/50"/>
                {isEditing && (
                    <label htmlFor="pic-upload" className="absolute -bottom-2 -right-2 bg-slate-700 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-600 transition-colors">
                         <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19.49 5.4h-2.11l-1.9-2.3A1 1 0 0 0 14.72 2H9.28a1 1 0 0 0-.77.3L6.62 5.4H4.51a2.5 2.5 0 0 0-2.5 2.5v10.6a2.5 2.5 0 0 0 2.5 2.5h14.98a2.5 2.5 0 0 0 2.5-2.5V7.9a2.5 2.5 0 0 0-2.5-2.5zM12 18.2a4.88 4.88 0 1 1 4.88-4.88 4.88 4.88 0 0 1-4.88 4.88z"></path></svg>
                        <input id="pic-upload" type="file" className="hidden" accept="image/*" onChange={handlePictureChange}/>
                    </label>
                )}
            </div>
          {!isEditing ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{name}</h2>
              <p className="text-slate-500 dark:text-slate-400">{email}</p>
            </div>
          ) : (
             <div className="w-full space-y-4">
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full text-center text-2xl font-bold bg-transparent dark:text-white rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full text-center text-slate-500 dark:text-slate-400 bg-transparent rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
             </div>
          )}
        </div>
        
        <div className="space-y-4">
            <div className="bg-slate-100 dark:bg-slate-700/50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                    <label htmlFor="theme" className="font-semibold text-slate-700 dark:text-slate-200">Theme</label>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-slate-500">Light</span>
                         <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={theme === 'dark'} onChange={onToggleTheme} className="sr-only peer" />
                            <div className="w-11 h-6 bg-slate-300 dark:bg-slate-700 rounded-full peer peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-offset-white dark:peer-focus:ring-offset-slate-800 peer-focus:ring-indigo-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-600"></div>
                        </label>
                        <span className="text-sm text-slate-500">Dark</span>
                    </div>
                </div>
            </div>

            {!isEditing ? (
                 <button onClick={() => setIsEditing(true)} className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-500 transition-all">Edit Profile</button>
            ) : (
                <button onClick={handleSave} className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-400 transition-all">Save Changes</button>
            )}
            
            <button onClick={onLogout} className="w-full bg-slate-200 dark:bg-slate-700 text-red-500 dark:text-red-400 font-bold py-3 px-4 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
