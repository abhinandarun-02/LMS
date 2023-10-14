import prismadb from "@/lib/prismadb";
import ReturnIssueClient from "./return-issue-client";

async function findUserIssues(value: string) {
  try {
    const userIssues = await prismadb.issue.findMany({
      where: {
        user_id: value,
        overdue: false,
      },
      select: {
        book_id: true,
      },
    });
    console.log(userIssues);
  } catch (error) {
    console.error("Error fetching user issues:", error);
  }
}

const ReturnIssuePage = async ({ params }: { params: { storeId: string } }) => {
  const users = await prismadb.user.findMany({});

  return (
    <>
      <h1>Add Issue</h1>
      <ReturnIssueClient userData={users} />
    </>
  );
};

export default ReturnIssuePage;
