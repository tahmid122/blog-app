import { Router } from "express";
import { PostsController } from "./post.controller";
import { auth, UserRole } from "../../middleware/auth";

const router = Router();

// create post
router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.USER),
  PostsController.createPost,
);
// get posts
router.get("/", PostsController.getPosts);

export const postRoutes: Router = router;
