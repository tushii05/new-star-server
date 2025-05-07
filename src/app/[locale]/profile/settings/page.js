import { authConfig } from "@/app/api/auth/[...nextauth]/route";
import UpdateProfileForm from "@/components/profile/updateProfileForm";
import { getUserService } from "@/services/user.service";
import { getServerSession } from "next-auth";

export default async function Settings() {
  const session = await getServerSession(authConfig);
  const user = session?.user?.id && (await getUserService(session?.user?.id));
  return <UpdateProfileForm user={user?.user} />;
}
