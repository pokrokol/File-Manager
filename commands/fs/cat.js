import fs from "fs";
import path from "path";

export const cat = async (command) => {
  let fileName = command.trim().split(" ")[1];
  if (!path.isAbsolute(fileName)) {
    fileName = path.join(process.cwd(), fileName);
  }

  const readStream = fs.createReadStream(fileName);
  readStream.on("data", (chunk) => {
    console.log(chunk.toString());
  });

  readStream.on("error", (err) => {
    console.error("An error has occurred:", err);
  });
};
