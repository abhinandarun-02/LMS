import prismadb from '@/lib/prismadb'
import { BooksClient } from './books-client'

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const books = await prismadb.books.findMany()

  return (
    <BooksClient data={books}/>
  )
}

export default ProductsPage