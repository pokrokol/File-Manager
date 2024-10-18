import fs from "fs/promises";
import { resolveAbsolutePath } from "../helper/pathChecker.js";

export const rename = async (input) => {
  const [, sourceFileName, destinationFileName] = input.trim().split(" ");
  const sourceFilePath = resolveAbsolutePath(sourceFileName);
  const destinationFilePath = resolveAbsolutePath(destinationFileName);

  try {
    await fs.access(sourceFilePath, fs.constants.F_OK);
  } catch (error) {
    throw new Error("Source file access failed");
  }

  try {
    await fs.access(destinationFilePath, fs.constants.F_OK);
    throw new Error("Destination file already exists");
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }

  try {
    await fs.rename(sourceFilePath, destinationFilePath);
  } catch (error) {
    throw new Error("Rename operation failed");
  }
};
