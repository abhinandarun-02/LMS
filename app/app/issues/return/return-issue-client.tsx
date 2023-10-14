"use client";

import React, { useEffect } from "react";
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
import prismadb from "@/lib/prismadb";

interface ReturnIssueClientProps {
  userData: User[];
}

type User = {
  rollNumber: string;
  name: string;
};

type UserIssuesType = {
  book_id: string;
};

const formSchema = z.object({
  book_title: z.string(),
  user_id: z.string(),
});

export const ReturnIssueClient: React.FC<ReturnIssueClientProps> = ({
  userData,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadedUser, setLoadedUser] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      book_title: "",
      user_id: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      setLoading(true);

      await axios.post(`/api/issue/return`, values);

      router.refresh();
      toast.success("Issue added successfully");
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }
  //   useEffect(() => {
  //     console.log("Hi");
  //   }, [loadedUser]);

  async function changeStateLoadedUser(userID: string): Promise<void> {
    setLoadedUser(!loadedUser);
    try {
      const userIssues = await axios.get(`/api/issue/return`, {
        params: { q: userID },
      });

      router.refresh();
      toast.success("User issues added successfully");
      console.log(userIssues);
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
                  <SelectTrigger className="w-[180px]">
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
        {/* {loadedUser ? (
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
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a book" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {userIssues.map((item) => (
                          <SelectItem key={item.book_id} value={item.book_id}>
                            {item.book_id}
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
          <br />
        )}
        <Button type="submit">
          {loading && <Loader className="h-4 w-4 animate-spin" />}Submit
        </Button> */}
      </form>
    </FormProvider>
  );
};

export default ReturnIssueClient;
