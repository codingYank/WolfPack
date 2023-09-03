import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    handle: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      required: true,
    },
    following: [],
    foloowers: [],
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model("User", userSchema)

export default User
