import express from "express"
import {
  authUser,
  getUserByID,
  getUserProfile,
  logoutUser,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js"
const router = express.Router()

router.route("/").post(registerUser)
router.post("/logout", logoutUser)
router.post("/login", authUser)
router.route("/profile").get(getUserProfile).put(updateUserProfile)
router.route("/:id").get(getUserByID)

export default router
