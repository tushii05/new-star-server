import { number, object, string } from "yup";

const otpSchema = object({
  email: string().email().required("Email is required"),
  // otp: string().required("OTP is required"),

  otp: number()
    .typeError("OTP must be a number") // Ensures the input is numeric
    .integer("OTP must be an integer") // Ensures the input is an integer
    .positive("OTP must be a positive number") // Ensures no negative numbers
    .test(
      "len",
      "OTP must be exactly 6 digits",
      (value) => value && value.toString().length === 6 // Validate exact length
    )
    .required("OTP is required"),
});
export default otpSchema;
