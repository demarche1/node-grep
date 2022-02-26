import arg from "arg";
import { grep } from "./grep";

function parseArguments(rawArgs) {
  const args = arg(
    {
      "--file": String,
      "--search": String,
      "-f": "--file",
      "-s": "--search",
    },
    {
      argv: rawArgs.slice(2),
    }
  );

  return {
    file: args["--file"] || "",
    searchTerm: args["--search"] || "",
  };
}

export async function cli(rawArgs) {
  const parsedArgs = parseArguments(rawArgs);
  await grep(parsedArgs);
}
