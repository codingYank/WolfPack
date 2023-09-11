import express from "express"
import {
  authUser,
  getUserByID,
  getUserProfile,
  logoutUser,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js"
import { protect } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route("/").post(registerUser)
router.post("/logout", logoutUser)
router.post("/login", authUser)
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router.route("/:id").get(getUserByID)

export default router
