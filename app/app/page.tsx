import { AddBook } from "@/components/AddBook";
import { AddUser } from "@/components/AddUser";
import { AddIssue } from "@/components/AddIssue";
import { RecentIssues } from "@/components/RecentIssues";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, IndianRupee } from "lucide-react";

import React from "react";
import { ReturnIssue } from "@/components/ReturnIssue";
import prismadb from "@/lib/prismadb";
import { PrismaClient } from "@prisma/client";

const Dashboard = async () => {
  const recentIssues = await prismadb.issue.findMany({
    include:{
      user: true
    },
    orderBy: {
      created_at: "desc",
    },
    take: 5,
  });

  const prisma = new PrismaClient();

  const issuesCount = await prismadb.issue.count();
  const booksCount = await prismadb.books.count();
  const result = await prisma.issue.aggregate({
    _sum: {
      overdue_amount: true,
    },
  });
  const totalSum = result._sum?.overdue_amount || 0;

  return (
    <div className="dark:bg-zinc-900">
      <h1>Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 w-full">
        <div className="grid gap-4 md:grid-rows-1 lg:grid-rows-2 w-full">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium"></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4 items-center">
                <AddBook variant="secondary"></AddBook>
                <AddUser variant="default"></AddUser>
                <AddIssue variant="outline"></AddIssue>
                <ReturnIssue variant="secondary"></ReturnIssue>
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-4 md:grid-rows-2 lg:grid-rows-2 w-full">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-medium uppercase">
                  Total Overdue
                </CardTitle>
                <IndianRupee></IndianRupee>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalSum}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-medium uppercase">
                  Total Books
                </CardTitle>
                <BookOpen></BookOpen>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{booksCount}</div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Card className="grid gap-4 md:grid-cols-1 lg:grid-cols-1 w-full">
          <CardHeader>
            <CardTitle>Recent Issues</CardTitle>
            <CardDescription>{issuesCount} issue(s) currently.</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentIssues data={recentIssues} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
