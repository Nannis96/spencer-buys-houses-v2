/*
  Warnings:

  - You are about to drop the column `isCaseStudy` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `isPublished` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "isCaseStudy",
DROP COLUMN "isPublished",
ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'general',
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'draft';
