-- CreateTable
CREATE TABLE "tripMember" (
    "experienceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "tripMember_pkey" PRIMARY KEY ("experienceId","userId")
);

-- AddForeignKey
ALTER TABLE "tripMember" ADD CONSTRAINT "tripMember_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experience"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tripMember" ADD CONSTRAINT "tripMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
