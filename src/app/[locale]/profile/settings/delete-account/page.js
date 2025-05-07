import { authConfig } from "@/app/api/auth/[...nextauth]/route";
import DeleteAccountForm from "@/components/profile/deleteAccountForm";
import { getUserService } from "@/services/user.service";
import { getServerSession } from "next-auth";
import React from "react";

export default async function DeleteAccount() {
  const session = await getServerSession(authConfig);
  const user = session?.user?.id && (await getUserService(session?.user?.id));
  return <DeleteAccountForm user={user?.user} />;
}
