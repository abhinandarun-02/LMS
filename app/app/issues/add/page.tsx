import prismadb from "@/lib/prismadb";
import IssuesClient from "./add-issues-client";

const ProductsPage = async () => {
  const books = await prismadb.books.findMany({
    where: {
      available: true,
    },
    select: {
      id: true,
      title: true,
    },
  });
  const users = await prismadb.user.findMany({
    select: {
      rollNumber: true,
      name: true,
    },
  });

  return (
    <>
      <h1>Add Issue</h1>
      <IssuesClient availableBookData={books} userData={users} />
    </>
  );
};

export default ProductsPage;
