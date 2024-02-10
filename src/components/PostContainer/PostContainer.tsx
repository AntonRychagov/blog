import { useState, useEffect } from "react";
import "./PostContainer.css";
import { getPosts, addPost, deletePost } from "../../api/getPost.js";
import { parseDate } from "../../utils/parseDate.js";
import { v4 as uuid4 } from "uuid";
import { AppBar, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import CreatePost from "../CreatPost/CreatPost";
import RenderPosts from "../RenderPosts/RenderPosts";

export type TPostsList = {
  userId: number | string;
  id: number | string;
  title: string;
  body: string;
};

const PostContainer = () => {
  const [postsList, setPostsList] = useState<TPostsList[]>([]);
  const [isError, setIsError] = useState(false);
  const [postsLoading, setPostLoading] = useState(false);

  useEffect(() => {
    setIsError(false);
    setPostLoading(true);

    getPosts()
      .then((posts) => {
        setPostLoading(false);
        setPostsList(posts);
      })

      .catch(() => {
        setIsError(true);
        setPostLoading(false);
      });
  }, []);

  const addNewPost = (postTitle: string, postBody: string) => {
    parseDate();

    const newPost = {
      userId: parseDate(),
      id: uuid4(),
      title: postTitle,
      body: postBody,
    };

    setPostsList([newPost, ...postsList]);

    addPost(newPost);
  };

  const deletePostHandler = (id: number | string) => {
    setPostsList(postsList.filter((post) => post.id !== id));
    deletePost(id);
  };

  return (
    <>
      <div className="header">
        <AppBar>
          <Typography
            variant="h6"
            sx={{ ml: 2, display: { xs: "flex", md: "flex" } }}
          >
            BLOG
          </Typography>
        </AppBar>
      </div>
      <Container maxWidth="md" className="container">
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }} className="wrapper">
          <Grid xs={4}>
            <CreatePost addNewPost={addNewPost} />
          </Grid>
          <Grid xs={5}>
            <RenderPosts
              posts={postsList}
              deletePostHandler={deletePostHandler}
            />
            {postsLoading && <p>Загрузка постов</p>}
            {isError && <p>Произошла ошибка</p>}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default PostContainer;
