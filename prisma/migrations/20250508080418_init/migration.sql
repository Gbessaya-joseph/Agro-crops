/*
  Warnings:

  - You are about to drop the column `RegionFourn` on the `fournisseur` table. All the data in the column will be lost.
  - You are about to drop the column `LocPren` on the `preneur` table. All the data in the column will be lost.
  - You are about to drop the column `regionPren` on the `preneur` table. All the data in the column will be lost.
  - Added the required column `LocalPren` to the `Preneur` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `fournisseur` DROP COLUMN `RegionFourn`;

-- AlterTable
ALTER TABLE `preneur` DROP COLUMN `LocPren`,
    DROP COLUMN `regionPren`,
    ADD COLUMN `LocalPren` VARCHAR(191) NOT NULL,
    ADD COLUMN `TyPren` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `produit` ADD COLUMN `publicId` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `avatarPublicId` VARCHAR(255) NULL;
