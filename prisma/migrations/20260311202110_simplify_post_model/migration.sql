/*
  Warnings:

  - You are about to drop the column `authorBioEn` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `authorBioEs` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `contentEn` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `contentEs` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `focusKeywordEn` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `focusKeywordEs` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `seoDescEn` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `seoDescEs` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `seoTitleEn` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `seoTitleEs` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `titleEn` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `titleEs` on the `Post` table. All the data in the column will be lost.
  - Added the required column `content` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "authorBioEn",
DROP COLUMN "authorBioEs",
DROP COLUMN "contentEn",
DROP COLUMN "contentEs",
DROP COLUMN "focusKeywordEn",
DROP COLUMN "focusKeywordEs",
DROP COLUMN "seoDescEn",
DROP COLUMN "seoDescEs",
DROP COLUMN "seoTitleEn",
DROP COLUMN "seoTitleEs",
DROP COLUMN "titleEn",
DROP COLUMN "titleEs",
ADD COLUMN     "authorBio" TEXT,
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "focusKeyword" TEXT,
ADD COLUMN     "seoDesc" TEXT,
ADD COLUMN     "seoTitle" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;
