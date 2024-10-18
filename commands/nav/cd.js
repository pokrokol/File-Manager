import { resolveAbsolutePath } from "../helper/pathChecker.js";
export const cd = async (command) => {
  const targetPath = command.trim().split(" ")[1];
  const absolutePath = resolveAbsolutePath(targetPath);

  try {
    process.chdir(absolutePath);
  } catch (err) {
    console.log("Invalid Path");
  }
};
