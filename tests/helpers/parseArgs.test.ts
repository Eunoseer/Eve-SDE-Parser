import parseArgs from "../../src/helpers/parseArgs";
import fs from "fs";
import { arguments } from "../../src/types/args";
import { LANGUAGES } from "../../src/types/languages";

const validInputPath = `${__dirname}/testinput.yaml`;
const validOutputPath = `${__dirname}/testoutput.yaml`;
const validLanguages = LANGUAGES.en;
const validOverwrite = true;

const invalidInputPath = `${__dirname}/fake.yaml`;
const invalidLanguages = "en,00";
const invalidOverwriteFalse = false;
const invalidOverwriteFake = "blah";

describe("parse arguments", () => {
  beforeAll(() => {
    fs.writeFileSync(validInputPath, "");
    fs.writeFileSync(validOutputPath, "");
  });

  afterAll(() => {
    fs.unlinkSync(validInputPath);
    fs.unlinkSync(validOutputPath);
  });

  it("should return an args object with the expected structure", () => {
    const mockArgsResponse: arguments = {
      inputPath: validInputPath,
      outputPath: validOutputPath,
      overwrite: validOverwrite,
      languages: [validLanguages],
    };

    const response = parseArgs([validInputPath, validOutputPath, validLanguages, validOverwrite.toString()]);

    expect(response).toEqual(mockArgsResponse);
  });

  it("should expect a minimum of 3 parameters", () => {
    const args = [validInputPath, validOutputPath];
    expect(() => parseArgs(args)).toThrowError(`Insufficient Parameters. ${args.length} given, 3 expected.`);
  });

  it("should validate the input and output paths are not the same", () => {
    expect(() => parseArgs([validInputPath, validInputPath, validLanguages, validOverwrite.toString()])).toThrowError(
      "Input and Output paths cannot be the same."
    );
  });

  it("should validate that the input file and path exist", () => {
    expect(() =>
      parseArgs([invalidInputPath, validOutputPath, validLanguages, validOverwrite.toString()])
    ).toThrowError("Input file doesn't exist at path.");
  });

  it("should validate that the language codes provided are valid", () => {
    expect(() => {
      parseArgs([validInputPath, validOutputPath, invalidLanguages, validOverwrite.toString()]);
    }).toThrowError("Invalid language code detected.");
  });

  it("should prevent overwriting if the overwrite flag is false and an output file exists", () => {
    expect(() =>
      parseArgs([validInputPath, validOutputPath, validLanguages, invalidOverwriteFalse.toString()])
    ).toThrowError("Output file already exists at path and overwriting is disabled.");
  });

  it("should prevent overwriting if an invalid overwrite flag is provided and an output file exists", () => {
    expect(() => parseArgs([validInputPath, validOutputPath, validLanguages, invalidOverwriteFake])).toThrowError(
      "Output file already exists at path and overwriting is disabled."
    );
  });

  it("should prevent overwriting if an overwrite flag is not provided and an output file exists", () => {
    expect(() => parseArgs([validInputPath, validOutputPath, validLanguages])).toThrowError(
      "Output file already exists at path and overwriting is disabled."
    );
  });
});
