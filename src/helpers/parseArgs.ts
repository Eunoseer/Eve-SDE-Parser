import { arguments } from "../types/args";
import { LANGUAGES } from "../types/languages";
import fs from "fs";

const parseArgs = (args: string[]): arguments => {
  // Check that there is a sufficient number of parameters.
  if (args.length < 3) {
    throw new Error(`Insufficient Parameters. ${args.length} given, 3 expected.`);
  }

  // Ensure that the input and output paths are not the same.
  if (args[0] === args[1]) {
    throw new Error("Input and Output paths cannot be the same.");
  }

  // Ensure that there is a valid input file at the given input path.
  try {
    fs.statSync(args[0]);
  } catch (error) {
    throw new Error("Input file doesn't exist at path.");
  }

  // Ensure that the incoming languages list contains
  const languages = args[2].split(",");
  languages.forEach((lang: string) => {
    if (!Object.values(LANGUAGES).includes(lang as LANGUAGES)) {
      throw new Error("Invalid language code detected.");
    }
  });

  // Ensure that overwriting is disabled that there is no existing file at the output path.
  const overwriteEnabled = (args.length > 3 && args[3].toUpperCase() === "TRUE") || false;

  fs.stat(args[1], (err) => {
    if (args.length > 2 && args[3].toUpperCase() === "FALSE" && err !== null) {
      throw new Error("Output file already exists at path and overwriting is disabled.");
    }
  });

  // Finally, parse the args if there are no errors and return the object.
  return {
    inputPath: args[0],
    outputPath: args[1],
    languages: languages as LANGUAGES[],
    overwrite: overwriteEnabled,
  };
};

export default parseArgs;
