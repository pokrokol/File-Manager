import readline from "readline";
import path from "path";
import { cat } from "./commands/fs/cat.js";
import { add } from "./commands/fs/add.js";
import { rename } from "./commands/fs/rename.js";
import { copy } from "./commands/fs/copy.js";
import { move } from "./commands/fs/move.js";
import { remove } from "./commands/fs/delete.js";
import { up } from "./commands/nav/up.js";
import { cd } from "./commands/nav/cd.js";
import { ls } from "./commands/nav/ls.js";
import { compress } from "./commands/zlib/compress.js";
import { decompress } from "./commands/zlib/decompress.js";
import { hash } from "./commands/hash/hash.js";
import { systemOps } from "./commands/os/os.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const fileManager = async () => {
  const main_path = () => process.cwd();
  console.log(`You are currently in ${process.cwd()}`);
  const user = process.argv[2].split("=")[1];
  if (user === undefined) {
    console.log(
      "Provide a username. Example: npm run start -- --username=Mike"
    );
    process.exit();
  }
  console.log(`Welcome to the File Manager, ${user}!\n`);
  rl.on("line", async (input) => {
    let argument = input.trim().split(" ")[0];

    switch (argument) {
      case ".exit": {
        console.log(`Thank you, Bye, ${user}!`);
        process.exit();
      }
      case "up": {
        await up();
        break;
      }
      case "cd": {
        await cd(input);
        break;
      }
      case "ls": {
        await ls();
        break;
      }
      case "add": {
        await add(input);
        break;
      }
      case "cat": {
        await cat(input);
        break;
      }
      case "rn": {
        await rename(input);
        break;
      }
      case "cp": {
        await copy(input);
        break;
      }
      case "mv": {
        await move(input);
        break;
      }
      case "rm": {
        await remove(input);
        break;
      }
      case "hash": {
        await hash(input);
        break;
      }
      case "compress": {
        await compress(input);
        break;
      }
      case "decompress": {
        await decompress(input);
        break;
      }

      case "os": {
        await systemOps(input);
        break;
      }
      default: {
        console.log("Invalid command");
      }
    }
    console.log(`You are currently in ${main_path()}`);
  });
  rl.on("SIGINT", () => {
    console.log(`hi, ${user}!`);
    rl.close();
  });
};

fileManager();
