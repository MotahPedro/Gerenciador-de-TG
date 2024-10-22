import { ProfessorOrientadorProps } from "./ProfessorOrientador";

export interface AlunoOrientadoProps {
  id?: number;
  matricula: string;
  nome: string;
  email: string;
  senha: string;
  curso: string;
  turma: string;
  periodo: string;
  semestre: string;
  filaDependencia: boolean;
  professorOrientador: { nome: string };
  professorOrientadorId: number;
  trabalhos: {
    tema: string;
    objetivo: string;
    questaoProblema: string;
  }[];
}