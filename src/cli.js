import arg from "arg";
import { grep } from "./grep";
import { error } from "./utils";

function parseArguments(rawArgs) {
  try {
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
  } catch {
    error("Please enter all required parameters");
  }
}

export async function cli(rawArgs) {
  const parsedArgs = parseArguments(rawArgs);
  await grep(parsedArgs);
}
