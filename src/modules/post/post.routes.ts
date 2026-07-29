import { Router } from "express";
import { PostsController } from "./post.controller";

const router = Router();

// create post
router.post("/", PostsController.createPost);
// get posts
router.get("/", PostsController.getPosts);

export const postRoutes: Router = router;
