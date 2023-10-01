import { LANGUAGES } from './languages';

export interface arguments {
  inputPath: string;
  outputPath: string;
  overwrite: boolean;
  languages: LANGUAGES[];
}
