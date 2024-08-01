/*
  Warnings:

  - A unique constraint covering the columns `[userId,product]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CartItem_userId_product_key" ON "CartItem"("userId", "product");
