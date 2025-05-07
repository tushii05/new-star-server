import * as Yup from "yup";

const deleteAccountFormSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  checkbox: Yup.mixed().oneOf([1], "You must accept the checkbox"),
});

export { deleteAccountFormSchema };
