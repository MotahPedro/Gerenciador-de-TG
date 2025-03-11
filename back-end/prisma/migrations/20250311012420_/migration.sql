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
    `professorOrientadorCpf` VARCHAR(191) NOT NULL,
    `cpfs` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CursoAtuacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `curso` VARCHAR(191) NOT NULL,
    `professorOrientadorCpf` VARCHAR(191) NOT NULL,
    `cpfs` JSON NOT NULL,

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
    `professorOrientadorCpf` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `AlunoOrientado_matricula_key`(`matricula`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Trabalho` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tema` VARCHAR(191) NOT NULL,
    `objetivo` VARCHAR(191) NOT NULL,
    `questaoProblema` VARCHAR(191) NOT NULL,
    `alunoOrientadoRa` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Trabalho_alunoOrientadoRa_key`(`alunoOrientadoRa`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LinhaOrientacao` ADD CONSTRAINT `LinhaOrientacao_professorOrientadorCpf_fkey` FOREIGN KEY (`professorOrientadorCpf`) REFERENCES `professororientador`(`cpf`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CursoAtuacao` ADD CONSTRAINT `CursoAtuacao_professorOrientadorCpf_fkey` FOREIGN KEY (`professorOrientadorCpf`) REFERENCES `professororientador`(`cpf`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlunoOrientado` ADD CONSTRAINT `AlunoOrientado_professorOrientadorCpf_fkey` FOREIGN KEY (`professorOrientadorCpf`) REFERENCES `professororientador`(`cpf`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Trabalho` ADD CONSTRAINT `Trabalho_alunoOrientadoRa_fkey` FOREIGN KEY (`alunoOrientadoRa`) REFERENCES `AlunoOrientado`(`matricula`) ON DELETE CASCADE ON UPDATE CASCADE;
