import { Users } from "@/components/Users";
import { data as issuesData, Issues } from "@/data/recentIssues";

export function RecentSales() {
  return (
    <div className="grid grid-rows-3 space-y-4">
      {issuesData.map((issue: Issues, index: number) => (
        <div className="flex justify-between items-center" key={index}>
          <div className="flex items-center">
            <Users name={issue.name} image={issue.avatar} />
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{issue.name}</p>
              <p className="text-sm text-muted-foreground">{issue.email}</p>
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-medium leading-none">{issue.book}</div>
            <p className="text-sm text-muted-foreground">{issue.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
