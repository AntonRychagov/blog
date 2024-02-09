import "./RenderPosts.css";
import Post, { TPost } from "../Post/Post";

function RenderPosts(props: TPost) {
  return (
    <Post posts={props.posts} deletePostHandler={props.deletePostHandler} />
  );
}

export default RenderPosts;
