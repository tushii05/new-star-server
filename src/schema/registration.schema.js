import { object, string, ref, mixed } from "yup";

const registrationSchema = object({
  email: string().email().required("Email is required"),
  username: string().required("Username is required"),
  password: string()
    .min(8, "Password is too short - should be 8 characters minimum.")
    .max(20, "Password length must be between 8 to 20 characters")
    .matches(/[0-9]/, "Password should contain atleast one number")
    .matches(/[a-z]/, "Password should contain atleast one lowercase character")
    .matches(/[A-Z]/, "Password should contain atleast one uppercase character")
    .matches(/[^\w]/, "Password should contain atleast one special character")
    .required("Password is required"),
  confirm_password: string()
    .oneOf([ref("password"), null], "Confirm Passwords must match")
    .required("Confirm Password is required"),
  termsAndConditions: mixed().oneOf(
    [1],
    "You must accept the terms and conditions"
  ),
});
export default registrationSchema;
