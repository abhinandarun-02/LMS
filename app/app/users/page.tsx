import prismadb from "@/lib/prismadb";
import { UsersClient } from "./users-client";

const UsersPage = async () => {
  const users = await prismadb.user.findMany();

  return <UsersClient data={users} />;
};

export default UsersPage;
