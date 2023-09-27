import { useMutation, useQuery } from "@tanstack/react-query";
import "./App.css";
import { createPost, getPosts } from "./controllers/posts.controller";
import { useState } from "react";

function App() {
  const [title, setTitle] = useState("");

  const {
    data: posts,
    isFetching,
    error: fetchPostsError,
    refetch,
  } = useQuery({
    queryKey: ["fetchPosts"],
    queryFn: async () => {
      const posts = await getPosts();
      return posts;
    },
  });

  const {
    mutateAsync,
    isLoading: isCreatingPost,
    error: createPostError,
  } = useMutation({
    mutationFn: async (title: string) => {
      const newPost = await createPost(title);
      return newPost;
    },
    onSuccess: () => {
      refetch();
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutateAsync(title);
    setTitle("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          type="text"
          placeholder="Add new post"
          autoFocus
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isCreatingPost}
        />
        <button type="submit" disabled={isCreatingPost}>
          {isCreatingPost ? "Creating..." : "Create"}
        </button>
        {createPostError ? <p>{(createPostError as Error).message}</p> : null}
      </form>
      {isFetching ? <p>Loading...</p> : null}
      {fetchPostsError ? <p>{(fetchPostsError as Error).message}</p> : null}
      <ul>
        {posts?.map((post) => {
          return <li key={post.id}>{post.title}</li>;
        })}
      </ul>
    </>
  );
}

export default App;
