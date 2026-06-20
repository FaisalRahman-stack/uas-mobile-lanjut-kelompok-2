import { create } from 'zustand';

export const useSocialStore = create((set) => ({
  followingList: ['user_002', 'user_004'],
  
  toggleFollow: (userId) => set((state) => {
    const isCurrentlyFollowing = state.followingList.includes(userId);
    return {
      followingList: isCurrentlyFollowing
        ? state.followingList.filter((id) => id !== userId)
        : [...state.followingList, userId]
    };
  }),
}));