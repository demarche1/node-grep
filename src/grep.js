import { createReadStream } from "fs";
import { createInterface } from "readline";
import { error } from "./utils";
import clc from "cli-color";

export async function grep({ file, searchTerm }) {
  const cwd = process.cwd();
  const fileToRead = `${cwd}/${file}`;
  const streams = createReadStream(fileToRead);
  const pattern = new RegExp(searchTerm);

  streams.on("error", () => {
    error(`${file} does not exists`);
  });

  const rl = createInterface({
    input: streams,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    console.log(line.toString().replace(pattern, clc.red(searchTerm)));
  }
}
