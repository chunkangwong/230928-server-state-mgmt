import { expect, test } from "bun:test";
import postsController from "../controllers/posts.controller";

const baseUrl = "http://localhost:3000/api/posts";

test("can get posts via controller", async () => {
  const posts = await postsController.getPosts();
  expect(posts.length).toBeGreaterThan(0);
});

test("can get post by id via controller", async () => {
  const post = await postsController.getPostById(1);
  expect(post).not.toBeNull();
});

test("can create post via controller", async () => {
  const post = await postsController.createPost("test");
  expect(post).not.toBeNull();
});

test("can get posts via API", async () => {
  const res = await fetch(baseUrl);
  const posts = await res.json();
  expect(posts).toHaveLength(2);
});

test("can get post by id via API", async () => {
  const res = await fetch(`${baseUrl}/1`);
  const post = await res.json();
  expect(post.id).toBe(1);
});

test("can create post via API", async () => {
  const res = await fetch(baseUrl, {
    method: "POST",
    body: JSON.stringify({ title: "test" }),
    headers: { "Content-Type": "application/json" },
  });
  const post = await res.json();
  expect(post).not.toBeNull();
});
