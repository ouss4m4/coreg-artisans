import { Input } from "../../domain/entities/Input";
import { InputRepository } from "../../domain/repositories/InputRepository";

export class InputUseCase {
  private inputRepository: InputRepository;

  constructor(inputRepository: InputRepository) {
    this.inputRepository = inputRepository;
  }

  async createAndSaveInput(inputData: Omit<Input, "id">): Promise<Input> {
    try {
      // Create an instance of the Input entity and populate it with data
      const input: Input = new Input(
        inputData.name,
        inputData.label,
        inputData.validationRegex,
        inputData.required,
        inputData.customHTML
      );

      // Use the InputRepository to save the input to the database
      const savedInput = await this.inputRepository.saveInput(input);

      return savedInput;
    } catch (error) {
      console.error("Error saving input:", error);
      throw error;
    }
  }

  async findInputById(id: string): Promise<Input | null> {
    try {
      const input = await this.inputRepository.findInputById(id);
      return input;
    } catch (error) {
      console.error("Error finding input by ID:", error);
      throw error;
    }
  }

  async findAllInputs(): Promise<Input[]> {
    console.log("eeyyy");
    try {
      const inputs = await this.inputRepository.findAllInputs();
      return inputs;
    } catch (error) {
      console.error("Error finding inputs:", error);
      throw error;
    }
  }
}
