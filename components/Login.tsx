
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface LoginProps {
  onLogin: (u: string, p: string) => boolean;
  onGuest: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onGuest }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = onLogin(username, password);
    if (!success) {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة');
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-radial-gradient from-teal-500/5 via-transparent to-transparent -z-10"></div>
      <div className="max-w-md w-full space-y-10 bg-white/80 backdrop-blur-xl p-12 rounded-[3.5rem] shadow-2xl border border-white/60 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-teal-500/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-500/10 rounded-full -ml-20 -mb-20 blur-3xl"></div>

        <div className="relative z-10">
          <div className="text-center mb-12">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-24 h-24 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-[2rem] flex items-center justify-center text-white text-4xl font-black shadow-2xl mx-auto mb-8 transform -rotate-3 border-4 border-white"
            >
              <img 
                src="https://image2url.com/r2/default/images/1771885987484-f544ed0c-df49-42da-afe8-2bd173eb0111.webp" 
                alt="Logo" 
                className="w-full h-full object-contain p-2"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <h2 className="text-4xl font-black text-gray-900 mb-3 tracking-tighter">منصة مبدعون</h2>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">أهلاً بك في فضاء الإبداع والجمال</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2">اسم المستخدم</label>
              <input
                type="text"
                required
                className="w-full px-6 py-4 rounded-2xl bg-gray-50/50 border border-gray-100 focus:ring-4 focus:ring-teal-500/10 focus:bg-white focus:border-teal-500 transition-all outline-none font-bold text-gray-900"
                placeholder="أدخل اسم المستخدم"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2">كلمة المرور</label>
              <input
                type="password"
                required
                className="w-full px-6 py-4 rounded-2xl bg-gray-50/50 border border-gray-100 focus:ring-4 focus:ring-teal-500/10 focus:bg-white focus:border-teal-500 transition-all outline-none font-bold text-gray-900"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-xs font-black text-center bg-red-50 py-3 rounded-xl border border-red-100"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-black py-5 rounded-2xl shadow-xl shadow-teal-900/20 transition-all transform hover:-translate-y-1 active:scale-95"
            >
              تسجيل الدخول
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
              <span className="px-4 bg-white text-gray-400">أو</span>
            </div>
          </div>

          <button
            onClick={onGuest}
            className="w-full bg-white hover:bg-gray-50 text-gray-900 font-black py-5 rounded-2xl border-2 border-gray-100 transition-all shadow-lg shadow-gray-100 active:scale-95"
          >
            الدخول كزائر
          </button>

          <p className="mt-10 text-center text-[10px] text-gray-400 font-black uppercase tracking-widest">
            للحصول على عضوية، تواصل مع الإدارة عبر <a href="https://www.facebook.com/share/1B6WtDpPar/" target="_blank" className="text-teal-600 hover:underline">فيسبوك</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
