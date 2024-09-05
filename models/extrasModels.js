import extraCurriculars from "../data/extracurriculars.json" assert { type: "json" };
import { v4 as uuidv4 } from "uuid";
import { updateDataFile, extrasFilePath } from "../utilities.js";

export const findAll = () => {
  return new Promise((resolve, reject) => {
    resolve(extraCurriculars);
  });
};

export const find = (extrasId) => {
  return new Promise((resolve, reject) => {
    const activity = extraCurriculars.find(
      (activity) => activity.id === extrasId
    );
    if (!activity) {
      reject(`Extracurricular activity with the id ${extrasId} not Found`);
    } else {
      resolve(activity);
    }
  });
};

export const create = async (sentActivity) => {
  return new Promise(async (resolve, reject) => {
    const newActivity = {
      id: uuidv4(),
      title: sentActivity.title,
      scope: sentActivity.scope,
      members: sentActivity.members || 0,
      isCompulsory: sentActivity.isCompulsory || false,
    };
    extraCurriculars.push(newActivity);
    await updateDataFile(extrasFilePath, extraCurriculars);
    resolve(newActivity);
  });
};

export const update = async (id, sentData) => {
  return new Promise(async (resolve, reject) => {
    const extrasIndex = extraCurriculars.findIndex(
      (activity) => activity.id === id
    );
    if (extrasIndex === -1) {
      reject(`Extracurricular activity with the id ${id} not Found`);
    } else {
      const updatedActivity = {
        id,
        title: sentData.title || extraCurriculars[extrasIndex].title,
        scope: sentData.scope || extraCurriculars[extrasIndex].scope,
        members: sentData.members || extraCurriculars[extrasIndex].members,
        isCompulsory:
          sentData.isCompulsory || extraCurriculars[extrasIndex].isCompulsory,
      };
      extraCurriculars[extrasIndex] = updatedActivity;
      await updateDataFile(extrasFilePath, extraCurriculars);
      resolve(updatedActivity);
    }
  });
};

export const remove = (id) => {
  return new Promise(async (resolve, reject) => {
    const extrasIndex = extraCurriculars.findIndex(
      (activity) => activity.id === id
    );
    if (extrasIndex === -1) {
      reject(`Extracurricular activity with the id ${id} not Found`);
    } else {
      extraCurriculars.splice(extrasIndex, 1);
      await updateDataFile(extrasFilePath, extraCurriculars);
      resolve(`Activity with id ${id} has been deleted successfully`);
    }
  });
};
