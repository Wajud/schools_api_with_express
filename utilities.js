import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const coursesFilePath = path.join(__dirname, "data", "courses.json");
export const lecturersFilePath = path.join(__dirname, "data", "lecturers.json");
export const extrasFilePath = path.join(
  __dirname,
  "data",
  "extracurriculars.json"
);

export const updateDataFile = (path, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, JSON.stringify(data), (err) => {
      if (err) {
        reject("Failed to write to file");
      }
      resolve("file successfully written to");
    });
  });
};
