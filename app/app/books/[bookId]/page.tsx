import prismadb from '@/lib/prismadb'
import { BookForm } from './components/book-form'
import { Books } from '@prisma/client'

const BooksPage = async ({ params }: { params: { bookId : string } }) => {
  const book = await prismadb.books.findUnique({
    where: {
        id: params.bookId
    }
  })

  return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <BookForm initialData={book}/>
        </div>
  </div>
  )
}

export default BooksPage
