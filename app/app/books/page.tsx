import prismadb from "@/lib/prismadb";
import { BooksClient } from "./components/books-client";

const BooksPage = async ({ params }: { params: { storeId: string } }) => {
  const books = await prismadb.books.findMany();

  return <BooksClient data={books} />;
};

export default BooksPage;
