import express from "express";
import {
  getAllExtraCurriculars,
  getExtraCurricular,
  createExtraCurricular,
  updateExtraCurricular,
  deleteExtraCurricular,
} from "../controllers/extrasController.js";

const extrasRouter = express.Router();

//get all extracurricular activities
extrasRouter.get("/", getAllExtraCurriculars);

//get specific extracurricular activity
extrasRouter.get("/:id", getExtraCurricular);

//create new extracurricular activity
extrasRouter.post("/", createExtraCurricular);

//update an extracurricular activity
extrasRouter.put("/:id", updateExtraCurricular);

//delete an extracurricular activity
extrasRouter.delete("/:id", deleteExtraCurricular);

export default extrasRouter;
