export const posts = [
  {
    _id: 1,
    user: {
      _id: 1,
      handle: "@WolfPack",
      name: "WolfPack",
      profilePic: "/images/logo.jpg",
      profileDescription: "HOWWWLLLLL!!!!!",
      posts: [
        {
          _id: 1,
          user: {
            _id: 1,
            handle: "@WolfPack",
            profilePic: "/images/logo.jpg",
            profileDescription: "HOWWWLLLLL!!!!!",
            posts: [],
            likes: [],
            following: [],
            folowers: [],
          },
          content: "First Post",
          image: "",
          comments: [],
        },
      ],
      likes: [], //array of posts
      following: [], // array of users
      folowers: [], // array of users
    },
    content: "First Post",
    image: "",
    comments: [], //array of comments
  },
]
