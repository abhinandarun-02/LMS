-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('teacher', 'student');

-- CreateTable
CREATE TABLE "User" (
    "rollNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "role" "UserRoles" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("rollNumber")
);
