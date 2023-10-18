import { Users } from "@/components/Users";
import { Issue, User } from "@prisma/client";

interface IssueWithUser extends Issue{
 user: User
}
interface RecentIssuesProps {
  data: IssueWithUser[];
}

export const RecentIssues: React.FC<RecentIssuesProps> = ({ data }) => {
  return (
    <div className="grid grid-rows-3 space-y-4">
      {data.map((item: IssueWithUser) => (
        <div className="flex justify-between items-center" key={item.id}>
          <div className="flex items-center">
            <Users name={item.user_name} image={item.user?.image} />
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {item.user_name}
              </p>
              <p className="text-sm text-muted-foreground">{item.user_id}</p>
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-medium leading-none">
              {item.book_title}
            </div>
            <p className="text-sm text-muted-foreground">{item.created_at}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
