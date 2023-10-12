import { TextField } from "@mui/material"
import { styled } from "@mui/material/styles"
import { theme } from "../theme"

export const PrimaryTextField = styled(TextField)`
  & label.Mui-focused {
    color: ${theme.palette.secondary.main};
    top: -10px;
    font-size: 1.25rem;
  }
  & .MuiInputLabel-shrink {
    color: ${theme.palette.secondary.main};
    font-weight: bold;
    top: -10px;
    font-size: 1.25rem;
  }
  & label {
    font-weight: bold;
  }
  & .MuiInputBase-root {
    color: ${theme.palette.primary.main};
    background-color: ${theme.palette.secondary.main};
    border-radius: 17px;
  }
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: ${theme.palette.primary.main};
      border: none;
    }
    &:hover fieldset {
      border: none;
    }
    &.Mui-focused fieldset {
      border: none;
    }
  }
`
