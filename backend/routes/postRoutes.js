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
  createComment,
  deletePost,
  unRepost,
  searchPosts,
  quotePost,
} from "../controllers/postController.js"
import { protect } from "../middleware/authMiddleware.js"

router.route("/").get(getPosts).post(protect, createPost)
router.route("/search").get(searchPosts)
router.route("/myposts").get(protect, getMyPosts)
router.route("/feed").get(protect, getMyFeed)
router
  .route("/:id")
  .get(getPostById)
  .post(protect, createComment)
  .delete(protect, deletePost)
router.route("/user/:id").get(getPostsByUserId)
router.route("/like/:id").post(protect, likePost)
router.route("/unlike/:id").post(protect, unLikePost)
router.route("/repost/:id").post(protect, repost)
router.route("/quotepost/:id").post(protect, quotePost)
router.route("/unrepost/:id").post(protect, unRepost)

export default router
