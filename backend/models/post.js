import mongoose from "mongoose"

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    repostedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    deleted: {
      type: Boolean
    },
    content: {
      type: String,
    },
    image: {
      type: String,
    },
    quoting: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    reposts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    quotePosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
    strictPopulate: false,
  }
)

const Post = mongoose.model("Post", postSchema)

export default Post
