import { rus } from "../helpers/LanguageHelper";

const URL = "https://intimidades.top-developer.net/api/admin";
const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const getNormalQuestions = async (token, type) => {
  const response = await fetch(`${URL}/get-questions?token=${token}&type=${type}`, {
    method: "POST",
    headers: defaultHeaders,
  });
  const result = await response.json();
  if (!response.ok) {
    throw result;
  }
  return result;
};

export const createNormalQuestion = async (token, lang, type, shot, value) => {
  const response = await fetch(`${URL}/create-question?token=${token}`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({ lang, type, shot, value }),
  });
  const result = await response.json();
  if (!response.ok) {
    throw result;
  }
  return result;
};

export const updateNormalQuestion = async (token, id, shot, value) => {
  const response = await fetch(`${URL}/update-question?token=${token}`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({ id, shot, value }),
  });
  const result = await response.json();
  if (!response.ok) {
    throw result;
  }
  return result;
};

export const deleteNormalQuestion = async (token, id) => {
  const response = await fetch(`${URL}/delete-question?token=${token}&id=${id}`, {
    method: "POST",
    headers: defaultHeaders,
  });
  const result = await response.json();
  if (!response.ok) {
    throw result;
  }
  return result;
};

export const getNormalDares = async (token, type) => {
  const response = await fetch(`${URL}/get-dares?token=${token}&type=${type}`, {
    method: "POST",
    headers: defaultHeaders,
  });
  const result = await response.json();
  if (!response.ok) {
    throw result;
  }
  return result;
};

export const createNormalDare = async (token, lang, type, shot, value) => {
  const response = await fetch(`${URL}/create-dare?token=${token}`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({
      lang,
      type,
      shot,
      value,
    }),
  });
  const result = await response.json();
  if (!response.ok) {
    throw result;
  }
  return result;
};

export const updateNormalDare = async (token, id, shot, value) => {
  const response = await fetch(`${URL}/update-dare?token=${token}`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({ id, shot, value }),
  });
  const result = await response.json();
  if (!response.ok) {
    throw result;
  }
  return result;
};

export const deleteNormalDare = async (token, id) => {
  const response = await fetch(`${URL}/delete-dare?token=${token}&id=${id}`, {
    method: "POST",
    headers: defaultHeaders,
  });
  const result = await response.json();
  if (!response.ok) {
    throw result;
  }
  return result;
};

export const getDice = async (token, lang) => {
  const response = await fetch(`${URL}/get-dice?token=${token}&lang=${lang}`, {
    method: "POST",
    headers: defaultHeaders,
  });
  const result = await response.json();
  if (!response.ok) {
    throw result;
  }
  return result;
};

export const updateDice = async (token, lang, place, action) => {
  const response = await fetch(`${URL}/replace-dice?token=${token}&lang=${lang}`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({
      place,
      action,
    }),
  });
  const result = await response.json();
  if (!response.ok) {
    throw result;
  }
  return result;
};

export const getSofts = async (token, type, gender) => {
  const response = await fetch(`${URL}/get-softs?token=${token}`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({ type, gender }),
  });
  const result = await response.json();
  if (!response.ok) {
    throw result;
  }
  return result;
};

export const createSoft = async (token, lang, type, shot, value, gender) => {
  const response = await fetch(`${URL}/create-soft?token=${token}`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({ lang, type, shot, value, gender }),
  });
  const result = await response.json();
  if (!response.ok) {
    throw result;
  }
  return result;
};

export const updateSoft = async (token, id, shot, value) => {
  const response = await fetch(`${URL}/update-soft?token=${token}`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({ id, shot, value }),
  });
  const result = await response.json();
  if (!response.ok) {
    throw result;
  }
  return result;
};

export const deleteSoft = async (token, id) => {
  const response = await fetch(`${URL}/delete-soft?token=${token}&id=${id}`, {
    method: "POST",
    headers: defaultHeaders,
  });
  const result = await response.json();
  if (!response.ok) {
    throw result;
  }
  return result;
};

export const getHots = async (token, type, gender) => {
  const response = await fetch(`${URL}/get-hots?token=${token}`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({ type, gender }),
  });
  const result = await response.json();
  if (!response.ok) {
    throw result;
  }
  return result;
};

export const createHot = async (token, lang, type, shot, value, gender) => {
  const response = await fetch(`${URL}/create-hot?token=${token}`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({ lang, type, shot, value, gender }),
  });
  const result = await response.json();
  if (!response.ok) {
    throw result;
  }
  return result;
};

export const updateHot = async (token, id, shot, value) => {
  const response = await fetch(`${URL}/update-hot?token=${token}`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({ id, shot, value }),
  });
  const result = await response.json();
  if (!response.ok) {
    throw result;
  }
  return result;
};

export const deleteHot = async (token, id) => {
  const response = await fetch(`${URL}/delete-hot?token=${token}&id=${id}`, {
    method: "POST",
    headers: defaultHeaders,
  });
  const result = await response.json();
  if (!response.ok) {
    throw result;
  }
  return result;
};

export const crudNormalMultiQuestion = {
  create: (token, lang, shot, value) => createNormalQuestion(token, lang, "MUL", shot, value),
  read: (token) => getNormalQuestions(token, "MUL"),
  update: (token, id, shot, value) => updateNormalQuestion(token, id, shot, value),
  remove: (token, id) => deleteNormalQuestion(token, id),
};

export const crudNormalMMQuestion = {
  create: (token, lang, shot, value) => createNormalQuestion(token, lang, "MM", shot, value),
  read: (token) => getNormalQuestions(token, "MM"),
  update: (token, id, shot, value) => updateNormalQuestion(token, id, shot, value),
  remove: (token, id) => deleteNormalQuestion(token, id),
};

export const crudNormalMFQuestion = {
  create: (token, lang, shot, value) => createNormalQuestion(token, lang, "MF", shot, value),
  read: (token) => getNormalQuestions(token, "MF"),
  update: (token, id, shot, value) => updateNormalQuestion(token, id, shot, value),
  remove: (token, id) => deleteNormalQuestion(token, id),
};

export const crudNormalFFQuestion = {
  create: (token, lang, shot, value) => createNormalQuestion(token, lang, "FF", shot, value),
  read: (token) => getNormalQuestions(token, "FF"),
  update: (token, id, shot, value) => updateNormalQuestion(token, id, shot, value),
  remove: (token, id) => deleteNormalQuestion(token, id),
};

export const crudNormalMultiDare = {
  create: (token, lang, shot, value) => createNormalDare(token, lang, "MUL", shot, value),
  read: (token) => getNormalDares(token, "MUL"),
  update: (token, id, shot, value) => updateNormalDare(token, id, shot, value),
  remove: (token, id) => deleteNormalDare(token, id),
};

export const crudNormalMMDare = {
  create: (token, lang, shot, value) => createNormalDare(token, lang, "MM", shot, value),
  read: (token) => getNormalDares(token, "MM"),
  update: (token, id, shot, value) => updateNormalDare(token, id, shot, value),
  remove: (token, id) => deleteNormalDare(token, id),
};

export const crudNormalMFDare = {
  create: (token, lang, shot, value) => createNormalDare(token, lang, "MF", shot, value),
  read: (token) => getNormalDares(token, "MF"),
  update: (token, id, shot, value) => updateNormalDare(token, id, shot, value),
  remove: (token, id) => deleteNormalDare(token, id),
};

export const crudNormalFFDare = {
  create: (token, lang, shot, value) => createNormalDare(token, lang, "FF", shot, value),
  read: (token) => getNormalDares(token, "FF"),
  update: (token, id, shot, value) => updateNormalDare(token, id, shot, value),
  remove: (token, id) => deleteNormalDare(token, id),
};

export const crudCoupleSoftFemaleQuestion = {
  create: (token, lang, shot, value) => createSoft(token, lang, "Q", shot, value, "F"),
  read: (token) => getSofts(token, "Q", "F"),
  update: (token, id, shot, value) => updateSoft(token, id, shot, value),
  remove: (token, id) => deleteSoft(token, id),
};

export const crudCoupleSoftMaleQuestion = {
  create: (token, lang, shot, value) => createSoft(token, lang, "Q", shot, value, "M"),
  read: (token) => getSofts(token, "Q", "M"),
  update: (token, id, shot, value) => updateSoft(token, id, shot, value),
  remove: (token, id) => deleteSoft(token, id),
};

export const crudCoupleSoftFemaleDare = {
  create: (token, lang, shot, value) => createSoft(token, lang, "D", shot, value, "F"),
  read: (token) => getSofts(token, "D", "F"),
  update: (token, id, shot, value) => updateSoft(token, id, shot, value),
  remove: (token, id) => deleteSoft(token, id),
};

export const crudCoupleSoftMaleDare = {
  create: (token, lang, shot, value) => createSoft(token, lang, "D", shot, value, "M"),
  read: (token) => getSofts(token, "D", "M"),
  update: (token, id, shot, value) => updateSoft(token, id, shot, value),
  remove: (token, id) => deleteSoft(token, id),
};

export const crudCoupleHotFemaleQuestion = {
  create: (token, lang, shot, value) => createHot(token, lang, "Q", shot, value, "F"),
  read: (token) => getHots(token, "Q", "F"),
  update: (token, id, shot, value) => updateHot(token, id, shot, value),
  remove: (token, id) => deleteHot(token, id),
};

export const crudCoupleHotMaleQuestion = {
  create: (token, lang, shot, value) => createHot(token, lang, "Q", shot, value, "M"),
  read: (token) => getHots(token, "Q", "M"),
  update: (token, id, shot, value) => updateHot(token, id, shot, value),
  remove: (token, id) => deleteHot(token, id),
};

export const crudCoupleHotFemaleDare = {
  create: (token, lang, shot, value) => createHot(token, lang, "D", shot, value, "F"),
  read: (token) => getHots(token, "D", "F"),
  update: (token, id, shot, value) => updateHot(token, id, shot, value),
  remove: (token, id) => deleteHot(token, id),
};

export const crudCoupleHotMaleDare = {
  create: (token, lang, shot, value) => createHot(token, lang, "D", shot, value, "M"),
  read: (token) => getHots(token, "D", "M"),
  update: (token, id, shot, value) => updateHot(token, id, shot, value),
  remove: (token, id) => deleteHot(token, id),
};
