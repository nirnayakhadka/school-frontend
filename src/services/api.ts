// src/services/api.ts
import axios from 'axios';
import type { SocialPost } from '../types/index.ts';

const API_BASE = '/mock';

export const fetchFacebookPosts = async (): Promise<SocialPost[]> => {
  try {
    const response = await axios.get(`${API_BASE}/facebook-posts.json`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Facebook posts:', error);
    return [];
  }
};

export const fetchTikTokPosts = async (): Promise<SocialPost[]> => {
  try {
    const response = await axios.get(`${API_BASE}/tiktok-posts.json`);
    return response.data;
  } catch (error) {
    console.error('Error fetching TikTok posts:', error);
    return [];
  }
};

export const fetchAllSocialPosts = async (): Promise<SocialPost[]> => {
  const [facebookPosts, tiktokPosts] = await Promise.all([
    fetchFacebookPosts(),
    fetchTikTokPosts(),
  ]);
  // Combine and sort by date (newest first)
  return [...facebookPosts, ...tiktokPosts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};