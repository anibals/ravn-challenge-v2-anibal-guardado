/*
  Warnings:

  - You are about to drop the column `cuserId` on the `Order` table. All the data in the column will be lost.
  - Added the required column `created` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created` to the `ProductsOnOrder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_cuserId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "cuserId",
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ProductsOnOrder" ADD COLUMN     "created" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
