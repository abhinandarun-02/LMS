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

interface ReturnIssueClientProps {
  userData: User[];
}

type User = {
  rollNumber: string;
  name: string;
};

const formSchema = z.object({
  book_title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  user_id: z.string().min(2, {
    message: "User ID must be at least 2 characters.",
  }),
});

export const ReturnIssueClient: React.FC<ReturnIssueClientProps> = ({
  userData,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadedUser, setLoadedUser] = useState(false);
  const [userIssues, setUserIssues] = useState([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   book_title: "",
    //   user_id: "",
    // },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      setLoading(true);

      await axios.post(`/api/issue/return`, values);

      router.refresh();
      toast.success("Issue returned successfully");
      setUserIssues([]);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }
  async function changeStateLoadedUser(userID: string): Promise<void> {
    try {
      const userIssuesAxios = await axios.get(`/api/issue/return/${userID}`);
      console.log(userIssuesAxios.data);
      if (userIssuesAxios.data.length == 0) {
        setUserIssues([]);
        toast.error("No user issues found");
      } else {
        toast.success("User issues added successfully");
        setUserIssues(userIssuesAxios.data);
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
              <FormLabel>Roll Number of User</FormLabel>
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
                          key={userItem.name}
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
        {userIssues.length !== 0 ? (
          <FormField
            control={form.control}
            name="book_title"
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
                        {userIssues.map((item: any) => (
                          <SelectItem
                            key={item.book_id}
                            value={item.book_title}
                          >
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
        <Button type="submit" disabled={userIssues.length == 0}>
          {loading && <Loader className="h-4 w-4 animate-spin" />}Submit
        </Button>
      </form>
    </FormProvider>
  );
};

export default ReturnIssueClient;
