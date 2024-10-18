import process from "process";
import path from "path";

export const moveUpDirectory = async () => {
  try {
    const rootDir = path.parse(process.cwd()).root;
    const currentDir = process.cwd();

    if (currentDir === rootDir) {
      console.log("You cannot do this");
    } else {
      process.chdir("..");
    }
  } catch (err) {
    console.error("Operation failed:", err);
  }
};
