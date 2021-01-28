import { AsyncStorage } from "react-native";

export const saveCouple = async (couple) => {
  return await AsyncStorage.setItem("couple", JSON.stringify(couple));
};

export const getCouple = async () => {
  return await AsyncStorage.getItem("couple");
};

export const saveLang = async (lang) => {
  return await AsyncStorage.setItem("lang", lang);
};

export const getLang = async () => {
  return await AsyncStorage.getItem("lang");
};

export const clearStorage = async () => {
  AsyncStorage.clear();
};

export const saveEmailPassword = async (email, password) => {
  await AsyncStorage.setItem("emailPassword", JSON.stringify([email, password]));
};

export const getEmailPassword = async () => {
  return await AsyncStorage.getItem("emailPassword");
};
