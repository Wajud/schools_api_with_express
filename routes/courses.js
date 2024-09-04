import express from "express";
import courses from "../data/courses.json" assert { type: "json" };
import { v4 as uuidv4 } from "uuid";
import { updateCouresFile } from "../utilities.js";

export const coursesRouter = express.Router();

const findCourseByIdHandler = (req, res, next) => {
  const courseId = req.params.id;
  const course = courses.find((course) => course.id === courseId);
  if (!course) {
    const error = new Error(`Course with id ${courseId} not found`);
    error.status = 404;
    return next(error);
  }
  return { courseId, course };
};

//Get all courses
coursesRouter.get("/", (req, res) => {
  res.json(courses);
});

//get specific course
coursesRouter.get("/:id", (req, res, next) => {
  const { course } = findCourseByIdHandler(req, res, next);
  res.json(course);
});

//create new course
coursesRouter.post("/", async (req, res, next) => {
  const courseSent = req.body;
  // console.log(courseSent);
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
  const newCourse = {
    id: uuidv4(),
    courseCode: courseSent.courseCode,
    courseTitle: courseSent.courseTitle,
    lecturer: courseSent.lecturer,
    numberOfStudents: courseSent.numberOfStudents,
    compulsory: courseSent.compulsory || false,
  };

  courses.push(newCourse);
  console.log(courses);
  await updateCouresFile(courses);
  res.json(newCourse);
});

//update a course
coursesRouter.put("/:id", async (req, res, next) => {
  const { courseId, course } = findCourseByIdHandler(req, res, next);
  const courseIndex = courses.findIndex((course) => course.id === courseId);
  const sentData = req.body;
  const updatedCourse = {
    id: courseId,
    courseCode: sentData.courseCode || course.courseCode,
    courseTitle: sentData.courseTitle || course.courseTitle,
    lecturer: sentData.lecturer || course.lecturer,
    numberOfStudents: sentData.numberOfStudents || course.numberOfStudents,
    compulsory: sentData.compulsory || course.compulsory,
  };
  courses[courseIndex] = updatedCourse;
  await updateCouresFile(courses);
  res.json(updatedCourse);
});

//delete a course
coursesRouter.delete("/:id", async (req, res, next) => {
  const { courseId } = findCourseByIdHandler(req, res, next);
  const courseIndex = courses.findIndex((course) => course.id === courseId);
  courses.splice(courseIndex, 1);
  await updateCouresFile(courses);
  res.send("Course successfully deleted");
});
