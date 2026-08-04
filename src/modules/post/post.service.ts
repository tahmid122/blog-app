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
const getPosts = async (payload: { search: string; tags: string[] }) => {
  const result = await prisma.post.findMany({
    where: {
      AND: [
        {
          OR: [
            { title: { contains: payload.search, mode: "insensitive" } },
            { content: { contains: payload.search, mode: "insensitive" } },
            { tags: { has: payload.search } },
          ],
        },
        {
          tags: {
            hasEvery: payload.tags,
          },
        },
      ],
    },
  });
  return result;
};

export const PostService = { createPost, getPosts };
