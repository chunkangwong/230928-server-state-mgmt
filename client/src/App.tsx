import { useEffect, useState } from "react";
import "./App.css";
import { getPosts } from "./controllers/posts.controller";
import { Post } from "./models/Post.model";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isFetchingPosts, setIsFetchingPosts] = useState(false);
  const [fetchPostError, setFetchPostError] = useState<Error | null>(null);

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

  return (
    <>
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
