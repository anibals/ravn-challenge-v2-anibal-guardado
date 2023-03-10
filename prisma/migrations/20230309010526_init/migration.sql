/*
  Warnings:

  - Added the required column `urlImg` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "urlImg" TEXT NOT NULL,
ALTER COLUMN "created" SET DEFAULT CURRENT_TIMESTAMP;
