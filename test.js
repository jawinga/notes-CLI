import fs from "node:fs/promises";

const readFile = async () => {
  const fileContent = await fs.readFile("./note.txt", "utf-8");
  console.log(fileContent);
};

readFile();
