import prismadb from "@/lib/prismadb";
import ReturnOverdueClient from "./return-overdue-client";

const ReturnIssuePage = async () => {
  const users = await prismadb.user.findMany({});

  return (
    <>
      <h1>Return Overdue</h1>
      <ReturnOverdueClient userData={users} />
    </>
  );
};

export default ReturnIssuePage;
