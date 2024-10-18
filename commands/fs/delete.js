import fs from "fs/promises";
import { resolveAbsolutePath } from "../helper/pathChecker";

export const remove = async (input) => {
  const fileName = input.trim().split(" ")[1];
  const filePath = resolveAbsolutePath(fileName);

  try {
    await fs.access(filePath, fs.constants.F_OK);
  } catch (error) {
    throw new Error("FS operation failed");
  }

  try {
    await fs.unlink(filePath);
  } catch (error) {
    throw new Error("FS operation failed");
  }
};
