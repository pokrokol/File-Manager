import fs from "fs";
import zlib from "zlib";
import { resolveAbsolutePath } from "../helper/pathChecker";
import path from "path";

export const decompress = async (input) => {
  const [, sourceFilePathArg, destinationDirArg] = input.trim().split(" ");
  const sourceFilePath = resolveAbsolutePath(sourceFilePathArg);
  const destinationFilePath = path.join(
    resolveAbsolutePath(destinationDirArg),
    path.basename(sourceFilePath, ".br")
  );

  const readStream = fs.createReadStream(sourceFilePath);
  const writeStream = fs.createWriteStream(destinationFilePath);
  const brotli = zlib.createBrotliDecompress();

  readStream.pipe(brotli).pipe(writeStream);

  writeStream.on("finish", () => {
    console.log("File has been decompressed");
  });

  writeStream.on("error", (err) => {
    console.error("An error occurred:", err);
  });
};
