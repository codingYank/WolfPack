import express from "express"
const router = express.Router()
import {
  getPosts,
  getPostById,
  getMyPosts,
  getMyFeed,
  createPost,
  getPostsByUserId,
  likePost,
  unLikePost,
  repost,
} from "../controllers/postController.js"
import { protect } from "../middleware/authMiddleware.js"

router.route("/").get(getPosts).post(protect, createPost)
router.route("/myposts").get(protect, getMyPosts)
router.route("/feed").get(protect, getMyFeed)
router.route("/:id").get(getPostById)
router.route("/user/:id").get(getPostsByUserId)
router.route("/like/:id").post(protect, likePost)
router.route("/unlike/:id").post(protect, unLikePost)
router.route("/repost/:id").post(protect, repost)

export default router
