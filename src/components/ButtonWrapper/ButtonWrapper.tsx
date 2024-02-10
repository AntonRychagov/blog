import { Button } from "@mui/material";
import "./ButtonWrapper.css";

export type TButton = {
  variant: string;
  onClick: () => void;
  disabled: boolean;
};

const ButtonWrapper = (props: TButton) => {
  return (
    <Button className="button"  {...props}>
      {" "}
      Добавить Пост
    </Button>
  );
};

export default ButtonWrapper;
