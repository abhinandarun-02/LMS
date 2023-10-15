'use client'

import * as z from 'zod'
import axios from 'axios'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Loader, Trash } from 'lucide-react'
import { Books } from '@prisma/client'
import { useParams, useRouter } from 'next/navigation'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import Heading from '@/components/ui/heading'
// import AlertModal from '@/components/modals/alert-modal'


const formSchema = z.object({
    title: z.string().min(2, {
      message: "Title must be at least 2 characters.",
    }),
    edition: z.string().min(2, {
      message: "Edition must be at least 2 characters.",
    }),
    author: z.string().min(2, {
      message: "Author must be at least 2 characters.",
    }),
    publisher: z.string().min(2, {
      message: "Publisher must be at least 2 characters.",
    }),
    available: z.boolean().refine((value) => value === true || value === false, {
      message: "Available must be either true or false.",
    }),
  });

type BookFormValues = z.infer<typeof formSchema>

interface BookFormProps {
  initialData: Books | null
}

export const BookForm: React.FC<BookFormProps> = ({
  initialData,
}) => {
  const params = useParams()
  const router = useRouter()



  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = initialData ? 'Edit book' : 'Add book'
  const description = initialData ? 'Edit a book.' : 'Add a new book'
  const toastMessage = initialData ? 'Book updated.' : 'Book created.'
  const action = initialData ? 'Save changes' : 'Create'

  const defaultValues = initialData
    ? {
        ...initialData,
      }
    : {
        title: "",
        edition: "",
        author: "",
        publisher: "",
        available: true,
      }

  const form = useForm<BookFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  const onSubmit = async (data: BookFormValues) => {
    try {
      setLoading(true)
      if (initialData) {
        await axios.patch(`/api/book/${params.bookId}`,data)
      } else {
        await axios.post(`/api/book/add`, data);
      }
      router.refresh()
      router.push('/app/books')
      toast.success(toastMessage)
    } catch (error: any) {
      toast.error('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

//   const onDelete = async () => {
//     try {
//       setLoading(true)
//       await axios.delete(`/api/${params.storeId}/products/${params.productId}`)
//       router.refresh()
//       router.push(`/${params.storeId}/products`)
//       toast.success('Product deleted.')
//     } catch (error: any) {
//       toast.error('Something went wrong.')
//     } finally {
//       setLoading(false)
//       setOpen(false)
//     }
//   }

  return (
    <>
      {/* <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      /> */}
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={true}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Harry Potter" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="edition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Edition</FormLabel>
                <FormControl>
                  <Input placeholder="50th Anniversary Edition" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input placeholder="J.K Rowling" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="publisher"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Publisher</FormLabel>
                <FormControl>
                  <Input placeholder="Random House Publishing" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between">
            <Button type="submit">
              {loading && <Loader className="h-4 w-4 animate-spin" />}{action}
            </Button>
            <Button variant={"outline"} onClick={() => form.reset()}>
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
