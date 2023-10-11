-- CreateTable
CREATE TABLE "Books" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "edition" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL,

    CONSTRAINT "Books_pkey" PRIMARY KEY ("id")
);
