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
    .populate({
      path: "comments",
      model: "Post",
      populate: {
        path: "user",
        model: "User",
      },
    })

  // const comments = post.comments.map(
  //   asyncHandler(async (comment) => {
  //     const user = await User.findById(comment.user).then((user) => {
  //       return user
  //       // console.log(user)
  //     })
  //     // console.log(user)
  //     comment.user = user
  //     return comment
  //   })
  // )
  // return comment

  // console.log(comments)
  // post.comments = comments

  // console.log(post.comments)

  if (post) {
    return res.status(200).json(post)
  } else {
    res.status(404)
    throw new Error("Resource not found")
  }
})

export { getPostById, getPosts }
