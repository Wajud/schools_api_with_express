import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const coursesFilePath = path.join(__dirname, "data", "courses.json");

export const updateCouresFile = (courses) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(coursesFilePath, JSON.stringify(courses), (err) => {
      if (err) {
        reject("Failed to write to file");
      }
      resolve("file successfully written to");
    });
  });
};
