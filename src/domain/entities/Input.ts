export class Input {
  id: number; // For internal use
  name: string;
  label: string;
  validationRegex: string;
  required: boolean;
  customHTML: string;
 
  constructor(name: string, label: string, validationRegex: string, required: boolean, customHTML: string) {
    this.id = 0; // Will be set automatically by the database
    this.name = name;
    this.label = label;
    this.validationRegex = validationRegex;
    this.required = required;
    this.customHTML = customHTML;
  }
}
