/*
  Warnings:

  - You are about to drop the column `NomFourn` on the `fournisseur` table. All the data in the column will be lost.
  - You are about to drop the column `PrenFourn` on the `fournisseur` table. All the data in the column will be lost.
  - You are about to drop the column `NomPren` on the `preneur` table. All the data in the column will be lost.
  - You are about to drop the column `PrenPren` on the `preneur` table. All the data in the column will be lost.
  - You are about to drop the column `TyPren` on the `preneur` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `account` DROP FOREIGN KEY `Account_userId_fkey`;

-- DropForeignKey
ALTER TABLE `fournisseur` DROP FOREIGN KEY `Fournisseur_userId_fkey`;

-- DropForeignKey
ALTER TABLE `preneur` DROP FOREIGN KEY `Preneur_userId_fkey`;

-- DropForeignKey
ALTER TABLE `session` DROP FOREIGN KEY `Session_userId_fkey`;

-- DropIndex
DROP INDEX `Account_userId_fkey` ON `account`;

-- DropIndex
DROP INDEX `Session_userId_fkey` ON `session`;

-- AlterTable
ALTER TABLE `account` MODIFY `userId` VARCHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE `fournisseur` DROP COLUMN `NomFourn`,
    DROP COLUMN `PrenFourn`,
    MODIFY `userId` VARCHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE `preneur` DROP COLUMN `NomPren`,
    DROP COLUMN `PrenPren`,
    DROP COLUMN `TyPren`,
    MODIFY `userId` VARCHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE `produit` MODIFY `ImageUrl` VARCHAR(512) NULL;

-- AlterTable
ALTER TABLE `session` MODIFY `userId` VARCHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    ADD COLUMN `avatar` VARCHAR(512) NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `name` VARCHAR(191) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `id` VARCHAR(36) NOT NULL,
    MODIFY `password` VARCHAR(255) NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fournisseur` ADD CONSTRAINT `Fournisseur_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Preneur` ADD CONSTRAINT `Preneur_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
