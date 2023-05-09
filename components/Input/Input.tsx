import { KeyboardEvent } from "react";
import { css } from "@linaria/core";
import {
  OutlinedInput,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";

interface Props {
  onChange: (event: KeyboardEvent<HTMLDivElement>) => void;
}

const EndAdornment = () => (
  <IconButton onClick={() => console.log("ghecci")}>x</IconButton>
);

const Input = ({ onChange = () => null }: Props) => (
  <div className={inputContainerCSS}>
    <Typography>Filter by name</Typography>
    <OutlinedInput
      id="outlined-adornment-weight"
      className={inputCss}
      placeholder="Type Broker Name"
      endAdornment={
        <InputAdornment position="end">
          <EndAdornment />
        </InputAdornment>
      }
    />
  </div>
);

const inputContainerCSS = css`
  height: 120px;
  margin-top: 170px;

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
