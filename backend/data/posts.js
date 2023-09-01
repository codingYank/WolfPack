const posts = [
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
  {
    _id: 2,
    user: {
      _id: 2,
      handle: "@ao",
      name: "AO",
      profilePic: "/images/logo.jpg",
      profileDescription: "HOWWWLLLLL!!!!! WE'RE HERE!!!",
      posts: [
        {
          _id: 2,
          user: {
            _id: 2,
            handle: "@ao",
            profilePic: "/images/logo.jpg",
            profileDescription: "HOWWWLLLLL!!!!! WE'RE HERE!!!",
            posts: [],
            likes: [],
            following: [],
            folowers: [],
          },
          content: "Our first howwlll",
          image: "",
          comments: [],
        },
      ],
      likes: [], //array of posts
      following: [], // array of users
      folowers: [], // array of users
    },
    content: "Our first howwlll",
    image: "",
    comments: [], //array of comments
  },
]

export default posts
