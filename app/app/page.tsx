import { AddBook } from "@/components/AddBook";
import { AddUser } from "@/components/AddUser";
import { ShowAvailable } from "@/components/ShowAvailable";
import { RecentSales } from "@/components/recent-sales";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { IndianRupee } from "lucide-react";

import React from "react";

function Dashboard() {
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
            <CardDescription>265 issues this month.</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
