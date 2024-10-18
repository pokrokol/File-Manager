import fs from "fs/promises";
import { resolveAbsolutePath } from "../helper/pathChecker.js";

export const add = async (input) => {
  const trimmedInput = input.trim().split(" ")[1];
  const absoluteFilePath = resolveAbsolutePath(trimmedInput);

  try {
    await fs.access(absoluteFilePath, fs.constants.F_OK);
    console.log("File already exists");
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.writeFile(absoluteFilePath, "I am fresh and young");
      console.log("File created");
    } else {
      throw error;
    }
  }
};
