import fs from "fs";
import zlib from "zlib";
import { resolveAbsolutePath } from "../helper/pathChecker";
import path from "path";

export const compress = async (input) => {
  const [, filePathArg, newFilePathArg] = input.trim().split(" ");
  const sourceFilePath = resolveAbsolutePath(filePathArg);
  const destinationFilePath = path.join(
    resolveAbsolutePath(newFilePathArg),
    `${path.basename(sourceFilePath)}.br`
  );

  const readStream = fs.createReadStream(sourceFilePath);
  const writeStream = fs.createWriteStream(destinationFilePath);
  const brotli = zlib.createBrotliCompress();

  readStream.pipe(brotli).pipe(writeStream);

  writeStream.on("finish", () => {
    console.log("File has been compressed");
  });

  writeStream.on("error", (err) => {
    console.error("An error occurred:", err);
  });
};
