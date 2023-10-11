import * as Yup from "yup"

export const registerUserSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Please enter valid email")
    .required("Email is required"),
  handle: Yup.string().required("Handle is required"),
  password: Yup.string()
    .required("Required")
    .min(5, "Password must be at least 5 characters"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
})

export const loginSchema = Yup.object().shape({
  userName: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
})
