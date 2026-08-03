import { Request, Response } from "express";
import { PostService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  console.log(req.user);
  try {
    const result = await PostService.createPost(
      req.body,
      req.user?.id as string,
    );
    res.status(201).send({ success: true, result });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Post creating failed", details: error });
  }
};

// get posts
const getPosts = async (req: Request, res: Response) => {
  try {
    const result = await PostService.getPosts();
    res.status(200).send({ success: true, result });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Post creating failed", details: error });
  }
};

export const PostsController = { createPost, getPosts };
