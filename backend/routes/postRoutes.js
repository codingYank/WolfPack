import express from "express"
const router = express.Router()
import { getPosts, getPostById } from "../controllers/postController.js"

router.route("/").get(getPosts)
router.route("/:id").get(getPostById)

export default router
