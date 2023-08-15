-- AlterTable
ALTER TABLE `products` ADD COLUMN `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `gender` ENUM('Female', 'Male') NOT NULL DEFAULT 'Male';
