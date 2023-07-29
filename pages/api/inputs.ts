// pages/api/inputs.ts
import { NextApiRequest, NextApiResponse } from "next";
import { InputRepositoryImpl } from "../../src/infrastructure/db/InputRepositoryImpl";
import { InputUseCase } from "../../src/app/usecases/InputUseCase";

const inputRepository = new InputRepositoryImpl();
const inputUseCase = new InputUseCase(inputRepository);

const handleInputs = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      // Parse the input data from the request body
      const { name, label, validationRegex, required, customHTML } = req.body;

      // Use the InputUseCase to create and save the input
      const savedInput = await inputUseCase.createAndSaveInput({
        name,
        label,
        validationRegex,
        required,
        customHTML,
      });

      // Return the saved input as the response
      res.status(201).json(savedInput);
    } catch (error) {
      console.error("Error saving input:", error);
      res.status(500).json({ error: "Error saving input" });
    }
  } else if (req.method === "GET") {
    console.log(req.query);
    const { id } = req.query;

    if (typeof id === "string") {
      try {
        // Use the InputUseCase to find input by ID
        const input = await inputUseCase.findInputById(id);

        if (input) {
          // Return the found input as the response
          res.status(200).json(input);
        } else {
          res.status(404).json({ error: "Input not found" });
        }
      } catch (error) {
        console.error("Error finding input by ID:", error);
        res.status(500).json({ error: "Error finding input" });
      }
    } else {
      try {
        // Use the InputUseCase to get all inputs
        const inputs = await inputUseCase.findAllInputs();

        // Return the array of inputs as the response
        res.status(200).json(inputs);
      } catch (error) {
        console.error("Error getting inputs:", error);
        res.status(500).json({ error: "Error getting inputs" });
      }
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default handleInputs;
