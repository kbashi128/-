
import React, { useState, useRef } from 'react';
import { User, UserRole, Achievement, Memory, PlatformLink, PlatformText, AdminAnnouncement } from '../types';
import Chat from './Chat';
import CommunityFeed from './CommunityFeed';
import { GoogleGenAI } from "@google/genai";
import { Plus, Image as ImageIcon, X, Calendar, Award, Send, UserPlus, Trash2, Edit2, Save, Search, User as UserIcon, Bell, Megaphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardProps {
  user: User;
  achievements: Achievement[];
  memories: Memory[];
  texts: PlatformText[];
  onAddMemory: (c: string, targetUser?: User) => void;
  onAddAchievement: (a: Achievement) => void;
  onAddText: (t: PlatformText) => void;
  members: User[];
  onDeleteMember: (id: string) => void;
  onAddMember: (u: User) => void;
  onUpdateProfile: (u: User) => void;
  links: PlatformLink[];
  announcements: AdminAnnouncement[];
  onAddAdminAnnouncement: (content: string) => void;
  onReadAnnouncement: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  user, achievements, memories, texts, onAddMemory, onAddAchievement, onAddText, members, onDeleteMember, onAddMember, onUpdateProfile, links, announcements, onAddAdminAnnouncement, onReadAnnouncement
}) => {
  const [memoryInput, setMemoryInput] = useState('');
  const [activeTab, setActiveTab] = useState<'feed' | 'wall' | 'texts' | 'memories' | 'chat' | 'admin'>('feed');
  
  // AI Sidebar States
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string>('');
  const [loadingAi, setLoadingAi] = useState(false);
  
  // Profile States
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  // Achievement Form States
  const [showAchForm, setShowAchForm] = useState(false);
  const [achTitle, setAchTitle] = useState('');
  const [achDesc, setAchDesc] = useState('');
  const [achDate, setAchDate] = useState('');
  const [achImage, setAchImage] = useState<string | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Admin Member Management States
  const [memberSearch, setMemberSearch] = useState('');
  const [showAddMember, setShowAddMember] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [memberToDelete, setMemberToDelete] = useState<User | null>(null);
  const [managingMember, setManagingMember] = useState<User | null>(null);
  const [showMemberActions, setShowMemberActions] = useState(false);
  
  // Member Action States
  const [memberActionType, setMemberActionType] = useState<'achievement' | 'memory' | null>(null);
  const [memberActionContent, setMemberActionContent] = useState('');
  const [memberActionTitle, setMemberActionTitle] = useState('');
  const [memberActionDate, setMemberActionDate] = useState('');
  
  // New/Edit Member Form States
  const [mUsername, setMUsername] = useState('');
  const [mFullName, setMFullName] = useState('');
  const [mGroup, setMGroup] = useState('');
  const [mJoinDate, setMJoinDate] = useState('');
  const [mSpecialty, setMSpecialty] = useState('');

  // Announcement State
  const [announcementInput, setAnnouncementInput] = useState('');

  const isAdmin = user.role === UserRole.ADMIN;

  const handleAiConsultation = async () => {
    if (!aiQuery.trim()) return;
    setLoadingAi(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `أنت مساعد إبداعي ذكي وخبير في "منصة مبدعون". العضو ${user.fullName} من مجموعة ${user.group} يسألك عن: "${aiQuery}". قدم نصيحة إبداعية ملهمة بلهجة سودانية رقيقة ومشجعة.`,
      });
      setAiResponse(response.text || "أهلاً بك يا مبدع، جرب سؤالاً آخر!");
    } catch (error) {
      setAiResponse("عذراً، يبدو أن المساعد مشغول بالإبداع حالياً.");
    } finally {
      setLoadingAi(false);
    }
  };

  const handleUpdatePassword = () => {
    if (!newPassword) return;
    const updatedUser: User = { ...user, password: newPassword };
    onUpdateProfile(updatedUser);
    setNewPassword('');
    setIsEditingProfile(false);
    alert('تم تحديث كلمة المرور بنجاح');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAchImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddAchievement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!achTitle || !achDesc || !achDate) return;
    
    const targetUserId = managingMember ? managingMember.id : user.id;
    
    const newAch: Achievement = {
      id: Date.now().toString(),
      userId: targetUserId,
      title: achTitle,
      description: achDesc,
      date: achDate,
      imageUrl: achImage || 'https://images.unsplash.com/photo-1523240715630-9918c1381942?q=80&w=1000&auto=format&fit=crop'
    };
    
    onAddAchievement(newAch);
    setAchTitle('');
    setAchDesc('');
    setAchDate('');
    setAchImage(undefined);
    setShowAchForm(false);
    if (managingMember) {
      setManagingMember(null);
      setMemberActionType(null);
    }
  };

  const handleAddMemoryForMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!managingMember || !memberActionContent) return;
    
    onAddMemory(memberActionContent, managingMember);
    setMemberActionContent('');
    setManagingMember(null);
    setMemberActionType(null);
  };
  const handleAddMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMember: User = {
      id: Date.now().toString(),
      username: mUsername,
      fullName: mFullName,
      group: mGroup,
      joinDate: mJoinDate || new Date().toISOString().split('T')[0],
      specialty: mSpecialty.split(',').map(s => s.trim()),
      role: UserRole.MEMBER,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${mUsername}`,
      password: '1234'
    };
    onAddMember(newMember);
    resetMemberForm();
  };

  const handleUpdateMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMemberId) return;
    const existing = members.find(m => m.id === editingMemberId);
    if (!existing) return;

    const updated: User = {
      ...existing,
      username: mUsername,
      fullName: mFullName,
      group: mGroup,
      joinDate: mJoinDate,
      specialty: mSpecialty.split(',').map(s => s.trim()),
    };
    onUpdateProfile(updated);
    resetMemberForm();
  };

  const resetMemberForm = () => {
    setMUsername('');
    setMFullName('');
    setMGroup('');
    setMJoinDate('');
    setMSpecialty('');
    setShowAddMember(false);
    setEditingMemberId(null);
  };

  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementInput.trim()) return;
    onAddAdminAnnouncement(announcementInput);
    setAnnouncementInput('');
    alert('تم إرسال الرسالة الإدارية بنجاح');
  };

  const unreadAnnouncements = announcements.filter(a => !user.readAnnouncements?.includes(a.id));

  const startEditMember = (m: User) => {
    setMUsername(m.username);
    setMFullName(m.fullName);
    setMGroup(m.group);
    setMJoinDate(m.joinDate);
    setMSpecialty(m.specialty.join(', '));
    setEditingMemberId(m.id);
    setShowAddMember(true);
  };

  const filteredMembers = members.filter(m => 
    m.fullName.toLowerCase().includes(memberSearch.toLowerCase()) || 
    m.username.toLowerCase().includes(memberSearch.toLowerCase()) ||
    m.group.toLowerCase().includes(memberSearch.toLowerCase())
  );

  return (
    <div className="relative">
      {/* Announcement Overlay for Members */}
      {!isAdmin && unreadAnnouncements.length > 0 && (
        <AnimatePresence>
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            className="fixed top-28 left-1/2 -translate-x-1/2 z-[100] w-full max-w-2xl px-4"
          >
            <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white p-8 rounded-[3rem] shadow-2xl border border-white/20 relative overflow-hidden group ring-8 ring-teal-500/10">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
              <div className="relative z-10 flex items-start gap-6">
                <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center shrink-0 shadow-inner">
                  <Megaphone className="text-white animate-bounce" size={32} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-black text-xl tracking-tight">رسالة إدارية هامة</h4>
                    <span className="bg-white/20 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">عاجل</span>
                  </div>
                  <p className="text-teal-50 font-bold leading-relaxed text-lg">{unreadAnnouncements[0].content}</p>
                  <div className="mt-6 flex justify-end">
                    <button 
                      onClick={() => onReadAnnouncement(unreadAnnouncements[0].id)}
                      className="bg-white text-teal-600 px-8 py-3 rounded-2xl font-black text-sm hover:bg-teal-50 transition-all active:scale-95 shadow-xl"
                    >
                      فهمت، شكراً
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar - ID Card and AI */}
      <div className="lg:col-span-1 space-y-6">
        
        {/* Membership Card - Digital ID Styling */}
        <div className="bg-gradient-to-br from-[#0d3b36] via-[#1a6b61] to-[#124d45] p-8 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden border border-white/10 ring-8 ring-teal-500/5 group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-teal-400/20 rounded-full -mr-24 -mt-24 blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-400/10 rounded-full -ml-24 -mb-24 blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-12">
              <div className="flex flex-col">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-2xl mb-3 overflow-hidden p-1.5 border-2 border-teal-500/20">
                  <img 
                    src="https://image2url.com/r2/default/images/1771885987484-f544ed0c-df49-42da-afe8-2bd173eb0111.webp" 
                    alt="Logo" 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="text-[10px] font-black tracking-[0.3em] text-teal-300 uppercase">منصة مبدعون</p>
              </div>
              <div className="text-left">
                <span className="text-[9px] font-black uppercase tracking-widest bg-white/10 text-white px-4 py-2 rounded-xl border border-white/10 backdrop-blur-md">عضوية ذهبية</span>
              </div>
            </div>

            <div className="space-y-8">
              <div className="border-r-4 border-teal-400 pr-5">
                <p className="text-[9px] text-teal-300 uppercase font-black tracking-widest mb-1.5 opacity-70">الاسم الكامل للمبدع</p>
                <h3 className="font-black text-2xl leading-tight text-white tracking-tight">{user.fullName}</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
                  <p className="text-[8px] text-teal-300 uppercase font-black tracking-widest mb-1 opacity-70">رقم العضوية</p>
                  <p className="font-black text-sm text-white tracking-widest">{user.username}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
                  <p className="text-[8px] text-teal-300 uppercase font-black tracking-widest mb-1 opacity-70">المجموعة</p>
                  <p className="font-black text-sm text-white">{user.group}</p>
                </div>
              </div>

              <div className="bg-white/5 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
                <p className="text-[8px] text-teal-300 uppercase font-black tracking-widest mb-1 opacity-70">تاريخ الانضمام</p>
                <p className="font-black text-xs text-white">{user.joinDate}</p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center opacity-60">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                <div className="w-2 h-2 bg-white/30 rounded-full"></div>
              </div>
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-teal-200">CREATORS 2026</p>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100">
          <button 
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="w-full flex items-center justify-between px-2 py-2 text-[10px] font-black text-gray-400 hover:text-teal-600 transition-all uppercase tracking-widest"
          >
            <span>إعدادات الحساب</span>
            <svg className={`w-4 h-4 transition-transform ${isEditingProfile ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          
          {isEditingProfile && (
            <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="bg-gray-50 p-4 rounded-2xl">
                <label className="block text-[9px] font-black text-gray-500 mb-2 uppercase tracking-widest">تغيير كلمة المرور</label>
                <input 
                  type="password" 
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="كلمة مرور جديدة"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                />
              </div>
              <button 
                onClick={handleUpdatePassword}
                className="w-full bg-teal-600 text-white font-black py-4 rounded-xl text-[10px] shadow-lg shadow-teal-900/10 hover:bg-teal-700 transition-all active:scale-95"
              >
                حفظ التعديلات
              </button>
            </div>
          )}
        </div>

        {/* AI Sidebar */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden group border border-white/5">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-teal-500/20 rounded-xl flex items-center justify-center text-teal-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h4 className="font-black text-xl tracking-tight">مستشار الإبداع</h4>
            </div>
            <p className="text-[10px] text-gray-400 mb-8 leading-relaxed uppercase tracking-widest font-black opacity-60">اسأل المساعد عن نصيحة إبداعية ملهمة</p>
            
            <div className="space-y-5">
              <div className="relative">
                <input 
                  type="text"
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAiConsultation()}
                  placeholder="كيف أطور أسلوبي؟"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-teal-500 outline-none placeholder:text-gray-600 transition-all"
                />
              </div>
              <button 
                onClick={handleAiConsultation}
                disabled={loadingAi || !aiQuery.trim()}
                className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-black py-5 rounded-2xl text-sm shadow-xl shadow-teal-900/40 hover:from-teal-500 hover:to-emerald-500 transition-all disabled:opacity-50 active:scale-95 flex items-center justify-center gap-3"
              >
                {loadingAi ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>استشارة ذكية</span>
                    <span className="text-lg">✨</span>
                  </>
                )}
              </button>
            </div>
            
            <AnimatePresence>
              {aiResponse && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-8 p-6 bg-white/5 rounded-3xl text-[13px] leading-relaxed border border-white/10 text-teal-50 font-medium relative"
                >
                  <div className="absolute -top-3 right-6 bg-teal-600 text-[8px] font-black uppercase px-3 py-1 rounded-full">رد المستشار</div>
                  {aiResponse}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100">
          <h4 className="font-black text-gray-900 mb-6 text-[10px] uppercase tracking-widest text-center border-b border-gray-50 pb-4">روابط المنصة الرسمية</h4>
          <div className="space-y-3">
            {links.map(link => (
              <a key={link.id} href={link.url} target="_blank" className="flex items-center justify-between p-4 bg-gray-50 hover:bg-teal-600 rounded-2xl transition-all group shadow-sm">
                <p className="text-xs font-black text-gray-700 group-hover:text-white">{link.label}</p>
                <div className="w-8 h-8 bg-white/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                  <svg className="w-4 h-4 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lg:col-span-3 space-y-10">
        <div className="flex bg-white p-2 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-x-auto no-scrollbar gap-2">
          {['feed', 'wall', 'texts', 'memories', 'chat', 'admin'].filter(t => t !== 'admin' || isAdmin).map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex-1 py-4 px-8 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all whitespace-nowrap relative overflow-hidden group ${
                activeTab === tab 
                  ? 'bg-gray-900 text-white shadow-2xl shadow-gray-900/20' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              }`}
            >
              {activeTab === tab && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 -z-10"
                />
              )}
              {tab === 'feed' ? 'الساحة العامة' : tab === 'wall' ? 'الإنجازات' : tab === 'texts' ? 'النصوص' : tab === 'memories' ? 'الذكريات' : tab === 'chat' ? 'الدردشة' : 'الإدارة'}
            </button>
          ))}
        </div>

        <div className="min-h-[600px]">
          {activeTab === 'feed' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-4xl font-black text-gray-900 tracking-tight">ساحة المبدعين</h2>
                <div className="bg-teal-50 text-teal-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-teal-100">
                  شارك إبداعك مع الجميع
                </div>
              </div>
              <CommunityFeed currentUser={user} />
            </div>
          )}

          {activeTab === 'wall' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center">
                <h2 className="text-4xl font-black text-gray-900 tracking-tight">سجل الإنجازات</h2>
                <button 
                  onClick={() => setShowAchForm(!showAchForm)}
                  className="flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-2xl font-black text-sm shadow-lg shadow-teal-900/20 hover:bg-teal-700 transition-all active:scale-95"
                >
                  {showAchForm ? <X size={18} /> : <Plus size={18} />}
                  {showAchForm ? 'إلغاء' : 'إضافة إنجاز'}
                </button>
              </div>

              <AnimatePresence>
                {showAchForm && (
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white p-8 rounded-[2.5rem] border-2 border-teal-100 shadow-xl"
                  >
                    <form onSubmit={handleAddAchievement} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2">عنوان الإنجاز</label>
                          <input 
                            type="text" 
                            required
                            value={achTitle}
                            onChange={(e) => setAchTitle(e.target.value)}
                            placeholder="مثال: الفوز بجائزة القصة القصيرة"
                            className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2">التاريخ</label>
                          <div className="relative">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input 
                              type="date" 
                              required
                              value={achDate}
                              onChange={(e) => setAchDate(e.target.value)}
                              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all pl-12"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2">وصف الإنجاز</label>
                        <textarea 
                          required
                          value={achDesc}
                          onChange={(e) => setAchDesc(e.target.value)}
                          placeholder="اكتب تفاصيل إنجازك هنا..."
                          rows={4}
                          className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all resize-none"
                        />
                      </div>

                      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                        <div className="flex-1 w-full">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2 block mb-2">صورة الإنجاز (اختياري)</label>
                          <div 
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-teal-400 hover:bg-teal-50/30 transition-all group"
                          >
                            {achImage ? (
                              <div className="relative w-full h-32">
                                <img src={achImage} alt="Preview" className="w-full h-full object-cover rounded-xl" />
                                <button 
                                  type="button"
                                  onClick={(e) => { e.stopPropagation(); setAchImage(undefined); }}
                                  className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            ) : (
                              <>
                                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-teal-600 group-hover:bg-white transition-all">
                                  <ImageIcon size={24} />
                                </div>
                                <p className="text-xs font-bold text-gray-500">انقر لرفع صورة أو اسحبها هنا</p>
                              </>
                            )}
                            <input 
                              type="file" 
                              ref={fileInputRef}
                              onChange={handleImageUpload}
                              accept="image/*"
                              className="hidden" 
                            />
                          </div>
                        </div>
                        <button 
                          type="submit"
                          className="w-full md:w-auto bg-teal-600 text-white font-black px-10 py-5 rounded-2xl text-sm shadow-xl shadow-teal-900/20 hover:bg-teal-700 transition-all active:scale-95 flex items-center justify-center gap-3"
                        >
                          <Award size={20} />
                          توثيق الإنجاز
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {achievements.map((ach, index) => (
                  <motion.div 
                    key={ach.id} 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`bg-white rounded-[3.5rem] overflow-hidden shadow-sm border border-gray-100 flex flex-col hover:shadow-2xl transition-all group relative ${
                      index % 3 === 0 ? 'md:col-span-2 md:flex-row h-auto md:h-[450px]' : 'h-full'
                    }`}
                  >
                    <div className={`${index % 3 === 0 ? 'md:w-1/2' : 'h-72'} overflow-hidden relative`}>
                      <img 
                        src={ach.imageUrl} 
                        alt="" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s] ease-out" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    
                    <div className={`p-10 flex-1 flex flex-col justify-center relative ${index % 3 === 0 ? 'md:p-16' : 'p-10'}`}>
                      <div className="absolute top-8 right-8 text-teal-600/10">
                        <Award size={index % 3 === 0 ? 120 : 60} strokeWidth={1} />
                      </div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="bg-teal-50 text-teal-600 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">{ach.date}</div>
                          <div className="w-1.5 h-1.5 bg-teal-200 rounded-full"></div>
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">إنجاز موثق</span>
                        </div>
                        
                        <h3 className={`${index % 3 === 0 ? 'text-4xl' : 'text-2xl'} font-black text-gray-900 mb-6 leading-tight`}>
                          {ach.title}
                        </h3>
                        
                        <p className="text-gray-500 leading-relaxed text-lg font-medium line-clamp-3">
                          {ach.description}
                        </p>
                        
                        <div className="mt-8 pt-8 border-t border-gray-50 flex items-center justify-between">
                          <div className="flex -space-x-2 space-x-reverse">
                            {[1, 2, 3].map(i => (
                              <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center overflow-hidden">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${ach.id}${i}`} alt="" />
                              </div>
                            ))}
                            <div className="w-8 h-8 rounded-full border-2 border-white bg-teal-600 flex items-center justify-center text-[8px] font-black text-white">+12</div>
                          </div>
                          <button className="text-[10px] font-black text-teal-600 uppercase tracking-widest hover:underline underline-offset-8">التفاصيل الكاملة</button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'memories' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center">
                <h2 className="text-4xl font-black text-gray-900 tracking-tight">جدار الذكريات</h2>
                <div className="flex items-center gap-4">
                  <div className="bg-amber-50 text-amber-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-100">
                    {memories.length} ذكرى موثقة
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {memories.map((memory, index) => (
                  <motion.div 
                    key={memory.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-full -mr-12 -mt-12 opacity-50 group-hover:scale-150 transition-transform duration-700" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-6">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${memory.userId}`} alt="" className="w-10 h-10 rounded-xl border border-gray-100 shadow-sm" />
                        <div>
                          <p className="text-xs font-black text-gray-900">{memory.userName}</p>
                          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">{new Date(memory.createdAt).toLocaleDateString('ar-EG')}</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm leading-relaxed font-medium mb-6">
                        {memory.content}
                      </p>
                      
                      <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                        <div className="flex items-center gap-2 text-amber-600">
                          <ImageIcon size={14} />
                          <span className="text-[10px] font-black uppercase tracking-widest">ذكرى إبداعية</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="bg-amber-600 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-amber-900/20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="text-center md:text-right">
                    <h3 className="text-2xl font-black mb-2">شاركنا ذكرى إبداعية</h3>
                    <p className="text-amber-100 text-sm font-medium">وثق لحظاتك الجميلة في مسيرتك مع منصة مبدعون</p>
                  </div>
                  <div className="flex-1 w-full max-w-md">
                    <div className="relative">
                      <input 
                        type="text" 
                        value={memoryInput}
                        onChange={(e) => setMemoryInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (onAddMemory(memoryInput), setMemoryInput(''))}
                        placeholder="ماذا يخطر ببالك؟"
                        className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-white outline-none placeholder:text-amber-200 text-white"
                      />
                      <button 
                        onClick={() => { onAddMemory(memoryInput); setMemoryInput(''); }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white text-amber-600 p-2 rounded-xl hover:bg-amber-50 transition-all"
                      >
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'chat' && (
            <div className="bg-white rounded-[3.5rem] shadow-2xl border border-gray-100 h-[700px] overflow-hidden flex flex-col animate-in fade-in duration-500 relative">
              <Chat currentUser={user} />
            </div>
          )}

          {activeTab === 'texts' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-500">
              {texts.map(text => (
                <div key={text.id} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:border-teal-200 transition-colors flex flex-col">
                  <div className="mb-6">
                    <span className="bg-gray-50 text-gray-400 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest inline-block mb-4">{text.category}</span>
                    <h3 className="text-2xl font-black text-gray-900">{text.title}</h3>
                  </div>
                  <p className="text-gray-600 text-base leading-relaxed mb-10 flex-1 font-medium italic">"{text.content}"</p>
                  <div className="flex items-center gap-4 pt-8 border-t border-gray-50">
                    <div className="w-10 h-10 bg-teal-600 rounded-2xl flex items-center justify-center text-white font-black text-xs">{text.author.charAt(0)}</div>
                    <div>
                      <p className="text-xs font-black text-gray-900">{text.author}</p>
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">مبدع معتمد</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'admin' && isAdmin && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Admin Announcement Section */}
              <div className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-teal-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-teal-900/20">
                      <Megaphone size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-gray-900">إرسال تنبيه إداري</h3>
                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">يظهر للأعضاء فقط لمدة 24 ساعة</p>
                    </div>
                  </div>
                  
                  <form onSubmit={handleAddAnnouncement} className="flex flex-col md:flex-row gap-4">
                    <input 
                      type="text"
                      value={announcementInput}
                      onChange={(e) => setAnnouncementInput(e.target.value)}
                      placeholder="اكتب رسالتك هنا... (مثلاً: تنبيه هام بخصوص الاجتماع القادم)"
                      className="flex-1 bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:ring-4 focus:ring-teal-500/10 focus:bg-white focus:border-teal-500 outline-none transition-all font-bold"
                    />
                    <button 
                      type="submit"
                      className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-black text-sm hover:bg-teal-600 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"
                    >
                      <Send size={18} />
                      إرسال التنبيه
                    </button>
                  </form>
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <h2 className="text-4xl font-black text-gray-900 tracking-tight">إدارة الأعضاء</h2>
                <button 
                  onClick={() => {
                    if (showAddMember) resetMemberForm();
                    else setShowAddMember(true);
                  }}
                  className="flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-2xl font-black text-sm shadow-lg shadow-teal-900/20 hover:bg-teal-700 transition-all active:scale-95"
                >
                  {showAddMember ? <X size={18} /> : <UserPlus size={18} />}
                  {showAddMember ? 'إلغاء' : 'إضافة عضو جديد'}
                </button>
              </div>

              <AnimatePresence>
                {showAddMember && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-white p-8 rounded-[2.5rem] border-2 border-teal-100 shadow-xl mb-8">
                      <form onSubmit={editingMemberId ? handleUpdateMemberSubmit : handleAddMemberSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2">الاسم الكامل</label>
                            <input 
                              type="text" required value={mFullName} onChange={(e) => setMFullName(e.target.value)}
                              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2">رقم العضوية (Username)</label>
                            <input 
                              type="text" required value={mUsername} onChange={(e) => setMUsername(e.target.value)}
                              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2">المجموعة</label>
                            <input 
                              type="text" required value={mGroup} onChange={(e) => setMGroup(e.target.value)}
                              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2">تاريخ الانضمام</label>
                            <input 
                              type="date" value={mJoinDate} onChange={(e) => setMJoinDate(e.target.value)}
                              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-2">التخصصات (مفصولة بفاصلة)</label>
                            <input 
                              type="text" value={mSpecialty} onChange={(e) => setMSpecialty(e.target.value)}
                              placeholder="شعر, نثر, رسم"
                              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                            />
                          </div>
                        </div>
                        <button 
                          type="submit"
                          className="w-full bg-teal-600 text-white font-black py-4 rounded-2xl text-sm shadow-lg hover:bg-teal-700 transition-all flex items-center justify-center gap-2"
                        >
                          {editingMemberId ? <Save size={18} /> : <Plus size={18} />}
                          {editingMemberId ? 'حفظ التغييرات' : 'إضافة العضو'}
                        </button>
                      </form>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-50 bg-gray-50/50">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                      type="text"
                      placeholder="البحث عن عضو بالاسم، الرقم، أو المجموعة..."
                      value={memberSearch}
                      onChange={(e) => setMemberSearch(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all pl-14"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-right">
                    <thead>
                      <tr className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        <th className="px-8 py-6">العضو</th>
                        <th className="px-8 py-6">المجموعة</th>
                        <th className="px-8 py-6">رقم العضوية</th>
                        <th className="px-8 py-6">تاريخ الانضمام</th>
                        <th className="px-8 py-6 text-left">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filteredMembers.map(m => (
                        <tr key={m.id} className="hover:bg-gray-50/50 transition-colors group">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <img src={m.avatar} alt="" className="w-10 h-10 rounded-xl border border-gray-100" />
                              <div>
                                <p className="text-sm font-black text-gray-900">{m.fullName}</p>
                                <p className="text-[10px] text-gray-400 font-bold">{m.specialty.join(', ')}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className="bg-teal-50 text-teal-700 text-[10px] font-black px-3 py-1.5 rounded-full">{m.group}</span>
                          </td>
                          <td className="px-8 py-6 font-mono text-xs text-gray-500">{m.username}</td>
                          <td className="px-8 py-6 text-xs text-gray-500">{m.joinDate}</td>
                          <td className="px-8 py-6">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => setManagingMember(m)}
                                className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"
                                title="إدارة الإنجازات والذكريات"
                              >
                                <Award size={16} />
                              </button>
                              <button 
                                onClick={() => startEditMember(m)}
                                className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button 
                                onClick={() => setMemberToDelete(m)}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {memberToDelete && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMemberToDelete(null)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-[2.5rem] shadow-2xl p-10 max-w-md w-full text-center border border-gray-100"
            >
              <div className="w-20 h-20 bg-red-50 text-red-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <Trash2 size={40} />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">تأكيد الحذف</h3>
              <p className="text-gray-500 mb-10 leading-relaxed font-medium">
                هل أنت متأكد من رغبتك في حذف العضو <span className="text-gray-900 font-black">{memberToDelete.fullName}</span>؟ لا يمكن التراجع عن هذا الإجراء.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setMemberToDelete(null)}
                  className="flex-1 bg-gray-100 text-gray-600 font-black py-4 rounded-2xl hover:bg-gray-200 transition-all"
                >
                  إلغاء
                </button>
                <button 
                  onClick={() => {
                    onDeleteMember(memberToDelete.id);
                    setMemberToDelete(null);
                  }}
                  className="flex-1 bg-red-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-red-900/20 hover:bg-red-700 transition-all"
                >
                  تأكيد الحذف
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Member Management Modal (Achievements/Memories) */}
      <AnimatePresence>
        {managingMember && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setManagingMember(null)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-[2.5rem] shadow-2xl p-8 max-w-2xl w-full border border-gray-100 overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                  <img src={managingMember.avatar} alt="" className="w-12 h-12 rounded-xl border border-gray-100" />
                  <div>
                    <h3 className="text-xl font-black text-gray-900">إدارة بيانات: {managingMember.fullName}</h3>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{managingMember.username}</p>
                  </div>
                </div>
                <button onClick={() => setManagingMember(null)} className="p-2 hover:bg-gray-100 rounded-full transition-all">
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <button 
                  onClick={() => setMemberActionType('achievement')}
                  className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${memberActionType === 'achievement' ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-gray-100 hover:border-teal-200 text-gray-500'}`}
                >
                  <Award size={32} />
                  <span className="font-black text-sm">إضافة إنجاز</span>
                </button>
                <button 
                  onClick={() => setMemberActionType('memory')}
                  className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${memberActionType === 'memory' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-gray-100 hover:border-amber-200 text-gray-500'}`}
                >
                  <ImageIcon size={32} />
                  <span className="font-black text-sm">إضافة ذكرى</span>
                </button>
              </div>

              {memberActionType === 'achievement' && (
                <form onSubmit={handleAddAchievement} className="space-y-4 animate-in fade-in slide-in-from-top-2">
                  <input 
                    type="text" required placeholder="عنوان الإنجاز" value={achTitle} onChange={(e) => setAchTitle(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                  <textarea 
                    required placeholder="وصف الإنجاز" rows={3} value={achDesc} onChange={(e) => setAchDesc(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-teal-500 outline-none resize-none"
                  />
                  <input 
                    type="date" required value={achDate} onChange={(e) => setAchDate(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                  <button type="submit" className="w-full bg-teal-600 text-white font-black py-4 rounded-2xl shadow-lg hover:bg-teal-700 transition-all">
                    توثيق الإنجاز للعضو
                  </button>
                </form>
              )}

              {memberActionType === 'memory' && (
                <form onSubmit={handleAddMemoryForMember} className="space-y-4 animate-in fade-in slide-in-from-top-2">
                  <textarea 
                    required placeholder="اكتب الذكرى هنا..." rows={4} value={memberActionContent} onChange={(e) => setMemberActionContent(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-amber-500 outline-none resize-none"
                  />
                  <button type="submit" className="w-full bg-amber-600 text-white font-black py-4 rounded-2xl shadow-lg hover:bg-amber-700 transition-all">
                    إضافة الذكرى للعضو
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;
