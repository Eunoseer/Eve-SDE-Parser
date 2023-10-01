import fs from 'fs';
import { parseArgs } from '../../src/helpers';
import { arguments } from '../../src/types/args';
import { LANGUAGES } from '../../src/types/languages';
import {
  InputOutputMatchException,
  InvalidArgsLengthException,
  InvalidInputPathException,
  InvalidLanguageException,
  OutputFileExistsException,
} from '../../src/types/errors';

const validInputPath = `${__dirname}/testinput.yaml`;
const validOutputPath = `${__dirname}/testoutput.yaml`;
const validLanguages = LANGUAGES.EN;
const validOverwrite = true;

const invalidInputPath = `${__dirname}/fake.yaml`;
const invalidLanguages = 'en,00';
const invalidOverwriteFalse = false;
const invalidOverwriteFake = 'blah';

describe('parse arguments', () => {
  beforeAll(() => {
    fs.writeFileSync(validInputPath, '');
    fs.writeFileSync(validOutputPath, '');
  });

  afterAll(() => {
    fs.unlinkSync(validInputPath);
    fs.unlinkSync(validOutputPath);
  });

  it('should return an args object with the expected structure', () => {
    const mockArgsResponse: arguments = {
      inputPath: validInputPath,
      outputPath: validOutputPath,
      overwrite: validOverwrite,
      languages: [validLanguages],
    };

    const response = parseArgs([
      validInputPath,
      validOutputPath,
      validLanguages,
      validOverwrite.toString(),
    ]);

    expect(response).toEqual(mockArgsResponse);
  });

  it('should expect a minimum of 3 parameters', () => {
    const args = [validInputPath, validOutputPath];
    expect(() => parseArgs(args)).toThrowError(InvalidArgsLengthException);
  });

  it('should validate the input and output paths are not the same', () => {
    expect(() =>
      parseArgs([
        validInputPath,
        validInputPath,
        validLanguages,
        validOverwrite.toString(),
      ])
    ).toThrowError(InputOutputMatchException);
  });

  it('should validate that the input file and path exist', () => {
    expect(() =>
      parseArgs([
        invalidInputPath,
        validOutputPath,
        validLanguages,
        validOverwrite.toString(),
      ])
    ).toThrowError(InvalidInputPathException);
  });

  it('should validate that the language codes provided are valid', () => {
    expect(() => {
      parseArgs([
        validInputPath,
        validOutputPath,
        invalidLanguages,
        validOverwrite.toString(),
      ]);
    }).toThrowError(InvalidLanguageException);
  });

  it('should prevent overwriting if the overwrite flag is false and an output file exists', () => {
    expect(() =>
      parseArgs([
        validInputPath,
        validOutputPath,
        validLanguages,
        invalidOverwriteFalse.toString(),
      ])
    ).toThrowError(OutputFileExistsException);
  });

  it('should prevent overwriting if an invalid overwrite flag is provided and an output file exists', () => {
    expect(() =>
      parseArgs([
        validInputPath,
        validOutputPath,
        validLanguages,
        invalidOverwriteFake,
      ])
    ).toThrowError(OutputFileExistsException);
  });

  it('should prevent overwriting if an overwrite flag is not provided and an output file exists', () => {
    expect(() =>
      parseArgs([validInputPath, validOutputPath, validLanguages])
    ).toThrowError(OutputFileExistsException);
  });
});
