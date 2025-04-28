/*
  Warnings:

  - You are about to drop the column `TelFourn` on the `preneur` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[TelPren]` on the table `Preneur` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `StatusCmd` to the `Commande` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PrenPren` to the `Preneur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TelPren` to the `Preneur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `RefldFourn` to the `Produit` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Preneur_TelFourn_key` ON `preneur`;

-- AlterTable
ALTER TABLE `commande` ADD COLUMN `StatusCmd` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `preneur` DROP COLUMN `TelFourn`,
    ADD COLUMN `PrenPren` VARCHAR(191) NOT NULL,
    ADD COLUMN `TelPren` CHAR(8) NOT NULL;

-- AlterTable
ALTER TABLE `produit` ADD COLUMN `RefldFourn` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Preneur_TelPren_key` ON `Preneur`(`TelPren`);

-- AddForeignKey
ALTER TABLE `Produit` ADD CONSTRAINT `Produit_RefldFourn_fkey` FOREIGN KEY (`RefldFourn`) REFERENCES `Fournisseur`(`idFourn`) ON DELETE RESTRICT ON UPDATE CASCADE;
