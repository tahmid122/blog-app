import { Router } from "express";
import { PostsController } from "./post.controller";

const router = Router();

// create post
router.post("/", PostsController.createPost);

export const postRoutes: Router = router;
