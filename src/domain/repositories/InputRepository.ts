// src/domain/repositories/InputRepository.ts
import { Input } from "../entities/Input";

export interface InputRepository {
  saveInput(input: Input): Promise<Input>;
  findInputById(id: string): Promise<Input | null>;
  findAllInputs(): Promise<Input[]>;
}
