import { boolean, object, string } from "yup";

const contactSchema = object({
  name: string().required("Name is required"),
  email: string().email("Invalid email").required("Email is required"),
  message: string().required("Message is required"),
  checkBox: boolean().oneOf([true], "You must agree to the terms"),
});
export default contactSchema;
