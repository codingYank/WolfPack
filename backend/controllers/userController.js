import asyncHandler from "../middleware/asyncHandler.js"
import User from "../models/user.js"
import generateToken from "../utils/generateToken.js"
import { sendEmail } from "../utils/sendEmail.js"

//@desc Auth user & get token
//@route POST /api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    if (user && !user.emailVerified) {
      user.verificationCode = Math.floor(100000 + Math.random() * 900000)
      await user.save()
      sendEmail(
        user.email,
        "Verification Code",
        `Your verification code is ${user.verificationCode}.`
      )
    }
    generateToken(res, user._id)

    res.json({
      _id: user._id,
      name: user.name,
      handle: user.handle,
      profilePicture: user.profilePicture,
      description: user.description,
      followers: user.followers,
      following: user.following,
      likes: user.likes,
      emailVerified: user.emailVerified,
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

  let profilePic = profilePicture || "/images/logo.png"
  let desc = description || ""
  let verificationCode = Math.floor(100000 + Math.random() * 900000)

  const user = await User.create({
    name,
    email,
    password,
    handle,
    profilePicture: profilePic,
    description: desc,
    verificationCode,
  })

  if (user) {
    generateToken(res, user._id)
    sendEmail(
      user.email,
      "Verification Code",
      `Your verification code is ${user.verificationCode}.`
    )

    res.status(201).json({
      _id: user._id,
      name: user.name,
      handle: user.handle,
      profilePicture: user.profilePicture,
      description: user.description,
      followers: user.followers,
      following: user.following,
      likes: user.likes,
      emailVerified: user.emailVerified,
    })
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})

const verifyUserEmail = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.id)

  if (user && user.verificationCode == req.body.verificationCode) {
    user.emailVerified = true
    user.verificationCode = ""
    await user.save()
    res.json({
      _id: user._id,
      name: user.name,
      handle: user.handle,
      profilePicture: user.profilePicture,
      description: user.description,
      followers: user.followers,
      following: user.following,
      likes: user.likes,
      emailVerified: user.emailVerified,
    })
  } else {
    throw new Error("Invalid Code")
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
      _id: user._id,
      name: user.name,
      handle: user.handle,
      profilePicture: user.profilePicture,
      description: user.description,
      followers: user.followers,
      following: user.following,
      likes: user.likes,
      emailVerified: user.emailVerified,
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

//@desc Returns Users that match query
//@route GET /api/users/search
//@access Public
const searchUser = asyncHandler(async (req, res) => {
  if (req.query.keyword) {
    const users = await User.find({
      $or: [
        { name: { $regex: req.query.keyword, $options: "i" } },
        { handle: { $regex: req.query.keyword, $options: "i" } },
      ],
    })

    if (users) {
      res.status(200).json(users)
    } else {
      throw new Error("Resource not found")
    }
  }
  res.json([])
})

//@desc Get user by name
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
      otheruser.followers.push(req.user.id)
      await otheruser.save()
      const updatedUser = await user.save()
      res.status(201).json({
        _id: user._id,
        name: user.name,
        handle: user.handle,
        profilePicture: user.profilePicture,
        description: user.description,
        followers: user.followers,
        following: user.following,
        likes: user.likes,
        emailVerified: user.emailVerified,
      })
    }
  } else {
    throw new Error("Resourse not found")
  }
})

const unfollowUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user._id, {
    $pull: {
      following: req.params.id,
    },
  })
  const otheruser = await User.findByIdAndUpdate(req.params.id, {
    $pull: {
      followers: req.user.id,
    },
  })
  await otheruser.save()
  const updatedUser = await User.findById(req.user._id)
  console.log(updatedUser)
  res.status(201).json({
    _id: user._id,
    name: user.name,
    handle: user.handle,
    profilePicture: user.profilePicture,
    description: user.description,
    followers: user.followers,
    following: user.following,
    likes: user.likes,
    emailVerified: user.emailVerified,
  })
})

const getUserFollowingById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).populate({
    path: "following",
    model: "User",
  })

  if (user) {
    return res.status(200).json(user.following)
  } else {
    res.status(404)
    throw new Error("Resource not found")
  }
})

const getUserFollowersById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).populate({
    path: "followers",
    model: "User",
  })

  if (user) {
    return res.status(200).json(user.followers)
  } else {
    res.status(404)
    throw new Error("Resource not found")
  }
})

export {
  authUser,
  registerUser,
  verifyUserEmail,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getUserByID,
  searchUser,
  followUser,
  unfollowUser,
  getUserFollowingById,
  getUserFollowersById,
}
