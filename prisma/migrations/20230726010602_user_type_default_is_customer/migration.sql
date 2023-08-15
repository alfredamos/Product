-- AlterTable
ALTER TABLE `users` MODIFY `userType` ENUM('Customer', 'Admin') NOT NULL DEFAULT 'Customer';
