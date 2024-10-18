import { resolveAbsolutePath } from "../helper/pathChecker";

export const changeDirectory = async (command) => {
  const targetPath = command.trim().split(" ")[1];
  const absolutePath = resolveAbsolutePath(targetPath);

  try {
    process.chdir(absolutePath);
  } catch (err) {
    console.log("Invalid Path");
  }
};
