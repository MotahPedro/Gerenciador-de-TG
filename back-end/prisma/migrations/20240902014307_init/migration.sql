/*
  Warnings:

  - You are about to drop the column `professorCoordenadorId` on the `trabalho` table. All the data in the column will be lost.
  - You are about to drop the `professorcoordenador` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `trabalho` DROP FOREIGN KEY `Trabalho_professorCoordenadorId_fkey`;

-- DropIndex
DROP INDEX `AlunoOrientado_matricula_key` ON `alunoorientado`;

-- AlterTable
ALTER TABLE `trabalho` DROP COLUMN `professorCoordenadorId`;

-- DropTable
DROP TABLE `professorcoordenador`;

-- RenameIndex
ALTER TABLE `professororientador` RENAME INDEX `ProfessorOrientador_cpf_key` TO `professororientador_cpf_key`;

-- RenameIndex
ALTER TABLE `professororientador` RENAME INDEX `ProfessorOrientador_email_key` TO `professororientador_email_key`;
