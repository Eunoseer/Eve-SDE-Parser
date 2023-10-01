import fs from 'fs/promises';
import YAML from 'yaml';
import { entityParent } from '../types/entity';

export const writeYaml = (yaml: entityParent, path: string): void => {
  fs.writeFile(path, YAML.stringify(yaml));
};
