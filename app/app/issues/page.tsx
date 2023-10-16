import prismadb from "@/lib/prismadb";
import { IssuesClient } from "./issues-client";

const BooksPage = async () => {
  const issues = await prismadb.issue.findMany({});

  return <IssuesClient data={issues} />;
};

export default BooksPage;
