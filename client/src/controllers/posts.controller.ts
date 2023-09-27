import { Post } from "../models/Post.model";

export const getPosts = async () => {
  const res = await fetch("http://localhost:3000/api/posts");
  const posts = await res.json();
  return posts as Post[];
};

export const getPostById = async (id: number) => {
  const res = await fetch(`http://localhost:3000/api/posts/${id}`);
  const post = await res.json();
  return post as Post;
};

export const createPost = async (title: string) => {
  const res = await fetch("http://localhost:3000/api/posts", {
    method: "POST",
    body: JSON.stringify({ title }),
    headers: { "Content-Type": "application/json" },
  });
  const post = await res.json();
  return post as Post;
};
