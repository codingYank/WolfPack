import mongoose from "mongoose"

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    quoting: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    comments: [],
  },
  {
    timestamps: true,
  }
)

const Post = mongoose.model("Post", postSchema)

export default Post
