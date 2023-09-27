import { useEffect, useState } from "react";
import "./App.css";
import { getPosts } from "./controllers/posts.controller";
import { Post } from "./models/Post.model";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const init = async () => {
      const newPosts = await getPosts();
      setPosts(newPosts);
    };
    init();
  }, []);

  return (
    <ul>
      {posts.map((post) => {
        return <li key={post.id}>{post.title}</li>;
      })}
    </ul>
  );
}

export default App;
