import {
  create,
  findAll,
  findById,
  remove,
  update,
} from "../models/lecturersModel.js";

export const getLecturers = async (req, res) => {
  const lecturers = await findAll();
  res.json(lecturers);
};

export const getLecturerById = async (req, res, next) => {
  const lecturerId = req.params.id;
  try {
    const lecturer = await findById(lecturerId);
    res.json(lecturer);
  } catch (err) {
    const error = new Error(err);
    error.status = 404;
    return next(error);
  }
};

export const createLecturer = async (req, res, next) => {
  const sentData = req.body;
  if (!sentData.title || !sentData.name) {
    const error = new Error(
      "Lecturer name and title must be specified separately"
    );
    error.status = 400;
    return next(error);
  } else {
    const newLecturer = await create(sentData);
    res.json(newLecturer);
  }
};

export const updateLecturer = async (req, res, next) => {
  const id = req.params.id;
  const sentData = req.body;
  try {
    const updatedLecturer = await update(id, sentData);
    res.json(updatedLecturer);
  } catch (err) {
    const error = new Error(err);
    error.status = 404;
    return next(error);
  }
};

export const deleteLecturer = async (req, res, next) => {
  const lectureId = req.params.id;
  try {
    const deleteMessage = await remove(lectureId);
    res.send(deleteMessage);
  } catch (err) {
    const error = new Error(err);
    error.status = 404;
    return next(error);
  }
};
