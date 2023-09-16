import express from "express"
const router = express.Router()
import {
  getPosts,
  getPostById,
  getMyPosts,
  getMyFeed,
  createPost,
} from "../controllers/postController.js"
import { protect } from "../middleware/authMiddleware.js"

router.route("/").get(getPosts).post(protect, createPost)
router.route("/myposts").get(protect, getMyPosts)
router.route("/feed").get(protect, getMyFeed)
router.route("/:id").get(getPostById)

export default router
