import { useQuery } from "@tanstack/react-query";
import "./App.css";
import AddForm from "./components/AddForm";
import { getPosts } from "./controllers/posts.controller";

function App() {
  const {
    data: posts,
    isFetching,
    error: fetchPostsError,
  } = useQuery({
    queryKey: ["fetchPosts"],
    queryFn: async () => {
      const posts = await getPosts();
      return posts;
    },
  });

  return (
    <>
      <AddForm />
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
