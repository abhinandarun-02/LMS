"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";

interface ReturnOverdueClientProps {
  userData: User[];
}

type User = {
  rollNumber: string;
  name: string;
};

const formSchema = z.object({
  book_id: z.string().min(2, {
    message: "Book ID must be at least 2 characters.",
  }),
  user_id: z.string(),
});

export const ReturnOverdueClient: React.FC<ReturnOverdueClientProps> = ({
  userData,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadedUser, setLoadedUser] = useState(false);
  const [userOverdues, setUserOverdues] = useState([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      book_id: "",
      user_id: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      setLoading(true);

      await axios.post(`/api/overdue`, values);

      router.refresh();
      toast.success("Overdue returned successfully");
      setUserOverdues([]);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }
  async function changeStateLoadedUser(userID: string): Promise<void> {
    try {
      const userOverduesAxios = await axios.get(`/api/overdue/${userID}`);
      console.log(userOverduesAxios.data);
      if (userOverduesAxios.data.length == 0) {
        setUserOverdues([]);
        toast.error("No user overdues found");
      } else {
        toast.success("User overdues added successfully");
        setUserOverdues(userOverduesAxios.data);
      }
      router.refresh();
      setLoadedUser(!loadedUser);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="user_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name of User</FormLabel>
              <FormControl>
                <Select
                  onValueChange={changeStateLoadedUser}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a user" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {userData.map((userItem) => (
                        <SelectItem
                          key={userItem.rollNumber}
                          value={userItem.rollNumber}
                        >
                          {userItem.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {userOverdues.length !== 0 ? (
          <FormField
            control={form.control}
            name="book_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a book" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {userOverdues.map((item: any) => (
                          <SelectItem key={item.book_id} value={item.book_id}>
                            {item.book_title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <h1>No user issues found</h1>
        )}
        <Button type="submit" disabled={userOverdues.length == 0}>
          {loading && <Loader className="h-4 w-4 animate-spin" />}Submit
        </Button>
      </form>
    </FormProvider>
  );
};

export default ReturnOverdueClient;
