import express from "express";

import {
  createLecturer,
  deleteLecturer,
  getLecturerById,
  getLecturers,
  updateLecturer,
} from "../controllers/lecturersControllers.js";

const lecturersRouter = express.Router();

//get all lecturers
lecturersRouter.get("/", getLecturers);

//get specific lecturer
lecturersRouter.get("/:id", getLecturerById);

//create lecturer
lecturersRouter.post("/", createLecturer);

//update a lecturer
lecturersRouter.put("/:id", updateLecturer);

//delete a lecturer
lecturersRouter.delete("/:id", deleteLecturer);

export default lecturersRouter;
