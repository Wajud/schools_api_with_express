import {
  create,
  find,
  findAll,
  update,
  remove,
} from "../models/coursesModels.js";

//get all courses

export const getCourses = async (req, res) => {
  const courses = await findAll();
  res.json(courses);
};

//get specific course
export const getCourse = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const course = await find(courseId);
    res.json(course);
  } catch (error) {
    const err = new Error(error);
    err.status = 404;
    return next(err);
  }
};

//create course Controller

export const createCourse = async (req, res, next) => {
  const courseSent = req.body;

  if (
    !courseSent.courseCode ||
    !courseSent.courseTitle ||
    !courseSent.lecturer ||
    !courseSent.numberOfStudents
  ) {
    const error = new Error(
      "Course must have courseCode, courseTitle, lecturer and numberOfStudents field"
    );
    error.status = 400;
    return next(error);
  }
  const newCourse = await create({
    courseCode: courseSent.courseCode,
    courseTitle: courseSent.courseTitle,
    lecturer: courseSent.lecturer,
    numberOfStudents: courseSent.numberOfStudents,
    compulsory: courseSent.compulsory || false,
  });

  res.json(newCourse);
};

//Update course handler

export const updateCourse = async (req, res, next) => {
  const courseId = req.params.id;
  const sentData = req.body;
  try {
    const updatedCourse = await update(courseId, sentData);
    res.json(updatedCourse);
  } catch (error) {
    const err = new Error(error);
    err.status = 404;
    next(err);
  }
};

//delete course handler

export const deleteCourse = async (req, res, next) => {
  const courseId = req.params.id;
  try {
    const message = await remove(courseId);
    res.send(message);
  } catch (error) {
    const err = new Error(error);
    err.status = 404;
    next(err);
  }
};
