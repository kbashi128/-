
export enum UserRole {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  GUEST = 'GUEST'
}

export interface User {
  id: string;
  username: string; // Used for Member ID (e.g., 31565L)
  fullName: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  joinDate: string;
  specialty: string[];
  group: string; // Group from the PDF (e.g., الإشراف, أوركيد, أيسل, الماروم)
  password?: string;
  readAnnouncements?: string[];
}

export interface AdminAnnouncement {
  id: string;
  content: string;
  createdAt: string;
}

export interface Memory {
  id: string;
  userId: string;
  userName: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
}

export interface Achievement {
  id: string;
  userId: string;
  title: string;
  description: string;
  date: string;
  imageUrl?: string;
}

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: string;
}

export interface PlatformText {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  date: string;
}

export interface PlatformLink {
  id: string;
  label: string;
  url: string;
  category: string;
}

export interface CreativeMedia {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  title: string;
  creator: string;
}
