import { Post } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createPost = async (
  data: Omit<Post, "id" | "createdAt" | "updatedAt" | "authorId">,
  userId: string,
) => {
  const result = await prisma.post.create({
    data: {
      authorId: userId,
      title: data.title,
      content: data.content,
      tags: data.tags,
    },
  });
  return result;
};

// get posts
const getPosts = async () => {
  const result = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });
  return result;
};

export const PostService = { createPost, getPosts };
