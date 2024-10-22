import { TrabalhoProps } from "@domain/entities/Trabalhos";

export abstract class TrabalhoRepository {
  abstract save(trabalho: TrabalhoProps): Promise<any>;
  abstract findById(id: number): Promise<TrabalhoProps>;
  abstract deleteById(id: number): Promise<void>;
}