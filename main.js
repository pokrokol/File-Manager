import readline from "readline";
import { cat } from "./commands/fs/cat.js";
import { add } from "./commands/fs/add.js";
import { rename } from "./commands/fs/rename.js";
import { copy } from "./commands/fs/copy.js";
import { move } from "./commands/fs/move.js";
import { remove } from "./commands/fs/delete.js";
import { up } from "./commands/nav/up.js";
import { cd } from "./commands/nav/cd.js";
import { ls } from "./commands/nav/ls.js";
import { compress } from "./zip/compress.js";
import { decompress } from "./zip/decompress.js";
import { hash } from "./commands/hash/hash.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getCurrentPath = () => process.cwd();

const fileManager = async () => {
  const user = process.argv.find((arg) => arg.startsWith("--username="));

  if (!user) {
    console.error(
      "Provide a username. Example: npm run start -- --username=John"
    );
    process.exit();
  }

  const username = user.split("=")[1];
  console.log(`Welcome ${username}!\n`);
  console.log(`You are currently in ${getCurrentPath()}`);

  rl.on("line", async (input) => {
    const [command, ...args] = input.trim().split(/\s+/);

    try {
      switch (command) {
        case ".exit":
          console.log(`Exit, Thanks for using ${username}!`);
          process.exit();

        case "add":
          await add(args.join(" "));
          break;

        case "cat":
          await cat(args.join(" "));
          break;

        case "rn":
          await rename(args.join(" "));
          break;

        case "cp":
          await copy(args.join(" "));
          break;

        case "mv":
          await move(args.join(" "));
          break;

        case "rm":
          await remove(args.join(" "));
          break;

        case "up":
          await up();
          break;

        case "cd":
          await cd(args.join(" "));
          break;

        case "ls":
          await ls();
          break;

        case "hash":
          await hash(args.join(" "));
          break;

        case "compress":
          await compress(args.join(" "));
          break;

        case "decompress":
          await decompress(args.join(" "));
          break;

        default:
          console.error("Invalid command");
      }
    } catch (err) {
      console.error(`Error executing command: ${err.message}`);
    }

    console.log(`You are currently in ${getCurrentPath()}`);
  });

  rl.on("SIGINT", () => {
    console.log(`Thank you, Bye, ${username}!`);
    rl.close();
  });
};

fileManager();
