/*
  Warnings:

  - You are about to drop the column `authorId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `created` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cuserId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_id_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_id_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "created" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "cuserId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "authorId",
DROP COLUMN "content",
DROP COLUMN "published",
DROP COLUMN "title",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "price" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
DROP COLUMN "name",
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "user" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ProductsOnOrder" (
    "productId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "ProductsOnOrder_pkey" PRIMARY KEY ("productId","orderId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_key" ON "User"("user");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_cuserId_fkey" FOREIGN KEY ("cuserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsOnOrder" ADD CONSTRAINT "ProductsOnOrder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsOnOrder" ADD CONSTRAINT "ProductsOnOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
