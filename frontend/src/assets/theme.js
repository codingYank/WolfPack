import { createTheme } from "@mui/material"

export const theme = createTheme({
  palette: {
    primary: {
      dark: "hsl(0, 0%, 2%)",
      main: "hsl(0, 0%, 3%)",
      light: "hsl(0, 0%, 3%, .7)",
    },
    secondary: {
      main: "hsl(0, 0%, 96%)",
      dark: "hsl(0, 0%, 86%)",
      darker: "hsl(0, 0%, 56%)",
    },
    accent1: {
      main: "hsl(164, 93%, 40%)",
      dark: "hsl(164, 93%, 30%)",
      light: "hsl(164, 93%, 50%)",
    },
    accent2: {
      main: "hsl(1, 66%, 60%)",
      dark: "hsl(1, 66%, 50%)",
      light: "hsl(1, 66%, 70%)",
    },
    accent3: {
      main: "hsl(281, 61%, 76%)",
      dark: "hsl(281, 61%, 66%)",
      light: "hsl(281, 61%, 86%)",
    },
  },
})
