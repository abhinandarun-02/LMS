import { AddBook } from "@/components/AddBook";
import { AddUser } from "@/components/AddUser";
import { AddIssue } from "@/components/AddIssue";
import { ShowAvailable } from "@/components/ShowAvailable";
import { RecentIssues } from "@/components/RecentIssues";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { IndianRupee } from "lucide-react";

import React from "react";
import { ReturnIssue } from "@/components/ReturnIssue";
import prismadb from "@/lib/prismadb";

const Dashboard = async () => {
  const recentIssues = await prismadb.issue.findMany({
    orderBy: {
      id: "asc",
    },
    select: {
      id: true,
      user_name: true,
      user_id: true,
      book_title: true,
      created_at: true,
    },
    take: 5,
  });

  const issuesCount = await prismadb.issue.count();
  return (
    <div className="dark:bg-zinc-900">
      <h1>Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="grid gap-4 md:grid-rows-2 lg:grid-rows-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium"></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4 items-center">
                <AddBook variant="secondary"></AddBook>
                <AddUser variant="default"></AddUser>
                <AddIssue variant="outline"></AddIssue>
                <ReturnIssue variant="ghost"></ReturnIssue>
                <ShowAvailable variant="outline"></ShowAvailable>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-medium uppercase">
                Total Overdue
              </CardTitle>
              <IndianRupee></IndianRupee>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45,231.89</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-2">
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
