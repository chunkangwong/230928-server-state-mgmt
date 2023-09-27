import { useEffect, useState } from "react";
import "./App.css";
import { createPost, getPosts } from "./controllers/posts.controller";
import { Post } from "./models/Post.model";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isFetchingPosts, setIsFetchingPosts] = useState(false);
  const [fetchPostError, setFetchPostError] = useState<Error | null>(null);

  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [createPostError, setCreatePostError] = useState<Error | null>(null);

  const [title, setTitle] = useState("");

  useEffect(() => {
    const init = async () => {
      try {
        setIsFetchingPosts(true);
        const newPosts = await getPosts();
        setPosts(newPosts);
        setFetchPostError(null);
      } catch (error) {
        setFetchPostError(error as Error);
      } finally {
        setIsFetchingPosts(false);
      }
    };
    init();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsCreatingPost(true);
      const newPost = await createPost(title);
      setPosts([newPost, ...posts]);
      setCreatePostError(null);
    } catch (error) {
      setCreatePostError(error as Error);
      console.error(error);
    } finally {
      setIsCreatingPost(false);
      setTitle("");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          type="text"
          placeholder="Add new post"
          value={title}
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={isCreatingPost}
        />
        <button type="submit" disabled={isCreatingPost}>
          {isCreatingPost ? "Creating..." : "Create"}
        </button>
        {createPostError ? (
          <p style={{ color: "red" }}>{createPostError.message}</p>
        ) : null}
      </form>
      {isFetchingPosts ? <p>Loading...</p> : null}
      {fetchPostError ? (
        <p
          style={{
            color: "red",
          }}
        >
          {fetchPostError.message}
        </p>
      ) : null}
      <ul>
        {posts.map((post) => {
          return <li key={post.id}>{post.title}</li>;
        })}
      </ul>
    </>
  );
}

export default App;
