
import React from 'react';
import { User, UserRole } from '../types';
import { motion } from 'framer-motion';

interface NavbarProps {
  user: User | null;
  isGuest: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, isGuest, onLogout }) => {
  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-4">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg cursor-pointer overflow-hidden p-1 border border-gray-50"
            >
              <img 
                src="https://image2url.com/r2/default/images/1771885987484-f544ed0c-df49-42da-afe8-2bd173eb0111.webp" 
                alt="Logo" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-black text-gray-900 tracking-tighter leading-none">منصة مبدعون</h1>
              <p className="text-[10px] text-teal-600 font-black uppercase tracking-widest mt-1">Creators Platform</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {user && (
              <div className="hidden md:flex items-center gap-3 ml-4 bg-teal-50/50 px-4 py-2 rounded-2xl border border-teal-100/50">
                <img src={user.avatar} alt={user.fullName} className="w-9 h-9 rounded-xl border-2 border-white shadow-sm" />
                <div className="text-right">
                  <p className="text-sm font-black text-gray-900 leading-none">{user.fullName}</p>
                  <p className="text-[10px] text-teal-600 font-bold uppercase tracking-tighter mt-1">{user.role === UserRole.ADMIN ? 'مسؤول النظام' : 'عضو مبدع'}</p>
                </div>
              </div>
            )}
            {isGuest && (
              <div className="bg-amber-50 text-amber-700 text-[10px] font-black px-4 py-2 rounded-xl border border-amber-100 uppercase tracking-widest">
                وضع الزائر
              </div>
            )}
            <button
              onClick={onLogout}
              className="bg-gray-900 hover:bg-red-600 text-white px-6 py-2.5 rounded-xl text-sm font-black transition-all shadow-lg shadow-gray-200 hover:shadow-red-200 active:scale-95"
            >
              خروج
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
