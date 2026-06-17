export const dummyPosts = [
  {
    postId: "post_001",
    userId: "user_002",
    username: "faisal_rahman",
    userPhoto: "https://picsum.photos/100",
    caption: "Latihan riff lagu Megadeth seru banget hari ini! 🎸",
    imageUrl: "https://picsum.photos/400?random=1",
    likes: ["user_ana_id"],
    createdAt: new Date().toISOString()
  },
  {
    postId: "post_002",
    userId: "user_003",
    username: "budi_is",
    userPhoto: "https://picsum.photos/101",
    caption: "Mencoba optimasi FlatList untuk ConnectSphere. Smooth banget!",
    imageUrl: "https://picsum.photos/400?random=2",
    likes: [],
    createdAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    postId: "post_003",
    userId: "user_004",
    username: "fathan_andhika",
    userPhoto: "https://picsum.photos/102",
    caption: "Kopi sore ditemani koding React Native + Expo SDK 50.",
    imageUrl: "https://picsum.photos/400?random=3",
    likes: ["user_002", "user_003"],
    createdAt: new Date(Date.now() - 7200000).toISOString()
  }
];