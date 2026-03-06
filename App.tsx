
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, UserRole, Achievement, Memory, ChatMessage, PlatformText, PlatformLink, CreativeMedia, AdminAnnouncement } from './types';
import { INITIAL_ADMIN, MOCK_MEMBERS, INITIAL_ACHIEVEMENTS, INITIAL_TEXTS, INITIAL_LINKS, INITIAL_MEDIA } from './constants';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import GuestView from './components/GuestView';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [members, setMembers] = useState<User[]>(MOCK_MEMBERS);
  const [texts, setTexts] = useState<PlatformText[]>(INITIAL_TEXTS);
  const [links, setLinks] = useState<PlatformLink[]>(INITIAL_LINKS);
  const [media, setMedia] = useState<CreativeMedia[]>(INITIAL_MEDIA);
  const [announcements, setAnnouncements] = useState<AdminAnnouncement[]>([]);

  useEffect(() => {
    // Unique keys for local storage to prevent conflicts with older versions
    const savedMemories = localStorage.getItem('sc_memories_final');
    if (savedMemories) setMemories(JSON.parse(savedMemories));

    const savedAchievements = localStorage.getItem('sc_achievements_final');
    if (savedAchievements) setAchievements(JSON.parse(savedAchievements));

    const savedTexts = localStorage.getItem('sc_texts_final');
    if (savedTexts) setTexts(JSON.parse(savedTexts));

    const savedAnnouncements = localStorage.getItem('sc_announcements_final');
    if (savedAnnouncements) {
      const parsed: AdminAnnouncement[] = JSON.parse(savedAnnouncements);
      // Filter out announcements older than 24 hours
      const now = new Date().getTime();
      const filtered = parsed.filter(a => {
        const createdAt = new Date(a.createdAt).getTime();
        return now - createdAt < 24 * 60 * 60 * 1000;
      });
      setAnnouncements(filtered);
    }

    const savedMembers = localStorage.getItem('sc_members_final');
    if (savedMembers) {
      setMembers(JSON.parse(savedMembers));
    } else {
      setMembers(MOCK_MEMBERS);
    }
  }, []);

  const handleLogin = (usernameInput: string, passwordInput: string) => {
    // Sanitize ID: remove all spaces and convert to lower case for comparison
    const cleanIdInput = usernameInput.replace(/\s/g, '').toLowerCase();
    const cleanPassword = passwordInput.trim();
    
    // 1. Admin Login Check
    if (cleanIdInput === 'admin' && cleanPassword === 'admin') {
      setCurrentUser(INITIAL_ADMIN);
      setIsGuest(false);
      return true;
    }

    // 2. Member Login Check
    // Compare sanitized input ID with sanitized member IDs
    const member = members.find(m => m.username.replace(/\s/g, '').toLowerCase() === cleanIdInput);
    
    // Check if member exists AND password matches '1234' (or their individual password if changed)
    if (member && (cleanPassword === '1234' || cleanPassword === member.password)) {
      setCurrentUser(member);
      setIsGuest(false);
      return true;
    }

    return false;
  };

  const handleGuestEntry = () => {
    setIsGuest(true);
    setCurrentUser(null);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsGuest(false);
  };

  const addMemory = (content: string, targetUser?: User) => {
    const userToUse = targetUser || currentUser;
    if (!userToUse) return;
    
    const newMemory: Memory = {
      id: Date.now().toString(),
      userId: userToUse.id,
      userName: userToUse.fullName,
      content,
      createdAt: new Date().toISOString()
    };
    const updated = [newMemory, ...memories];
    setMemories(updated);
    localStorage.setItem('sc_memories_final', JSON.stringify(updated));
  };

  const addAchievement = (ach: Achievement) => {
    const updated = [ach, ...achievements];
    setAchievements(updated);
    localStorage.setItem('sc_achievements_final', JSON.stringify(updated));
  };

  const addText = (text: PlatformText) => {
    const updated = [text, ...texts];
    setTexts(updated);
    localStorage.setItem('sc_texts_final', JSON.stringify(updated));
  };

  const addAdminAnnouncement = (content: string) => {
    const newAnnouncement: AdminAnnouncement = {
      id: Date.now().toString(),
      content,
      createdAt: new Date().toISOString()
    };
    const updated = [newAnnouncement, ...announcements];
    setAnnouncements(updated);
    localStorage.setItem('sc_announcements_final', JSON.stringify(updated));
  };

  const markAnnouncementAsRead = (id: string) => {
    if (!currentUser) return;
    const updatedUser = {
      ...currentUser,
      readAnnouncements: [...(currentUser.readAnnouncements || []), id]
    };
    setCurrentUser(updatedUser);
    // Also update in members list if it's a member
    if (currentUser.role !== UserRole.ADMIN) {
      const updatedMembers = members.map(m => m.id === currentUser.id ? updatedUser : m);
      setMembers(updatedMembers);
      localStorage.setItem('sc_members_final', JSON.stringify(updatedMembers));
    }
  };

  const deleteMember = (id: string) => {
    const updated = members.filter(m => m.id !== id);
    setMembers(updated);
    localStorage.setItem('sc_members_final', JSON.stringify(updated));
  };

  const addMember = (newMember: User) => {
    const updated = [...members, newMember];
    setMembers(updated);
    localStorage.setItem('sc_members_final', JSON.stringify(updated));
  };

  const updateProfile = (updatedUser: User) => {
    if (currentUser?.id === updatedUser.id) {
      setCurrentUser(updatedUser);
    }
    const updatedMembers = members.map(m => m.id === updatedUser.id ? updatedUser : m);
    setMembers(updatedMembers);
    localStorage.setItem('sc_members_final', JSON.stringify(updatedMembers));
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] font-sans selection:bg-teal-100 selection:text-teal-900 overflow-x-hidden">
      {(currentUser || isGuest) && (
        <Navbar 
          user={currentUser} 
          isGuest={isGuest} 
          onLogout={handleLogout} 
        />
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px]"></div>
        </div>
        
        {!currentUser && !isGuest ? (
          <Login onLogin={handleLogin} onGuest={handleGuestEntry} />
        ) : isGuest ? (
          <GuestView 
            members={members} 
            achievements={achievements} 
            texts={texts}
            media={media}
          />
        ) : (
          <Dashboard 
            user={currentUser!} 
            achievements={achievements}
            memories={memories}
            texts={texts}
            onAddMemory={addMemory}
            onAddAchievement={addAchievement}
            onAddText={addText}
            members={members}
            onDeleteMember={deleteMember}
            onAddMember={addMember}
            onUpdateProfile={updateProfile}
            links={links}
            announcements={announcements}
            onAddAdminAnnouncement={addAdminAnnouncement}
            onReadAnnouncement={markAnnouncementAsRead}
          />
        )}
      </main>
      
      <footer className="bg-gray-900 text-white py-24 mt-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-[120px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="flex flex-col items-center gap-6 mb-12">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-20 h-20 bg-white rounded-3xl shadow-2xl overflow-hidden p-2 border-4 border-white/10"
            >
              <img 
                src="https://image2url.com/r2/default/images/1771885987484-f544ed0c-df49-42da-afe8-2bd173eb0111.webp" 
                alt="Logo" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div>
              <h3 className="text-3xl font-black tracking-tighter">منصة مبدعون</h3>
              <p className="text-teal-400 font-black uppercase tracking-[0.3em] text-[10px] mt-2">Creators Platform</p>
            </div>
          </div>
          
          <p className="text-gray-400 max-w-lg mx-auto mb-12 text-lg font-medium leading-relaxed">
            تأسست عام 2017 لخدمة الإبداع الشبابي السوداني والعربي، ونطمح لأن نكون المنارة الأولى لكل موهبة تبحث عن طريقها.
          </p>
          
          <div className="flex justify-center gap-6 mb-16">
            <a href="https://www.facebook.com/share/1B6WtDpPar/" target="_blank" className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white hover:bg-teal-600 hover:border-teal-600 transition-all shadow-xl">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
            </a>
          </div>
          
          <div className="pt-12 border-t border-white/5">
            <p className="text-xs text-gray-500 font-black uppercase tracking-widest">© {new Date().getFullYear()} جميع الحقوق محفوظة لـ منصة مبدعون</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
