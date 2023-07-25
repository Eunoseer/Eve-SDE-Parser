import fs from "fs/promises";
import YAML from "yaml";
import { type } from "../types/entity";

const writeYaml = (yaml: type, path: string): void => {
  fs.writeFile(path, YAML.stringify(yaml));
};

export default writeYaml;
