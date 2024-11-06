-- CreateTable
CREATE TABLE `professororientador` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cpf` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `quantidadeInstituicoes` INTEGER NOT NULL DEFAULT 0,
    `quantidadeAlunos` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `professororientador_cpf_key`(`cpf`),
    UNIQUE INDEX `professororientador_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LinhaOrientacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `linha` VARCHAR(191) NOT NULL,
    `professorOrientadorId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CursoAtuacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `curso` VARCHAR(191) NOT NULL,
    `professorOrientadorId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AlunoOrientado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `matricula` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `curso` VARCHAR(191) NOT NULL,
    `turma` VARCHAR(191) NOT NULL,
    `periodo` VARCHAR(191) NOT NULL,
    `semestre` VARCHAR(191) NOT NULL,
    `filaDependencia` BOOLEAN NOT NULL,
    `professorOrientadorId` INTEGER NOT NULL,

    UNIQUE INDEX `AlunoOrientado_matricula_key`(`matricula`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Trabalho` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tema` VARCHAR(191) NOT NULL,
    `objetivo` VARCHAR(191) NOT NULL,
    `questaoProblema` VARCHAR(191) NOT NULL,
    `alunoOrientadoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LinhaOrientacao` ADD CONSTRAINT `LinhaOrientacao_professorOrientadorId_fkey` FOREIGN KEY (`professorOrientadorId`) REFERENCES `professororientador`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CursoAtuacao` ADD CONSTRAINT `CursoAtuacao_professorOrientadorId_fkey` FOREIGN KEY (`professorOrientadorId`) REFERENCES `professororientador`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlunoOrientado` ADD CONSTRAINT `AlunoOrientado_professorOrientadorId_fkey` FOREIGN KEY (`professorOrientadorId`) REFERENCES `professororientador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Trabalho` ADD CONSTRAINT `Trabalho_alunoOrientadoId_fkey` FOREIGN KEY (`alunoOrientadoId`) REFERENCES `AlunoOrientado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
