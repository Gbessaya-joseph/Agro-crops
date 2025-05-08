/*
  Warnings:

  - You are about to drop the column `LocalPren` on the `preneur` table. All the data in the column will be lost.
  - Added the required column `NomFourn` to the `Fournisseur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PrenFourn` to the `Fournisseur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `RegionFourn` to the `Fournisseur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LocPren` to the `Preneur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NomPren` to the `Preneur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PrenPren` to the `Preneur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regionPren` to the `Preneur` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `fournisseur` ADD COLUMN `NomFourn` VARCHAR(191) NOT NULL,
    ADD COLUMN `PrenFourn` VARCHAR(191) NOT NULL,
    ADD COLUMN `RegionFourn` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `preneur` DROP COLUMN `LocalPren`,
    ADD COLUMN `LocPren` VARCHAR(191) NOT NULL,
    ADD COLUMN `NomPren` VARCHAR(191) NOT NULL,
    ADD COLUMN `PrenPren` VARCHAR(191) NOT NULL,
    ADD COLUMN `regionPren` VARCHAR(191) NOT NULL;
