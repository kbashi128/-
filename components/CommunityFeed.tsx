
import React, { useState, useEffect, useRef } from 'react';
import { User, Post } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, Send, X, MessageSquare, Heart, Share2 } from 'lucide-react';

interface CommunityFeedProps {
  currentUser: User | null;
  isGuest?: boolean;
}

const CommunityFeed: React.FC<CommunityFeedProps> = ({ currentUser, isGuest }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const socket = new WebSocket(`${protocol}//${window.location.host}`);

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'SYNC_POSTS') {
          setPosts(data.payload);
        } else if (data.type === 'NEW_POST') {
          setPosts(prev => {
            if (prev.some(p => p.id === data.payload.id)) return prev;
            return [data.payload, ...prev];
          });
        }
      } catch (err) {
        console.error('Error parsing socket message:', err);
      }
    };

    socketRef.current = socket;
    return () => socket.close();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = () => {
    if (!currentUser || (!content.trim() && !image)) return;
    
    const newPost: Post = {
      id: Date.now().toString(),
      userId: currentUser.id,
      userName: currentUser.fullName,
      userAvatar: currentUser.avatar,
      content,
      imageUrl: image || undefined,
      createdAt: new Date().toISOString()
    };

    socketRef.current?.send(JSON.stringify({ type: 'NEW_POST', payload: newPost }));
    
    setContent('');
    setImage(null);
    setIsPosting(false);
  };

  return (
    <div className="space-y-8">
      {/* Post Creation - Only for Members */}
      {!isGuest && currentUser && (
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/50 p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
          <div className="flex gap-6 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center flex-shrink-0 overflow-hidden shadow-lg p-0.5">
              {currentUser.avatar ? (
                <img src={currentUser.avatar} alt={currentUser.fullName} className="w-full h-full object-cover rounded-[14px]" referrerPolicy="no-referrer" />
              ) : (
                <span className="text-white font-black text-xl">{currentUser.fullName.charAt(0)}</span>
              )}
            </div>
            <div className="flex-1 space-y-5">
              <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={`بماذا تفكر يا ${currentUser.fullName.split(' ')[0]}؟ شاركنا إبداعك اليوم...`}
                className="w-full bg-gray-50/50 border border-gray-100 rounded-[1.5rem] p-6 text-base outline-none focus:ring-4 focus:ring-teal-500/10 focus:bg-white transition-all min-h-[120px] resize-none font-medium"
              />
              
              {image && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative inline-block"
                >
                  <img src={image} alt="Preview" className="max-h-72 rounded-[2rem] border-4 border-white shadow-2xl" referrerPolicy="no-referrer" />
                  <button 
                    onClick={() => setImage(null)}
                    className="absolute -top-3 -right-3 bg-red-500 text-white p-2 rounded-full shadow-xl hover:bg-red-600 transition-all active:scale-90"
                  >
                    <X size={16} />
                  </button>
                </motion.div>
              )}

              <div className="flex items-center justify-between pt-2">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-3 text-gray-500 hover:text-teal-600 transition-all text-xs font-black uppercase tracking-widest bg-gray-50 px-5 py-3 rounded-xl hover:bg-teal-50"
                >
                  <ImageIcon size={20} />
                  <span>إرفاق صورة</span>
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  accept="image/*" 
                  className="hidden" 
                />
                
                <button 
                  onClick={handlePost}
                  disabled={!content.trim() && !image}
                  className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-3 hover:from-teal-500 hover:to-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-teal-900/20 active:scale-95"
                >
                  <Send size={18} />
                  <span>نشر الإبداع</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feed */}
      <div className="space-y-10">
        <AnimatePresence mode="popLayout">
          {posts.map((post) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/40 overflow-hidden hover:shadow-2xl transition-all duration-500 group"
            >
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100 shadow-sm">
                    {post.userAvatar ? (
                      <img src={post.userAvatar} alt={post.userName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <span className="text-gray-400 font-black text-lg">{post.userName.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-base font-black text-gray-900 tracking-tight">{post.userName}</h4>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-0.5">
                      {new Date(post.createdAt).toLocaleDateString('ar-SA', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 text-lg leading-relaxed mb-8 whitespace-pre-wrap font-medium">
                  {post.content}
                </p>

                {post.imageUrl && (
                  <div className="rounded-[2.5rem] overflow-hidden border border-gray-50 mb-8 shadow-inner">
                    <img src={post.imageUrl} alt="Post content" className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-[2s]" referrerPolicy="no-referrer" />
                  </div>
                )}

                <div className="flex items-center gap-8 pt-6 border-t border-gray-50">
                  <button className="flex items-center gap-2.5 text-gray-400 hover:text-red-500 transition-all text-xs font-black uppercase tracking-widest group/btn">
                    <div className="p-2 rounded-xl group-hover/btn:bg-red-50 transition-all">
                      <Heart size={20} />
                    </div>
                    <span>إعجاب</span>
                  </button>
                  <button className="flex items-center gap-2.5 text-gray-400 hover:text-teal-600 transition-all text-xs font-black uppercase tracking-widest group/btn">
                    <div className="p-2 rounded-xl group-hover/btn:bg-teal-50 transition-all">
                      <MessageSquare size={20} />
                    </div>
                    <span>تعليق</span>
                  </button>
                  <button className="flex items-center gap-2.5 text-gray-400 hover:text-blue-500 transition-all text-xs font-black uppercase tracking-widest group/btn mr-auto">
                    <div className="p-2 rounded-xl group-hover/btn:bg-blue-50 transition-all">
                      <Share2 size={20} />
                    </div>
                    <span>مشاركة</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {posts.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 text-gray-300">
              <ImageIcon size={32} />
            </div>
            <h3 className="text-gray-500 font-black">لا توجد منشورات بعد</h3>
            <p className="text-gray-400 text-xs mt-1">كن أول من يشارك إبداعه اليوم!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityFeed;
