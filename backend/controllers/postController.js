import asyncHandler from "../middleware/asyncHandler.js"
import Post from "../models/post.js"
import User from "../models/user.js"

//@desc fetches all posts
//@route GET /api/posts
//@access Public
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).populate("user")
  res.json(posts)
})

//@desc fetches a post
//@route GET /api/posts/:id
//@access Public
const getPostById = asyncHandler(async (req, res) => {
  let post = await Post.findById(req.params.id)
    .populate("user")
    .populate("comments")

  // let comments = post.comments.map((comment) => {
  //   console.log(comment.user.valueOf())
  //   comment.user = comment.user.valueOf()
  //   return comment.user.populate("user")
  // const user = await User.findById(comment.user).then((user) => {
  //   comment.user = user
  // })
  // return comment

  // console.log(comments)
  // post.comments = comments

  // console.log(post)

  if (post) {
    return res.status(200).json(post)
  } else {
    res.status(404)
    throw new Error("Resource not found")
  }
})

export { getPostById, getPosts }
