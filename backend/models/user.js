import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    handle: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    profilePicture: {
      type: String,
      // required: true,
    },
    verificationCode: {
      type: String,
    },
    resetPassword: {
      type: String,
    },
    emailVerified: {
      type: Boolean,
    },
    following: [],
    followers: [],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

userSchema.pre("save", async function (next) {
  if (!this.isModified("resetPassword")) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.resetPassword = await bcrypt.hash(this.resetPassword, salt)
})

userSchema.methods.matchCode = async function (enteredCode) {
  return await bcrypt.compare(enteredCode, this.resetPassword)
}

const User = mongoose.model("User", userSchema)

export default User
