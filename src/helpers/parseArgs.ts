import fs from 'fs';
import { arguments } from '../types/args';
import {
  InvalidLanguageException,
  InvalidArgsLengthException,
  InputOutputMatchException,
  InvalidInputPathException,
  OutputFileExistsException,
} from '../types/errors';
import { LANGUAGES } from '../types/languages';

export const parseArgs = (args: string[]): arguments => {
  // Check that there is a sufficient number of parameters.
  if (args.length < 3) {
    throw InvalidArgsLengthException;
  }

  // Ensure that the input and output paths are not the same.
  if (args[0] === args[1]) {
    throw InputOutputMatchException;
  }

  // Ensure that there is a valid input file at the given input path.
  try {
    fs.statSync(args[0]);
  } catch (error) {
    throw InvalidInputPathException;
  }

  // Ensure that the incoming languages list contains
  const languages = args[2].split(',');
  languages.forEach((lang: string) => {
    if (!Object.values(LANGUAGES).includes(lang as LANGUAGES)) {
      throw InvalidLanguageException;
    }
  });

  // Ensure that overwriting is disabled that there is no existing file at the output path.
  const overwriteEnabled =
    (args[3] && args[3].toUpperCase() === 'TRUE') || false;

  try {
    const stats = fs.statSync(args[1]);
    if (stats && !overwriteEnabled) {
      throw new Error('');
    }
  } catch (err) {
    throw OutputFileExistsException;
  }

  // Finally, parse the args if there are no errors and return the object.
  return {
    inputPath: args[0],
    outputPath: args[1],
    languages: languages as LANGUAGES[],
    overwrite: overwriteEnabled,
  };
};
