import asyncHandler from "../middleware/asyncHandler.js"
import Post from "../models/post.js"
import User from "../models/user.js"

//@desc fetches all posts
//@route GET /api/posts
//@access Public
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ parent: null })
    .populate("user")
    .sort("-createdAt")
  res.json(posts)
})

//@desc fetches posts by signed in user's following
//@route GET /api/posts/feed
//@access Private
const getMyFeed = asyncHandler(async (req, res) => {
  const posts = await Post.find({
    $or: [
      { user: req.user.following, repostedBy: null },
      { user: req.user._id, repostedBy: null },
      { repostedBy: req.user.following },
      { repostedBy: req.user._id },
    ],
    parent: null,
  })
    .populate("user")
    .populate("quoting")
    .populate("repostedBy")
    .sort("-createdAt")
  res.json(posts)
})

//@desc fetches signed in user posts
//@route GET /api/posts/myposts
//@access Public
const getMyPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.user._id, parent: null })
    .populate("user")
    .populate("quoting")
    .populate("repostedBy")
    .sort("-createdAt")
  res.json(posts)
})

//@desc fetches user posts
//@route GET /api/posts/user
//@access Public
const getPostsByUserId = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.params.id, parent: null })
    .populate("user")
    .populate("quoting")
    .populate("repostedBy")
    .sort("-createdAt")
  res.json(posts)
})

//@desc fetches a post
//@route GET /api/posts/:id
//@access Public
const getPostById = asyncHandler(async (req, res) => {
  let post = await Post.findById(req.params.id)
    .populate("user")
    .populate("quoting")
    .populate("repostedBy")
    .populate({
      path: "comments",
      model: "Post",
      populate: {
        path: "user",
        model: "User",
      },
    })

  if (post) {
    return res.status(200).json(post)
  } else {
    res.status(404)
    throw new Error("Resource not found")
  }
})

//@desc Creates new post
//@route POST /api/posts/
//@access Private
const createPost = asyncHandler(async (req, res) => {
  const post = new Post({
    user: req.user._id,
    content: req.body.content,
    image: req.body.image,
  })

  const createdPost = await post.save()
  res.status(201).json(createdPost)
})

//@desc Creates new comment
//@route POST /api/posts/:id
//@access Private
const createComment = asyncHandler(async (req, res) => {
  const findPost = await Post.findById(req.params.id)

  if (findPost) {
    const comment = new Post({
      user: req.user._id,
      content: req.body.content,
      image: req.body.image,
      parent: req.params.id,
    })

    const createdComment = await comment.save()

    const post = await Post.findByIdAndUpdate(req.params.id, {
      $push: {
        comments: createdComment._id,
      },
    })
    res.status(201).json(createdComment)
  }
})

// @desc Like post
//@route POST /api/posts/like/:id
//@access Private
const likePost = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  const post = await Post.findById(req.params.id)

  if (user && post) {
    if (user.likes.includes(post._id)) {
      throw new Error("User already liked post")
    } else if (post.likes.includes(user._id)) {
      throw new Error("Post already liked by user")
    } else {
      user.likes.push(post._id)
      post.likes.push(user._id)
      const updatesUser = await user.save()
      await post.save()
      res.json({
        _id: updatesUser._id,
        name: updatesUser.name,
        handle: updatesUser.handle,
        profilePicture: updatesUser.profilePicture,
        description: updatesUser.description,
        followers: updatesUser.followers,
        following: updatesUser.following,
        likes: updatesUser.likes,
      })
    }
  } else {
    throw new Error("Resource not found")
  }
})

// @desc unlike post
//@route POST /api/posts/unlike/:id
//@access Private
const unLikePost = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user._id, {
    $pull: {
      likes: req.params.id,
    },
  })
  const post = await Post.findByIdAndUpdate(req.params.id, {
    $pull: {
      likes: req.user.id,
    },
  })
  const updatedUser = await User.findById(req.user._id)
  console.log(updatedUser)
  res.status(201).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    handle: updatedUser.handle,
    profilePicture: updatedUser.profilePicture,
    description: updatedUser.description,
    followers: updatedUser.followers,
    following: updatedUser.following,
    likes: updatedUser.likes,
  })
})

// @desc repost post
//@route POST /api/posts/repost/:id
//@access Private
const repost = asyncHandler(async (req, res) => {
  // const user = await User.findById(req.user._id)/
  const post = await Post.findByIdAndUpdate(req.params.id, {
    $push: {
      reposts: req.user._id,
    },
  })

  if (post) {
    const repost = new Post({
      user: post.user,
      repostedBy: req.user._id,
      quoting: post._id,
      // content: post.content,
      // image: post.image,
    })
    await repost.save()

    const updatedUser = await User.findById(req.user._id)
    console.log(updatedUser)
    res.status(201).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      handle: updatedUser.handle,
      profilePicture: updatedUser.profilePicture,
      description: updatedUser.description,
      followers: updatedUser.followers,
      following: updatedUser.following,
      likes: updatedUser.likes,
    })
  }
})

// @desc unRepost post
//@route POST /api/posts/unrepost/:id
//@access Private
const unRepost = asyncHandler(async (req, res) => {
  const ogPost = await Post.findByIdAndUpdate(req.params.id, {
    $pull: {
      reposts: req.user._id,
    },
  })

  if (ogPost) {
    await Post.deleteMany({
      quoting: ogPost.id,
      repostedBy: req.user.id,
    })
  } else {
    throw new Error("Resource not found")
  }
})

const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (post) {
    if (post.parent) {
      await Post.findByIdAndUpdate(post.parent, {
        $pull: {
          comments: post._id,
        },
      })
    }
    await Post.deleteOne({ _id: post._id })
    res.status(200)
  }
})

export {
  getPostById,
  getPosts,
  getMyPosts,
  getMyFeed,
  createPost,
  createComment,
  getPostsByUserId,
  likePost,
  unLikePost,
  repost,
  unRepost,
  deletePost,
}
