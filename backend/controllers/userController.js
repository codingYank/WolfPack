import asyncHandler from "../middleware/asyncHandler.js"
import User from "../models/user.js"
import jwt from "jsonwebtoken"

//@desc Auth user & get token
//@route POST /api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    })

    // set JWT as HTTP-Only cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    })

    res.json({
      _id: user._id,
      name: user.name,
      handle: user.handle,
      profilePicture: user.profilePicture,
      description: user.description,
    })
  } else {
    res.status(401)
    throw new Error("Invalid credientials")
  }
  res.send("auth user")
})

//@desc Register user & get token
//@route POST /api/users/
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  res.send("register user")
})

//@desc logout user & destroy token
//@route POST /api/users/logout
//@access Private
const logoutUser = asyncHandler(async (req, res) => {
  res.send("logout user")
})

//@desc Get user profile
//@route GET /api/users/profile
//@access Public
const getUserProfile = asyncHandler(async (req, res) => {
  res.send("get user profile")
})

//@desc update user profile
//@route PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update user profile")
})

//@desc Delete user profile
//@route DELETE /api/users/profile
//@access Public
const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user")
})

//@desc Get user by id
//@route GET /api/users/:id
//@access Public
const getUserByID = asyncHandler(async (req, res) => {
  res.send("get user by id")
})

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getUserByID,
}
