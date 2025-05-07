import * as Yup from "yup";

const changePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Old Password is required"),
  newPassword: Yup.string()
    .min(8, "Password is too short - should be 8 characters minimum.")
    .max(20, "Password length must be between 8 to 20 characters")
    .matches(/[0-9]/, "Password should contain at least one number")
    .matches(
      /[a-z]/,
      "Password should contain at least one lowercase character"
    )
    .matches(
      /[A-Z]/,
      "Password should contain at least one uppercase character"
    )
    .matches(/[^\w]/, "Password should contain at least one special character")
    .notOneOf(
      [Yup.ref("currentPassword"), null],
      "New password can't be the same as the old password"
    )
    .required("New Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Confirm Passwords must match")
    .required("Confirm Password is required"),
});

export { changePasswordSchema };
