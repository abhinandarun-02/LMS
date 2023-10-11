export type User = {
  rollNumber: string;
  name: string;
  email: string;
  phone: string;
  role: "teacher" | "student";
};

export const data: User[] = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    role: "student",
    rollNumber: "12345",
  },
  {
    name: "Alice Smith",
    email: "alice.smith@example.com",
    phone: "987-654-3210",
    role: "teacher",
    rollNumber: "67890",
  },
  {
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    phone: "555-123-4567",
    role: "student",
    rollNumber: "13579",
  },
  {
    name: "Eva Williams",
    email: "eva.williams@example.com",
    phone: "333-555-7890",
    role: "teacher",
    rollNumber: "24680",
  },
  {
    name: "Michael Davis",
    email: "michael.davis@example.com",
    phone: "222-444-6789",
    role: "student",
    rollNumber: "112233",
  },
  {
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "111-222-3333",
    role: "teacher",
    rollNumber: "998877",
  },
  {
    name: "David Miller",
    email: "david.miller@example.com",
    phone: "444-555-6666",
    role: "student",
    rollNumber: "665544",
  },
  {
    name: "Linda Wilson",
    email: "linda.wilson@example.com",
    phone: "666-777-8888",
    role: "teacher",
    rollNumber: "443322",
  },
  {
    name: "James Brown",
    email: "james.brown@example.com",
    phone: "777-888-9999",
    role: "student",
    rollNumber: "778899",
  },
  {
    name: "Emily Taylor",
    email: "emily.taylor@example.com",
    phone: "888-999-0000",
    role: "teacher",
    rollNumber: "112200",
  },
];
