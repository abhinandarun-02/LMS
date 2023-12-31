import prismadb from "@/lib/prismadb";
import ReturnIssueClient from "./return-issue-client";

const ReturnIssuePage = async () => {
  const users = await prismadb.user.findMany({});

  return (
    <>
      <h1>Return Issue</h1>
      <ReturnIssueClient userData={users} />
    </>
  );
};

export default ReturnIssuePage;
