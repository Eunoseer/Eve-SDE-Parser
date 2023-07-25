import filterYaml from "./helpers/filterYaml";
import parseArgs from "./helpers/parseArgs";
import parseYaml from "./helpers/parseYaml";
import writeYaml from "./helpers/writeYaml";
import { arguments } from "./types/args";

const main = async () => {
  //ignore the first two arguments as they are not used by us.
  const rawArgs = process.argv.slice(2);
  let args: arguments;

  try {
    args = parseArgs(rawArgs);
  } catch (err) {
    console.error("Arguments Exception:", err.message);
    return;
  }

  const yaml = await parseYaml(args.inputPath);
  const filteredYaml = filterYaml(yaml, args.languages);
  await writeYaml(filteredYaml, args.outputPath);
};

main();
