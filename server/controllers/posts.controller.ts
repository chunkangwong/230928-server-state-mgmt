import { Post } from "../models/post.model";

const dbFilePath = "./db/posts.db.json";

const postsController = {
  dbFile: Bun.file(dbFilePath),
  async getPosts() {
    const posts = await this.dbFile.json();
    return posts as Post[];
  },
  async getPostById(id: number) {
    const posts = await this.getPosts();
    return posts.find((post) => post.id === id);
  },
  async createPost(title: string) {
    const posts = await this.getPosts();
    const newPost = { title, id: posts.length + 1 };
    posts.push(newPost);
    Bun.write(dbFilePath, JSON.stringify(posts));
    return newPost;
  },
};

export default postsController;
