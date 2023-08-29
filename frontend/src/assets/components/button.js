import { theme } from "../theme"
import { Button } from "@mui/material"
import { styled } from "@mui/material/styles"

export const PrimaryButton = styled(Button)(() => ({
  color: theme.palette.secondary.main,
  fontWeight: "bold",
  backgroundColor: theme.palette.primary.main,
  minWidth: "150px",
  borderRadius: "12000px",
  border: `1px solid ${theme.palette.secondary.main}`,
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
  },
  // "&:disabled": {
  //   backgroundColor: theme.palette.grey.main,
  // },
}))

export const SecondaryButton = styled(Button)(() => ({
  color: theme.palette.primary.main,
  fontWeight: "bold",
  backgroundColor: theme.palette.secondary.main,
  minWidth: "150px",
  borderRadius: "12000px",
  // border: `1px solid ${theme.palette.secondary.main}`,
  "&:hover": {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.primary.main,
  },
}))

export const Accent1Button = styled(Button)(() => ({
  color: theme.palette.primary.main,
  fontWeight: "bold",
  backgroundColor: theme.palette.accent1.main,
  minWidth: "150px",
  borderRadius: "12000px",
  // border: `1px solid ${theme.palette.secondary.main}`,
  "&:hover": {
    backgroundColor: theme.palette.accent1.light,
    color: theme.palette.primary.main,
  },
}))

export const Accent2Button = styled(Button)(() => ({
  color: theme.palette.primary.main,
  fontWeight: "bold",
  backgroundColor: theme.palette.accent2.main,
  minWidth: "150px",
  borderRadius: "12000px",
  // border: `1px solid ${theme.palette.secondary.main}`,
  "&:hover": {
    backgroundColor: theme.palette.accent2.dark,
    color: theme.palette.primary.main,
  },
}))

export const Accent3Button = styled(Button)(() => ({
  color: theme.palette.primary.main,
  fontWeight: "bold",
  backgroundColor: theme.palette.accent3.main,
  minWidth: "150px",
  borderRadius: "12000px",
  // border: `1px solid ${theme.palette.secondary.main}`,
  "&:hover": {
    backgroundColor: theme.palette.accent3.dark,
    color: theme.palette.primary.main,
  },
}))
