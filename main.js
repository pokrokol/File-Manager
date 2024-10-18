import readline from "readline";
import { cat } from "./commands/fs/cat.js";
import { add } from "./commands/fs/add.js";
import { rename } from "./commands/fs/rename.js";
import { copy } from "./commands/fs/copy.js";
import { move } from "./commands/fs/move.js";
import { remove } from "./commands/fs/delete.js";


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

      
        default:
          console.error("Invalid command");
      }
    } catch (err) {
      console.error(`Error executing command: ${err.message}`);
    }

    console.log(`You are currently in ${getCurrentPath()}`);
  });

  rl.on("SIGINT", () => {
    console.log(`Thank you for using File Manager, ${username}!`);
    rl.close();
  });
};

fileManager();
