import { useEffect, useState } from "react";
import "./App.css";
import { createPost, getPosts } from "./controllers/posts.controller";
import { Post } from "./models/Post.model";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  const [title, setTitle] = useState("");

  useEffect(() => {
    const init = async () => {
      const newPosts = await getPosts();
      setPosts(newPosts);
    };
    init();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPost = await createPost(title);
    setTitle("");
    setPosts([newPost, ...posts]);
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
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {posts.map((post) => {
          return <li key={post.id}>{post.title}</li>;
        })}
      </ul>
    </>
  );
}

export default App;
