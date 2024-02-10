import './Post.css'
import { Divider, IconButton, Typography } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import { TPostsList } from "../PostContainer/PostContainer";
import { parseDate } from "../../utils/parseDate";


export type TPost = {
  posts: TPostsList[];
  deletePostHandler: (id: number | string) => void;
};

const Post = (props: TPost ) => {
  const { posts, deletePostHandler } = props;

  return (
    <div>
      <Typography variant="h4">Лента</Typography>

      <ul className="posts__list">
        {posts.map((post) => {
          return (
            <li key={post.id} className="post__item">
              <div className="inner">
                <div>{parseDate()}</div>

                <IconButton onClick={() => deletePostHandler(post.id)}>
                  <DeleteOutline sx={{ color: red[800] }} />
                </IconButton>
              </div>

              <Divider />
              <h3>{post.title}</h3>
              <span>{post.body}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Post;
