import prismadb from "@/lib/prismadb";
import { AvailableBooksClient } from "./available-books-client";

const AvailableBooksPage = async () => {
  const availableBooks = await prismadb.books.findMany({
    where: {
      available: true,
    },
    select: {
      id: true,
      title: true,
      author: true,
      publisher: true,
      edition: true,
    },
  });

  return <AvailableBooksClient data={availableBooks} />;
};

export default AvailableBooksPage;
