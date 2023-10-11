import * as Yup from "yup"

export const updateUserSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  handle: Yup.string().required("Handle is required"),
})
