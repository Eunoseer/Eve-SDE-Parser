import YAML from 'yaml';
import fsPromise from 'fs/promises';
import { entityParent } from '../types/entity';

export const parseYaml = async (path: string): Promise<entityParent> => {
  let parsedYaml: entityParent;
  let inputFile: string = await fsPromise.readFile(path, 'utf-8');

  try {
    parsedYaml = YAML.parse(inputFile) as entityParent;
  } catch (err) {
    console.error(err);
    return;
  }

  return parsedYaml;
};
