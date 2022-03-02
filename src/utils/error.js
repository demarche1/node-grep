import clc from "cli-color";

export const error = (message) => {
  console.error(clc.bgRed(clc.white(message)));
  process.exit(1);
};
