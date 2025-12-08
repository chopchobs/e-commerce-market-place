/*
  Warnings:

  - You are about to drop the column `currentcy` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Order` DROP COLUMN `currentcy`,
    ADD COLUMN `address` VARCHAR(191) NULL,
    ADD COLUMN `currency` VARCHAR(191) NULL,
    ADD COLUMN `orderTotal` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `shipping` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `stripePaymentId` VARCHAR(191) NULL,
    MODIFY `amount` INTEGER NULL,
    MODIFY `status` VARCHAR(191) NULL;
