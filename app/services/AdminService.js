const URL = "https://intimidades.top-developer.net/api/admin";
const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
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

export const getSofts = async (token) => {
  const response = await fetch(`${URL}/get-softs?token=${token}`, {
    method: "POST",
    headers: defaultHeaders,
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

export const updateSoft = async (token, id, type, gender, shot, value) => {
  const response = await fetch(`${URL}/update-soft?token=${token}`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({ id, type, gender, shot, value }),
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

export const getSoftById = async (token, id) => {
  const response = await fetch(`${URL}/get-soft-by-id?token=${token}&id=${id}`, {
    method: "POST",
    headers: defaultHeaders,
  });
  const result = await response.json();
  if (!response.ok) {
    throw result;
  }
  return result;
};

export const getHots = async (token) => {
  const response = await fetch(`${URL}/get-hots?token=${token}`, {
    method: "POST",
    headers: defaultHeaders,
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

export const updateHot = async (token, id, type, gender, shot, value) => {
  const response = await fetch(`${URL}/update-hot?token=${token}`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({ id, type, gender, shot, value }),
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

export const getHotById = async (token, id) => {
  const response = await fetch(`${URL}/get-hot-by-id?token=${token}&id=${id}`, {
    method: "POST",
    headers: defaultHeaders,
  });
  const result = await response.json();
  if (!response.ok) {
    throw result;
  }
  return result;
};
