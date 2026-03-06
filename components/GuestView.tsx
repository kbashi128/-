
import React from 'react';
import { motion } from 'framer-motion';
import { User, Achievement, PlatformText, CreativeMedia } from '../types';
import CommunityFeed from './CommunityFeed';

interface GuestViewProps {
  members: User[];
  achievements: Achievement[];
  texts: PlatformText[];
  media: CreativeMedia[];
}

const GuestView: React.FC<GuestViewProps> = ({ members, achievements, texts, media }) => {
  return (
    <div className="space-y-32 py-10 animate-in fade-in duration-1000">
      {/* Hero */}
      <section className="text-center space-y-12 max-w-5xl mx-auto relative px-4 py-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-radial-gradient from-teal-500/10 via-emerald-500/5 to-transparent rounded-full blur-[120px] -z-10"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-teal-100 text-teal-700 px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-[0.3em] shadow-xl mb-6"
        >
          <span className="w-2.5 h-2.5 bg-teal-500 rounded-full animate-ping"></span>
          المنصة الإبداعية للشباب
        </motion.div>
        <h1 className="text-7xl md:text-9xl font-black text-gray-900 leading-[0.9] tracking-tighter">
          نبني مستقبلاً <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-500 to-teal-600 bg-[length:200%_auto] animate-gradient-x">بأيدٍ مبدعة</span>
        </h1>
        <p className="text-2xl text-gray-500 leading-relaxed max-w-3xl mx-auto font-medium">
          أكبر منصة شبابية مخصصة لصقل المواهب في الكتابة، الرسم، الإلقاء، والمونتاج. انضم لـ <span className="text-teal-600 font-black">500+</span> مبدع الآن في منصة مبدعون.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6 pt-10">
          <button className="bg-gray-900 text-white px-14 py-6 rounded-[2rem] font-black text-xl shadow-2xl shadow-gray-400/20 hover:bg-black transition-all transform hover:-translate-y-2 active:scale-95">
            كيفية الانضمام
          </button>
          <button className="bg-white text-gray-900 px-14 py-6 rounded-[2rem] font-black text-xl border-2 border-gray-100 hover:border-teal-600 hover:text-teal-600 transition-all active:scale-95 shadow-lg shadow-gray-100">
            تواصل معنا
          </button>
        </div>
      </section>

      {/* Community Feed Section for Guests */}
      <section className="space-y-20 max-w-5xl mx-auto px-4 relative">
        <div className="absolute -left-20 top-0 w-64 h-64 bg-teal-100/30 rounded-full blur-3xl -z-10"></div>
        <div className="text-center">
          <h2 className="text-5xl font-black text-gray-900 mb-6 tracking-tight">ساحة المبدعين الحية</h2>
          <p className="text-teal-600 font-black uppercase tracking-[0.2em] text-[10px] bg-teal-50 px-6 py-2 rounded-full inline-block">تابع آخر تحديثات وإبداعات أعضاء المنصة لحظة بلحظة</p>
        </div>
        <div className="bg-white/40 backdrop-blur-xl p-8 rounded-[4rem] border border-white/60 shadow-2xl shadow-teal-900/5">
          <CommunityFeed currentUser={null} isGuest={true} />
        </div>
      </section>

      {/* Featured Texts */}
      <section className="space-y-20">
        <div className="text-center">
          <h2 className="text-5xl font-black text-gray-900 mb-6 tracking-tight">من نصوص المبدعين</h2>
          <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-[10px]">كلمات تصيغ واقعنا الجديد</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {texts.slice(0, 3).map((text, idx) => (
            <motion.div 
              key={text.id} 
              whileHover={{ y: -10 }}
              className={`p-12 rounded-[3.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden ${idx === 1 ? 'bg-gray-900 text-white' : 'bg-white'}`}
            >
              {idx === 1 && <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/20 rounded-full -mr-16 -mt-16 blur-2xl"></div>}
              <div className="mb-10">
                <span className={`font-black text-[10px] uppercase tracking-widest block mb-3 ${idx === 1 ? 'text-teal-400' : 'text-teal-600'}`}>{text.category}</span>
                <h3 className="text-3xl font-black leading-tight group-hover:text-teal-500 transition-colors">{text.title}</h3>
              </div>
              <p className={`leading-relaxed text-lg mb-12 line-clamp-6 font-medium italic ${idx === 1 ? 'text-gray-300' : 'text-gray-500'}`}>"{text.content}"</p>
              <div className={`flex items-center gap-4 pt-8 border-t ${idx === 1 ? 'border-white/10' : 'border-gray-50'}`}>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl ${idx === 1 ? 'bg-white/10 text-white' : 'bg-gray-50 text-gray-400'}`}>{text.author.charAt(0)}</div>
                <p className="text-sm font-black">{text.author}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Media Gallery */}
      <section className="bg-gray-900 py-32 rounded-[5rem] px-8 space-y-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-[120px]"></div>
        </div>
        <div className="text-center relative z-10">
          <h2 className="text-5xl font-black text-white mb-6 tracking-tight">معرض المبدعين</h2>
          <p className="text-teal-400 font-black uppercase tracking-[0.2em] text-[10px]">رؤى بصرية تكسر الحدود</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
          {media.map(item => (
            <motion.div 
              key={item.id} 
              whileHover={{ scale: 1.02 }}
              className="group relative rounded-[3rem] overflow-hidden aspect-[4/5] shadow-2xl"
            >
              <img src={item.thumbnail || item.url} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-10">
                <p className="text-teal-400 text-[10px] font-black uppercase tracking-widest mb-3">{item.type === 'video' ? 'فيديو إبداعي' : 'عمل فني'}</p>
                <h4 className="text-white text-2xl font-black mb-3">{item.title}</h4>
                <p className="text-gray-400 text-sm font-bold">بأنامل المبدع: {item.creator}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Member Names Carousel-style List */}
      <section className="space-y-16">
        <div className="text-center">
          <h2 className="text-4xl font-black text-gray-900 mb-4">عائلة منصة مبدعون</h2>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">فخورون بـ 500+ عضو يشاركوننا المسيرة</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {members.map(member => (
            <div key={member.id} className="bg-white border border-gray-100 px-6 py-4 rounded-2xl flex items-center gap-4 hover:border-teal-500 transition-colors shadow-sm">
              <img src={member.avatar} alt="" className="w-10 h-10 rounded-full" />
              <div>
                <p className="text-sm font-black text-gray-900 leading-tight">{member.fullName}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{member.specialty[0]}</p>
              </div>
            </div>
          ))}
          <div className="bg-teal-600 px-6 py-4 rounded-2xl flex items-center gap-4 text-white font-black text-sm">
            + 495 مبدع آخر
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative p-12 md:p-24 rounded-[4rem] overflow-hidden shadow-2xl bg-gray-900 text-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-600/20 rounded-full -mr-64 -mt-64 blur-[100px]"></div>
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-10">
          <h2 className="text-4xl md:text-6xl font-black leading-tight">كن جزءاً من الحكاية القادمة</h2>
          <p className="text-gray-400 text-lg font-medium leading-relaxed">
            نفتح باب العضويات في دورات ربع سنوية. سجل اهتمامك لنرسل لك تنبيهاً عند بدء التقديم للدورة القادمة.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input 
              type="email" 
              placeholder="بريدك الإلكتروني" 
              className="flex-1 bg-white/5 border border-white/10 text-white rounded-2xl px-8 py-5 focus:ring-2 focus:ring-teal-500 outline-none placeholder:text-gray-600 font-bold"
            />
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-10 py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-teal-900/50">
              سجلني الآن
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GuestView;
