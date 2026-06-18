import { db } from '../config/firebase'; 
import { collection, query, orderBy, limit, startAfter, getDocs, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

export const fetchFeedPosts = async (lastVisiblePost = null, pageSize = 10) => {
  try {
    let postsQuery;
    const postsRef = collection(db, 'posts');
    
    if (lastVisiblePost) {
      postsQuery = query(
        postsRef,
        orderBy('createdAt', 'desc'),
        startAfter(lastVisiblePost),
        limit(pageSize)
      );
    } else {
      postsQuery = query(
        postsRef,
        orderBy('createdAt', 'desc'),
        limit(pageSize)
      );
    }
    
    const querySnapshot = await getDocs(postsQuery);
    const posts = [];
    
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    
    return { posts, lastVisible };
  } catch (error) {
    console.error("Error fetching feed:", error);
    throw error;
  }
};

export const toggleLikePost = async (postId, currentUserId, hasLiked) => {
  try {
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, {
      likes: hasLiked ? arrayRemove(currentUserId) : arrayUnion(currentUserId)
    });
    return true;
  } catch (error) {
    console.error("Error toggling like:", error);
    throw error;
  }
};

export const toggleFollowUser = async (currentUserId, targetUserId, isFollowing) => {
  try {
    const currentUserRef = doc(db, 'users', currentUserId);
    const targetUserRef = doc(db, 'users', targetUserId);

    await updateDoc(currentUserRef, {
      following: isFollowing ? arrayRemove(targetUserId) : arrayUnion(targetUserId)
    });

    await updateDoc(targetUserRef, {
      followers: isFollowing ? arrayRemove(currentUserId) : arrayUnion(currentUserId)
    });

    return true;
  } catch (error) {
    console.error("Error toggling follow:", error);
    throw error;
  }
};