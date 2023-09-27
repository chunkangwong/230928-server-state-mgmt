import { useMutation, useQuery } from "@tanstack/react-query";
import "./App.css";
import { createPost, getPosts } from "./controllers/posts.controller";
import { useState } from "react";

function App() {
  const [title, setTitle] = useState("");

  const {
    data: posts,
    refetch,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["fetchPosts"],
    queryFn: getPosts,
  });

  const { mutateAsync, isLoading: isCreatingPost } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      refetch();
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTitle("");
    await mutateAsync(title);
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
      </form>
      {isFetching ? <p>Loading...</p> : null}
      {error ? <p>{(error as Error).message}</p> : null}
      <ul>
        {posts?.map((post) => {
          return <li key={post.id}>{post.title}</li>;
        })}
      </ul>
    </>
  );
}

export default App;
