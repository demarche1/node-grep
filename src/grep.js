import { createReadStream } from "fs";
import readline from "readline";
import clc from "cli-color";

export async function grep(args) {
  const cwd = process.cwd();
  const fileToRead = `${cwd}/${args.file}`;
  const streams = createReadStream(fileToRead);

  streams.on("error", () => {
    console.error(clc.bgRed(clc.white(`${args.file} does not exists`)));
    process.exit(1);
  });

  const rl = readline.createInterface({
    input: streams,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    console.log(
      line.toString().replace(args.searchTerm, clc.red(args.searchTerm))
    );
  }
}
