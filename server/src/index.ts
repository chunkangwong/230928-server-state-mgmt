import postsController from "../controllers/posts.controller";

Bun.serve({
  port: 3000,
  fetch: async (req) => {
    const url = new URL(req.url);
    if (url.pathname === "/api/posts") {
      if (req.method === "POST") {
        const { title } = await req.json();
        const createdPost = await postsController.createPost(title);
        return new Response(JSON.stringify(createdPost), {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type, Accept, Authorization",
          },
        });
      }
      const posts = await postsController.getPosts();
      return new Response(JSON.stringify(posts), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept, Authorization",
        },
      });
    } else if (url.pathname.startsWith("/api/posts/")) {
      const id = url.pathname.replace("/api/posts/", "");
      const post = await postsController.getPostById(Number(id));
      if (!post) return new Response("Not Found", { status: 404 });
      return new Response(JSON.stringify(post), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept, Authorization",
        },
      });
    }
    return new Response("Hello World!");
  },
});
