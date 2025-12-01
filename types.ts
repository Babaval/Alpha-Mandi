export enum Category {
  STARTER = 'Starters',
  MAIN = 'Mains',
  DESSERT = 'Desserts',
  DRINK = 'Drinks'
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Category;
  imageUrl: string;
  calories: number;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export type ViewState = 'HOME' | 'MENU' | 'CHECKOUT' | 'PROFILE' | 'SUCCESS' | 'TESTING' | 'RESERVATIONS';

export type AvatarMode = 'photo' | 'icon' | 'initials';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface OrderHistoryItem {
  id: string;
  date: string;
  items: string[];
  total: number;
  status: 'Delivered' | 'Processing' | 'Cancelled';
  pointsEarned: number;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address?: string;
  isLoggedIn: boolean;
  avatar?: string;
  joinDate?: string;
  tier?: 'Silver' | 'Gold' | 'Platinum';
  points?: number;
  orders?: OrderHistoryItem[];
  avatarMode?: AvatarMode;
  avatarUrl?: string;
  avatarIcon?: string;
}

export interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  avatar: string;
}

export interface Offer {
  id: number;
  title: string;
  description: string;
  code: string;
  discount: string;
  color: string;
}