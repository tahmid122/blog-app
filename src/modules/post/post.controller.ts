import { Request, Response } from "express";
import { PostService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  try {
    const result = await PostService.createPost(req.body);
    res.status(201).send({ success: true, result });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Post creating failed", details: error });
  }
};

export const PostsController = { createPost };
