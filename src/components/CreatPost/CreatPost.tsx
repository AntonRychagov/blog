import React, { useState, useEffect } from "react";
import "./CreatPost.css";
import { Snackbar, Alert, TextField, Typography } from "@mui/material";
import ButtonWrapper from "../ButtonWrapper/ButtonWrapper";

const MAX_VALUE_TITLE = 30;
const MAX_VALUE_TEXT = 200;

export type TPropsPost = {
  addNewPost: (postTitle: string, postBody: string) => void;
};

const CreatePost = (props: TPropsPost) => {
  const { addNewPost } = props;

  const [inputTitlePost, setInputTitlePost] = useState("");
  const [textAriaPost, setTextAriaPost] = useState("");
  const [openTitleWarning, setOpenTitleWarning] = useState(false);
  const [openTextWarning, setOpenTextWarning] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [isError, setError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  useEffect(() => {
    validation();
  }, [inputTitlePost, textAriaPost, openTitleWarning, openTextWarning]);

  const validation = () => {
    if (inputTitlePost.length > MAX_VALUE_TITLE) {
      setOpenTitleWarning(true);
    } else {
      setOpenTitleWarning(false);
    }

    if (textAriaPost.length > MAX_VALUE_TEXT) {
      setOpenTextWarning(true);
    } else {
      setOpenTextWarning(false);
    }

    if (openTitleWarning || openTextWarning) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitlePost(e.target.value);
    setError(false);
  };

  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAriaPost(e.target.value);
    setError(false);
  };

  const clearInputs = () => {
    setInputTitlePost("");
    setTextAriaPost("");
  };

  const handleClose = (event: string | React.SyntheticEvent | Event) => {
    if (event === "clickaway") {
      return;
    }
    setOpenSuccess(false);
    setOpenError(false);
  };

  const addNewPostHandle = () => {
    if (inputTitlePost.trim() && textAriaPost.trim()) {
      addNewPost(inputTitlePost, textAriaPost);
      clearInputs();
      setOpenSuccess(true);
      setError(false);
    } else {
      setOpenError(true);
      setError(true);
    }
  };

  return (
    <div>
      <Typography variant="h4" className="title">
        Новый пост
      </Typography>

      <TextField
        className="input"
        error={isError}
        label="Заголовок"
        type="text"
        value={inputTitlePost}
        onChange={handleChangeTitle}
      />
      {openTitleWarning ? (
        <div className="limit__out">
          Превышен лимит символов{" "}
          <span>
            {inputTitlePost.length}/{MAX_VALUE_TITLE}
          </span>
        </div>
      ) : (
        <div className="limit__out"></div>
      )}

      <TextField
        className="textaria"
        error={isError}
        label="Текст"
        value={textAriaPost}
        onChange={handleChangeText}
        multiline={true}
        rows={5}
      />
      {openTextWarning ? (
        <div className="limit__out">
          Превышен лимит символов{" "}
          <span>
            {textAriaPost.length}/{MAX_VALUE_TEXT}
          </span>
        </div>
      ) : (
        <div className="limit__out"></div>
      )}

      <ButtonWrapper
        variant="contained"
        onClick={addNewPostHandle}
        disabled={isDisabled}
      />

      <div>
        <Snackbar
          open={openSuccess}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Пост добавлен
          </Alert>
        </Snackbar>
        <Snackbar
          open={openError}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Поля обязательны
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default CreatePost;
