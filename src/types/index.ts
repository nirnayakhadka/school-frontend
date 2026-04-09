
export interface SocialPost {
  id: string;
  platform: 'facebook' | 'tiktok';
  thumbnail: string;
  caption: string;
  link: string;
  createdAt: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface GalleryImage {
  id: number;
  src: string;
  title: string;
  category: string;
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}