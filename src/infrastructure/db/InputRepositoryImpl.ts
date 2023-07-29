// src/infrastructure/db/InputRepositoryImpl.ts
import { InputRepository } from "../../domain/repositories/InputRepository";
import { Input } from "../../domain/entities/Input";
import client from "./PostgresDB";

export class InputRepositoryImpl implements InputRepository {
  async saveInput(input: Input): Promise<Input> {
    try {
      const { name, label, validationRegex, required, customHTML } = input;
      const query =
        "INSERT INTO inputs (name, label, validation_regex, required, custom_html) VALUES ($1, $2, $3, $4, $5) RETURNING *";
      const values = [name, label, validationRegex, required, customHTML];

      const result = await client.query(query, values);
      const savedInput = result.rows[0];

      return savedInput;
    } catch (error) {
      console.error("Error saving input:", error);
      throw error;
    }
  }

  async findInputById(id: string): Promise<Input | null> {
    try {
      const query = "SELECT * FROM inputs WHERE id = $1";
      const values = [id];

      const result = await client.query(query, values);
      const input = result.rows[0];

      return input || null;
    } catch (error) {
      console.error("Error finding input by ID:", error);
      throw error;
    }
  }

  async findAllInputs(): Promise<Input[]> {
    try {
      const query = "SELECT * FROM inputs";

      const result = await client.query(query);
      const input = result.rows;

      return input || [];
    } catch (error) {
      console.error("Error finding input by ID:", error);
      throw error;
    }
  }
}
