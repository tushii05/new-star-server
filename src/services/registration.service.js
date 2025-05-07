"use server";
import customLangLink from "@/utils/custom-lang-link";

const registrationService = async (formData, router, locale) => {
  const module = await import("sonner");
  const toast = module.toast;
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/api/user/register`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.ok) {
      toast.success(data?.message);
      router.push(
        customLangLink(`/verify/otp-verify?email=${formData?.email}`, locale)
      );
    } else {
      const errorMessage = data?.message || "Something went wrong";

      if (res.status === 500) {
        toast.warning(errorMessage);
        if (
          data?.message ===
          "The email address is already registered but remains unverified. Please complete the verification process to proceed."
        ) {
          toast.warning(errorMessage);
          router.push(customLangLink("/verify/verification-pending", locale));
        }
      } else {
        toast.error(errorMessage);
      }
    }

    return data;
  } catch (error) {
    toast.error("An error occurred. Please try again.");
    console.error("Registration error:", error);
    return error;
  }
};

const optService = async (formData, router, locale) => {
  const module = await import("sonner");
  const toast = module.toast;
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/api/user/verify-email`,
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const data = await res.json();
    if (!res.ok) {
      toast.error(data?.message || data?.error);
      throw new Error("Failed to Validate Opt");
    } else {
      toast(data?.message ?? data?.error);
      router.push(customLangLink("/", locale));
    }
    return data;
  } catch (error) {
    return error;
  }
};

const resendOptService = async (formData, router, locale) => {
  const module = await import("sonner");
  const toast = module.toast;
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/api/user/resendOtp`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await res.json();

    if (!res.ok) {
      toast.error(data?.message);
      throw new Error("Failed to send otp");
    } else {
      toast.success(data?.message);
      router.push(
        customLangLink("/verify/otp-verify?email=" + formData?.email, locale)
      );
    }
    return data;
  } catch (error) {
    return error;
  }
};

const forgetPasswordOptService = async (formData, router, locale) => {
  const module = await import("sonner");
  const toast = module.toast;
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/api/user/forget-password`,
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const data = await res.json();
    if (!res.ok) {
      toast.error(data?.message);
      throw new Error("Failed to send otp");
    } else {
      if (data?.error) {
        toast.error(data?.error);
      } else {
        toast(data?.message || data?.error);
        router.push(
          customLangLink(
            "/forget-password/change-password?email=" + formData?.email,
            locale
          )
        );
      }
    }
    return data;
  } catch (error) {
    return error;
  }
};

const resetPasswordService = async (formData, router, locale) => {
  const module = await import("sonner");
  const toast = module.toast;
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/api/user/reset-password`,
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const data = await res.json();
    if (!res.ok) {
      toast.error(data?.message);
      throw new Error("Failed to Validate Opt");
    } else {
      if (data?.error) {
        toast.error(data?.error);
      } else {
        toast(data?.message || data?.error);
        router.push(customLangLink("/", locale));
      }
    }
    return data;
  } catch (error) {
    return error;
  }
};

export {
  registrationService,
  optService,
  resendOptService,
  forgetPasswordOptService,
  resetPasswordService,
};
