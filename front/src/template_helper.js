import process from "process";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { mkdirSync, existsSync, writeFileSync } from "fs";
const __filename = fileURLToPath(import.meta.url);

if (process.argv.length !== 3) {
  console.error("please give directory/file/name/description");
  process.exit(1);
}

const argument = process.argv[2];
export const getFileWriter = (key) => {
  const __dirname = dirname(__filename);

  return (getFromArgument) => {
    const { data, directory, filename } = getFromArgument(argument);
    mkdirSync(join(__dirname, key, directory), {
      recursive: true,
    });
    const destination = join(__dirname, key, directory, filename);
    if (existsSync(destination)) {
      console.log(`not writing file ${destination} because it already exists`);
      return;
    }
    writeFileSync(destination, data);
  };
};
