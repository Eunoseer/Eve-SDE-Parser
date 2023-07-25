import YAML from "yaml";
import fsPromise from "fs/promises";
import { type } from "../types/entity";

const parseYaml = async (path: string): Promise<type> => {
  let parsedYaml: type;
  let inputFile: string = await fsPromise.readFile(path, "utf-8");

  try {
    parsedYaml = YAML.parse(inputFile) as type;
  } catch (err) {
    console.error(err);
    return;
  }

  return parsedYaml;
};

export default parseYaml;
