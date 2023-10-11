export type Overdue = {
  rollNumber: string;
  name: string;
  role: string;
  title: string;
  amount: number;
};

export const data: Overdue[] = [
  {
    rollNumber: "12345",
    name: "John Doe",
    role: "Student",
    title: "The Great Gatsby",
    amount: 50,
  },
  {
    rollNumber: "24680",
    name: "Eva Williams",
    role: "Student",
    title: "1984",
    amount: 70,
  },
];
