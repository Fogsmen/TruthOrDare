const API_URL = "https://intimidades.top-developer.net/api";
const defaultHeader = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const authLogin = (email, password) => {
  return fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: defaultHeader,
    body: JSON.stringify({ email, password }),
  });
};

export const authRegister = (email, name, password) => {
  return fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: defaultHeader,
    body: JSON.stringify({ email, name, password }),
  });
};

export const authMe = (token) => {
  return fetch(`${API_URL}/auth/me?token=${token}`, {
    method: "POST",
    headers: defaultHeader,
  });
};

export const getMyDares = async (token, lang) => {
  const response = await fetch(
    `${API_URL}/my-dare?token=${token}&lang=${lang.toUpperCase()}`,
    {
      method: "GET",
      headers: defaultHeader,
    }
  );
  const result = await response.json();
  if (!response.ok) {
    throw result;
  }
  return result;
};

export const createMyDare = async (token, lang, value) => {
  const response = await fetch(
    `${API_URL}/my-dare?token=${token}&lang=${lang.toUpperCase()}`,
    {
      method: "POST",
      headers: defaultHeader,
      body: JSON.stringify({ value }),
    }
  );
  const result = await response.json();
  if (!response.ok) {
    throw result;
  }
  return result;
};

export const updateMyDare = async (token, id, value) => {
  const response = await fetch(`${API_URL}/my-dare/${id}?token=${token}`, {
    method: "PUT",
    headers: defaultHeader,
    body: JSON.stringify({ value }),
  });
  const result = await response.json();
  if (!response.ok) {
    throw result;
  }
  return result;
};

export const deleteMyDare = async (token, id) => {
  const response = await fetch(`${API_URL}/my-dare/${id}?token=${token}`, {
    method: "DELETE",
    headers: defaultHeader,
  });
  const result = response.json();
  if (!response.ok) {
    throw result;
  }
  return result;
};

export const getQuestions = async (lang, type) => {
  const response = await fetch(
    `${API_URL}/game/questions?lang=${lang}&type=${type}`,
    {
      method: "GET",
      headers: defaultHeader,
    }
  );
  const result = await response.json();
  if (!response.ok) {
    throw result;
  }
  return result;
};

export const getDares = async (lang, type) => {
  const response = await fetch(
    `${API_URL}/game/dares?lang=${lang}&type=${type}`,
    {
      method: "GET",
      headers: defaultHeader,
    }
  );
  const result = await response.json();
  if (!response.ok) {
    throw result;
  }
  return result;
};
