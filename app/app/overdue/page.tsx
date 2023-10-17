import prismadb from "@/lib/prismadb";
import { OverdueClient } from "./overdue-client";

const OverduePage = async () => {
  const overdues = await prismadb.issue.findMany({ where: { overdue: true } });

  return <OverdueClient data={overdues} />;
};

export default OverduePage;
