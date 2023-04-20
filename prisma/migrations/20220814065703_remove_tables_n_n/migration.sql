/*
  Warnings:

  - You are about to drop the `roles_has_claims` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users_has_roles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "roles_has_claims" DROP CONSTRAINT "roles_has_claims_claimId_fkey";

-- DropForeignKey
ALTER TABLE "roles_has_claims" DROP CONSTRAINT "roles_has_claims_roleId_fkey";

-- DropForeignKey
ALTER TABLE "users_has_roles" DROP CONSTRAINT "users_has_roles_roleId_fkey";

-- DropForeignKey
ALTER TABLE "users_has_roles" DROP CONSTRAINT "users_has_roles_userId_fkey";

-- DropTable
DROP TABLE "roles_has_claims";

-- DropTable
DROP TABLE "users_has_roles";

-- CreateTable
CREATE TABLE "_RoleToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ClaimToRole" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RoleToUser_AB_unique" ON "_RoleToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_RoleToUser_B_index" ON "_RoleToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ClaimToRole_AB_unique" ON "_ClaimToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_ClaimToRole_B_index" ON "_ClaimToRole"("B");

-- AddForeignKey
ALTER TABLE "_RoleToUser" ADD CONSTRAINT "_RoleToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoleToUser" ADD CONSTRAINT "_RoleToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClaimToRole" ADD CONSTRAINT "_ClaimToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "claims"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClaimToRole" ADD CONSTRAINT "_ClaimToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
