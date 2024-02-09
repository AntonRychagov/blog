import { Button } from "@mui/material";
import "./ButtonWrapper.css";

export type TButton = {
  onClick: () => void;
  disabled: boolean;
};

const ButtonWrapper = (props: TButton) => {
  return (
    <Button className="button" variant="contained" {...props}>
      {" "}
      Добавить Пост
    </Button>
  );
};

export default ButtonWrapper;
