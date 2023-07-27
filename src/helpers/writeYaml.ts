import fs from "fs/promises";
import YAML from "yaml";
import { type } from "../types/entity";

export const writeYaml = (yaml: type, path: string): void => {
  fs.writeFile(path, YAML.stringify(yaml));
};
