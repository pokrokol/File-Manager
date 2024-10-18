import crypto from "crypto";
import fs from "fs";
import path from "path";

export const generateFileHash = async (input) => {
  let filePath = input.trim().split("hash ")[1];
  if (!path.isAbsolute(filePath)) {
    filePath = path.join(process.cwd(), filePath);
  }

  const hash = crypto.createHash("sha256");
  const readStream = fs.createReadStream(filePath);

  readStream.on("data", (data) => {
    hash.update(data);
  });

  readStream.on("end", () => {
    const result = hash.digest("hex");
    console.log(result);
  });

  readStream.on("error", (err) => {
    console.error("Error while reading file:", err);
  });
};
