import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createPost } from "../controllers/posts.controller";

const AddForm = () => {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");

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
      queryClient.invalidateQueries({
        queryKey: ["fetchPosts"],
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutateAsync(title);
    setTitle("");
  };

  return (
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
  );
};

export default AddForm;
