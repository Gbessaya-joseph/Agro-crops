/*
  Warnings:

  - You are about to drop the column `NomFourn` on the `fournisseur` table. All the data in the column will be lost.
  - You are about to drop the column `PrenFourn` on the `fournisseur` table. All the data in the column will be lost.
  - You are about to drop the column `RegionFourn` on the `fournisseur` table. All the data in the column will be lost.
  - You are about to drop the column `LocPren` on the `preneur` table. All the data in the column will be lost.
  - You are about to drop the column `NomPren` on the `preneur` table. All the data in the column will be lost.
  - You are about to drop the column `PrenPren` on the `preneur` table. All the data in the column will be lost.
  - You are about to drop the column `regionPren` on the `preneur` table. All the data in the column will be lost.
  - Added the required column `LocalPren` to the `Preneur` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `fournisseur` DROP COLUMN `NomFourn`,
    DROP COLUMN `PrenFourn`,
    DROP COLUMN `RegionFourn`;

-- AlterTable
ALTER TABLE `preneur` DROP COLUMN `LocPren`,
    DROP COLUMN `NomPren`,
    DROP COLUMN `PrenPren`,
    DROP COLUMN `regionPren`,
    ADD COLUMN `LocalPren` VARCHAR(191) NOT NULL;
