import mongoose from "mongoose"
import dotenv from "dotenv"
import colors from "colors"
import users from "./data/users.js"
import posts from "./data/posts.js"
import User from "./models/user.js"
import Post from "./models/post.js"
import connectDB from "./config/db.js"
import comments from "./data/comments.js"

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await User.deleteMany()
    await Post.deleteMany()

    const createdUsers = await User.insertMany(users)

    const admin = createdUsers[0]._id
    const tyler = createdUsers[1]._id

    const sampleComments = comments.map((comment, index) => {
      if (index === 0) {
        return { ...comment, user: tyler }
      }
    })

    const createdComments = await Post.insertMany(sampleComments)

    const comment = createdComments[0]._id

    const samplePosts = posts.map((post, index) => {
      if (index === 0) {
        return { ...post, user: tyler }
      } else if (index === 1) {
        return { ...post, user: admin, comments: [comment] }
      }
    })

    await Post.insertMany(samplePosts)

    console.log("Data imported".green.inverse)
    process.exit()
  } catch (error) {
    console.log(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await User.deleteMany()
    await Post.deleteMany()

    console.log("Data Destroyed".red.inverse)
    process.exit()
  } catch (error) {
    console.log(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === "-d") {
  destroyData()
} else {
  importData()
}
