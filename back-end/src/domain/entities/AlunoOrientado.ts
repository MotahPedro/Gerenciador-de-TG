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
  professorOrientadorCpf: string;
  trabalhos: {
    tema: string;
    objetivo: string;
    questaoProblema: string;
  }[];
}