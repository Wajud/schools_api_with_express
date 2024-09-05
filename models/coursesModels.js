import courses from "../data/courses.json" assert { type: "json" };
import { v4 as uuidv4 } from "uuid";
import { updateCouresFile } from "../utilities.js";

export const findAll = () => {
  return new Promise((resolve, reject) => {
    resolve(courses);
  });
};

export const find = (id) => {
  return new Promise((resolve, reject) => {
    const course = courses.find((course) => course.id === id);
    if (!course) {
      reject(`Course with id ${id} not Found`);
    } else {
      resolve(course);
    }
  });
};

export const create = (course) => {
  return new Promise(async (resolve, reject) => {
    const newCourse = { id: uuidv4(), ...course };
    courses.push(newCourse);
    await updateCouresFile(courses);
    resolve(newCourse);
  });
};

export const update = (courseId, sentData) => {
  return new Promise(async (resolve, reject) => {
    const courseIndex = courses.findIndex((course) => course.id === courseId);

    if (courseIndex !== -1) {
      const updatedCourse = {
        id: courseId,
        courseCode: sentData.courseCode || courses[courseIndex].courseCode,
        courseTitle: sentData.courseTitle || courses[courseIndex].courseTitle,
        lecturer: sentData.lecturer || courses[courseIndex].lecturer,
        numberOfStudents:
          sentData.numberOfStudents || courses[courseIndex].numberOfStudents,
        compulsory: sentData.compulsory || courses[courseIndex].compulsory,
      };
      courses[courseIndex] = updatedCourse;
      await updateCouresFile(courses);
      resolve(updatedCourse);
    } else {
      reject(`Course with id ${courseId} not found`);
    }
  });
};

export const remove = (courseId) => {
  return new Promise(async (resolve, reject) => {
    const courseIndex = courses.findIndex((course) => course.id === courseId);
    if (courseIndex !== -1) {
      courses.splice(courseIndex, 1);
      await updateCouresFile(courses);
      resolve(`Course with id ${courseId} successfully deleted`);
    } else {
      reject(`Course with id ${courseId} not found`);
    }
  });
};
