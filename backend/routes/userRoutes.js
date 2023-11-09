import express from "express"
import {
  authUser,
  followUser,
  getUserByID,
  getUserFollowersById,
  getUserFollowingById,
  getUserProfile,
  logoutUser,
  registerUser,
  reqestResetPassword,
  resetPassword,
  searchUser,
  unfollowUser,
  updateUserProfile,
  verifyUserEmail,
} from "../controllers/userController.js"
import { protect } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route("/").post(registerUser)
router.post("/logout", logoutUser)
router.post("/login", authUser)
router.post("/requestPasswordReset", reqestResetPassword)
router.post("/resetPassword", resetPassword)
router.post("/verify", verifyUserEmail)
router.route("/search").get(searchUser)
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router.route("/:id").get(getUserByID)
router.route("/follow/:id").post(protect, followUser)
router.route("/unfollow/:id").post(protect, unfollowUser)
router.route("/:id/following").get(getUserFollowingById)
router.route("/:id/followers").get(getUserFollowersById)

export default router
