import lecturers from "../data/lecturers.json" assert { type: "json" };
import { v4 as uuidv4 } from "uuid";
import { updateDataFile, lecturersFilePath } from "../utilities.js";

export const findAll = () => {
  return new Promise((resolve, reject) => {
    resolve(lecturers);
  });
};

export const findById = (id) => {
  return new Promise((resolve, reject) => {
    const lecturer = lecturers.find((lecturer) => lecturer.id === id);
    if (!lecturer) {
      reject(`Lecturer with id ${id} not found`);
    } else {
      resolve(lecturer);
    }
  });
};

export const create = (lecturerSent) => {
  return new Promise(async (resolve, reject) => {
    const newLecturer = {
      id: uuidv4(),
      ...lecturerSent,
    };
    lecturers.push(newLecturer);
    await updateDataFile(lecturersFilePath, lecturers);
    resolve(newLecturer);
  });
};

export const update = (lecturerId, lecturerDataSent) => {
  return new Promise(async (resolve, reject) => {
    const lecturerIndex = lecturers.findIndex(
      (lecturer) => lecturer.id === lecturerId
    );
    if (lecturerIndex === -1) {
      reject(`Lecturer with id ${lecturerId} not Found`);
    } else {
      const updatedLecturer = {
        id: lecturerId,
        title: lecturerDataSent.title || lecturers[lecturerIndex].title,
        name: lecturerDataSent.name || lecturers[lecturerIndex].name,
        coursesTaken:
          lecturerDataSent.coursesTaken ||
          lecturers[lecturerIndex].coursesTaken ||
          [],
        levelsTaken:
          lecturerDataSent.levelsTaken ||
          lecturers[lecturerIndex].levelsTaken ||
          0,
      };
      lecturers[lecturerIndex] = updatedLecturer;
      await updateDataFile(lecturersFilePath, lecturers);
      resolve(updatedLecturer);
    }
  });
};

export const remove = (lectureId) => {
  return new Promise(async (resolve, reject) => {
    const lecturerIndex = lecturers.findIndex(
      (lecturer) => lecturer.id === lectureId
    );
    if (lecturerIndex === -1) {
      reject(`Lecturer with id ${lectureId} is not Found`);
    } else {
      lecturers.splice(lecturerIndex, 1);
      await updateDataFile(lecturersFilePath, lecturers);
      resolve(`Lecturer with id ${lectureId} successfully deleted`);
    }
  });
};
