import express from "express"
const router = express.Router()
import {
  getPosts,
  getPostById,
  getMyPosts,
  getMyFeed,
} from "../controllers/postController.js"
import { protect } from "../middleware/authMiddleware.js"

router.route("/").get(getPosts)
router.route("/myposts").get(protect, getMyPosts)
router.route("/feed").get(protect, getMyFeed)
router.route("/:id").get(getPostById)

export default router
