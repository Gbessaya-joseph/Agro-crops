-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('FOURNISSEUR', 'PRENEUR') NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `expires` DATETIME(3) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Session_sessionToken_key`(`sessionToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fournisseur` (
    `idFourn` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `NomFourn` VARCHAR(191) NOT NULL,
    `PrenFourn` VARCHAR(191) NOT NULL,
    `TelFourn` CHAR(8) NOT NULL,
    `LocalFourn` VARCHAR(191) NOT NULL,
    `RegionFourn` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Fournisseur_userId_key`(`userId`),
    UNIQUE INDEX `Fournisseur_TelFourn_key`(`TelFourn`),
    PRIMARY KEY (`idFourn`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Preneur` (
    `idPren` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `NomPren` VARCHAR(191) NOT NULL,
    `TelFourn` CHAR(8) NOT NULL,
    `LocPren` VARCHAR(191) NOT NULL,
    `TyPren` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Preneur_userId_key`(`userId`),
    UNIQUE INDEX `Preneur_TelFourn_key`(`TelFourn`),
    PRIMARY KEY (`idPren`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Commande` (
    `NumCmde` INTEGER NOT NULL AUTO_INCREMENT,
    `DateCmde` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `QteCmde` INTEGER NOT NULL,
    `RefldPren` INTEGER NOT NULL,
    `RefldFourn` INTEGER NOT NULL,
    `RefldProd` INTEGER NOT NULL,

    PRIMARY KEY (`NumCmde`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produit` (
    `idProd` INTEGER NOT NULL AUTO_INCREMENT,
    `NomProd` VARCHAR(191) NOT NULL,
    `ImageUrl` VARCHAR(255) NULL,
    `RefldCat` INTEGER NOT NULL,

    UNIQUE INDEX `Produit_NomProd_key`(`NomProd`),
    INDEX `Produit_RefldCat_idx`(`RefldCat`),
    PRIMARY KEY (`idProd`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categorie` (
    `idCat` INTEGER NOT NULL AUTO_INCREMENT,
    `NomCat` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Categorie_NomCat_key`(`NomCat`),
    PRIMARY KEY (`idCat`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Proposition` (
    `idProp` INTEGER NOT NULL AUTO_INCREMENT,
    `QteProp` INTEGER NOT NULL,
    `DateProp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `DateModifProp` DATETIME(3) NOT NULL,
    `StatusProp` ENUM('PENDING', 'ACCEPTED', 'REJECTED', 'EXPIRED') NOT NULL,
    `PrixProp` DOUBLE NOT NULL,
    `DateExpirProp` DATETIME(3) NOT NULL,
    `RefldFourn` INTEGER NOT NULL,
    `RefldPren` INTEGER NULL,
    `RefldProd` INTEGER NOT NULL,

    PRIMARY KEY (`idProp`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fournisseur` ADD CONSTRAINT `Fournisseur_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Preneur` ADD CONSTRAINT `Preneur_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Commande` ADD CONSTRAINT `Commande_RefldPren_fkey` FOREIGN KEY (`RefldPren`) REFERENCES `Preneur`(`idPren`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Commande` ADD CONSTRAINT `Commande_RefldFourn_fkey` FOREIGN KEY (`RefldFourn`) REFERENCES `Fournisseur`(`idFourn`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Commande` ADD CONSTRAINT `Commande_RefldProd_fkey` FOREIGN KEY (`RefldProd`) REFERENCES `Produit`(`idProd`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produit` ADD CONSTRAINT `Produit_RefldCat_fkey` FOREIGN KEY (`RefldCat`) REFERENCES `Categorie`(`idCat`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Proposition` ADD CONSTRAINT `Proposition_RefldFourn_fkey` FOREIGN KEY (`RefldFourn`) REFERENCES `Fournisseur`(`idFourn`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Proposition` ADD CONSTRAINT `Proposition_RefldPren_fkey` FOREIGN KEY (`RefldPren`) REFERENCES `Preneur`(`idPren`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Proposition` ADD CONSTRAINT `Proposition_RefldProd_fkey` FOREIGN KEY (`RefldProd`) REFERENCES `Produit`(`idProd`) ON DELETE RESTRICT ON UPDATE CASCADE;
