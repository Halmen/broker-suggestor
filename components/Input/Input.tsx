import { useEffect, useState, useCallback, ChangeEvent } from "react";
import { css } from "@linaria/core";
import {
  OutlinedInput,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";

interface EndAdornmentProps {
  onReset: () => void;
}

const EndAdornment = ({ onReset }: EndAdornmentProps) => (
  <IconButton onClick={onReset}>x</IconButton>
);

interface Props {
  onKeyDown: (value: string) => void;
}

const Input = ({ onKeyDown = () => null }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const onReset = useCallback(() => setInputValue(""), []);
  const onChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
      setInputValue(event.target.value),
    []
  );

  useEffect(() => {
    onKeyDown(inputValue);
  }, [inputValue]);
  return (
    <div className={inputContainerCSS}>
      <Typography>Filter by name</Typography>
      <OutlinedInput
        id="outlined-adornment-weight"
        className={inputCss}
        value={inputValue}
        onChange={onChange}
        placeholder="Type Broker Name"
        endAdornment={
          <InputAdornment position="end">
            <EndAdornment onReset={onReset} />
          </InputAdornment>
        }
      />
    </div>
  );
};

const inputContainerCSS = css`
  height: 120px;
  margin-top: 140px;

  @media (min-width: 1220px) {
    margin-top: 0;
  }
`;

const inputCss = css`
  background-color: white;
  width: 100%;
  max-width: 500px;

  @media (min-width: 1220px) {
    width: 400px;
  }
`;

export default Input;
