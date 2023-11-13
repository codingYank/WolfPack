import * as Yup from "yup"

export const updateUserSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  handle: Yup.string()
    .required("Handle is required")
    .matches(/^\w*$/, "Invalid Handle"),
})

export const reqPasswordResetSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter valid email")
    .required("Email is required"),
})

export const passwordResetSchema = Yup.object().shape({
  password: Yup.string()
    .required("Required")
    .min(5, "Password must be at least 5 characters"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
})
