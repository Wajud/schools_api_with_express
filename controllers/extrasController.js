import {
  findAll,
  find,
  create,
  update,
  remove,
} from "../models/extrasModels.js";

export const getAllExtraCurriculars = async (req, res) => {
  const extraCurriculars = await findAll();
  res.json(extraCurriculars);
};

export const getExtraCurricular = async (req, res, next) => {
  const extrasId = req.params.id;
  try {
    const activity = await find(extrasId);
    res.json(activity);
  } catch (err) {
    const error = new Error(err);
    error.status = 404;
    return next(error);
  }
};

export const createExtraCurricular = async (req, res, next) => {
  const sentData = req.body;
  if (!sentData.title || !sentData.scope) {
    const error = new Error(
      "Extracurricular activities must have title and scope"
    );
    error.status = 400;
    return next(error);
  } else {
    const newActivity = await create(sentData);
    res.json(newActivity);
  }
};

export const updateExtraCurricular = async (req, res, next) => {
  const extrasId = req.params.id;
  const sentData = req.body;
  try {
    const updatedActivity = await update(extrasId, sentData);
    res.json(updatedActivity);
  } catch (err) {
    const error = new Error(err);
    error.status = 404;
    return next(error);
  }
};

export const deleteExtraCurricular = async (req, res, next) => {
  const extrasId = req.params.id;
  try {
    const deleteMessage = await remove(extrasId);
    res.send(deleteMessage);
  } catch (err) {
    const error = new Error(err);
    error.status = 404;
    return next(error);
  }
};
