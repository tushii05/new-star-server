import { authConfig } from "@/app/api/auth/[...nextauth]/route";
import UpdateSocialForm from "@/components/profile/updateSocialForm";
import { getUserService } from "@/services/user.service";
import { getServerSession } from "next-auth";
import React from "react";

export default async function SocialAccount() {
  const session = await getServerSession(authConfig);
  const user = session?.user?.id && (await getUserService(session?.user?.id));
  return <UpdateSocialForm user={user?.user} />;
}
