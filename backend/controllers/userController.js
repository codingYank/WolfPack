import asyncHandler from "../middleware/asyncHandler.js"
import User from "../models/user.js"
import generateToken from "../utils/generateToken.js"

//@desc Auth user & get token
//@route POST /api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id)

    res.json({
      _id: user._id,
      name: user.name,
      handle: user.handle,
      profilePicture: user.profilePicture,
      description: user.description,
      followers: user.followers,
      following: user.following,
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
  const {
    email,
    password,
    confirmPassword,
    handle,
    name,
    profilePicture,
    description,
  } = req.body

  if (password !== confirmPassword) {
    throw new Error("Passwords don't match")
  }

  const userExists = await User.findOne({ email })
  const handleTaken = await User.findOne({ handle })

  if (userExists) {
    res.status(400)
    throw new Error("Email already used")
  } else if (handleTaken) {
    res.status(400)
    throw new Error("Handle not available")
  }

  let profilePic = profilePicture || "/images/logo.jpg"
  let desc = description || ""

  const user = await User.create({
    name,
    email,
    password,
    handle,
    profilePicture: profilePic,
    description: desc,
  })

  if (user) {
    generateToken(res, user._id)

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      handle: user.handle,
      profilePicture: user.profilePicture,
      description: user.description,
    })
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})

//@desc logout user & destroy token
//@route POST /api/users/logout
//@access Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  })

  res.status(200).json({ message: "Logged out successfully" })
})

//@desc Get user profile
//@route GET /api/users/profile
//@access Public
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      handle: user.handle,
      profilePicture: user.profilePicture,
      description: user.description,
      followers: user.followers,
      following: user.following,
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

//@desc update user profile
//@route PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.handle = req.body.handle || user.handle
    user.profilePicture = req.body.profilePicture || user.profilePicture
    user.description = req.body.description || user.description

    const updatedUser = await user.save()

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      handle: updatedUser.handle,
      profilePicture: updatedUser.profilePicture,
      description: updatedUser.description,
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
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
  const user = await User.findById(req.params.id)

  if (user) {
    res.status(200).json(user)
  } else {
    throw new Error("Resource not found")
  }
})

//@desc Follow user
//@route POST /api/users/follow/:id
//@access Private
const followUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  const otheruser = await User.findById(req.params.id)

  if (user && otheruser) {
    if (user.following.includes(req.params.id)) {
      throw new Error("Already following")
    } else {
      user.following.push(req.params.id)
      otheruser.followers.push(req.user._id)
      await otheruser.save()
      const updatedUser = await user.save()
      console.log(updatedUser)
      res.status(201).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        handle: updatedUser.handle,
        profilePicture: updatedUser.profilePicture,
        description: updatedUser.description,
        followers: updatedUser.followers,
        following: updatedUser.following,
      })
    }
  } else {
    throw new Error("Resourse not found")
  }
})

const unfollowUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  const otheruser = await User.findById(req.params.id)

  if (user && otheruser) {
    user.following.indexOf(req.params.id) &&
      user.following.splice(user.following.indexOf(req.params.id))
    const updatedUser = await user.save()

    otheruser.followers.indexOf(req.user.id) &&
      otheruser.followers.splice(otheruser.followers.indexOf(req.user.id))
    await otheruser.save()

    res.status(201).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      handle: updatedUser.handle,
      profilePicture: updatedUser.profilePicture,
      description: updatedUser.description,
      followers: updatedUser.followers,
      following: updatedUser.following,
    })
  } else {
    throw new Error("Resourse not found")
  }
})

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getUserByID,
  followUser,
  unfollowUser,
}
