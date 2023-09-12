import express from "express"
const router = express.Router()
import {
  getPosts,
  getPostById,
  getMyPosts,
} from "../controllers/postController.js"

router.route("/").get(getPosts)
router.route("/myposts").get(getMyPosts)
router.route("/:id").get(getPostById)

export default router
