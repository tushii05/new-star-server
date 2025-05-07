import { authConfig } from "@/app/api/auth/[...nextauth]/route";
import ChangePasswordForm from "@/components/profile/changePasswordForm";
import { getUserService } from "@/services/user.service";
import { getServerSession } from "next-auth";
import React from "react";

export default async function ChangePassword() {
  const session = await getServerSession(authConfig);
  const user = session?.user?.id && (await getUserService(session?.user?.id));
  return <ChangePasswordForm user={user?.user} />;
}
