import fs from "fs";
import path from "path";
import { resolveAbsolutePath } from "../helper/pathChecker";

export const move = (input) => {
  const sourceFileName = input.trim().split(" ")[1];
  const destinationDir = input.trim().split(" ")[2];
  const sourceFilePath = resolveAbsolutePath(sourceFileName);
  const destinationFilePath = path.join(
    resolveAbsolutePath(destinationDir),
    path.basename(sourceFilePath)
  );

  const readStream = fs.createReadStream(sourceFilePath);
  const writeStream = fs.createWriteStream(destinationFilePath);

  readStream.on("error", (err) => {
    console.error(`Error while reading file: ${err.message}`);
  });

  writeStream.on("error", (err) => {
    console.error(`Error while writing file: ${err.message}`);
  });

  writeStream.on("finish", () => {
    fs.unlink(sourceFilePath, (err) => {
      if (err) console.error(`Error while deleting file: ${err.message}`);
    });
  });

  readStream.pipe(writeStream);
};
