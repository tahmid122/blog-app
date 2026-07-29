import { Post } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createPost = async (
  data: Omit<Post, "id" | "createdAt" | "updatedAt">,
) => {
  const result = await prisma.post.create({ data });
  return result;
};

// get posts
const getPosts = async () => {
  const result = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });
  return result;
};

export const PostService = { createPost, getPosts };
