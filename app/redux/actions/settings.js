import * as LanguageHelper from "../../helpers/LanguageHelper";
import * as StoreService from "../../services/StoreService";

export const SET_LANG = "SET_LANG";

export const setLanguage = (lang) => {
  StoreService.saveLang(lang);
  switch (lang) {
    case "spa":
      return {
        type: SET_LANG,
        lang: "spa",
        getLang: LanguageHelper.spa,
      };

    case "rus":
      return {
        type: SET_LANG,
        lang: "rus",
        getLang: LanguageHelper.rus,
      };

    default:
      return {
        type: SET_LANG,
        lang: "eng",
        getLang: LanguageHelper.eng,
      };
  }
};

export const loadLanguage = (lang) => {
  switch (lang) {
    case "spa":
      return {
        type: SET_LANG,
        lang: "spa",
        getLang: LanguageHelper.spa,
      };

    case "rus":
      return {
        type: SET_LANG,
        lang: "rus",
        getLang: LanguageHelper.rus,
      };

    default:
      return {
        type: SET_LANG,
        lang: "eng",
        getLang: LanguageHelper.eng,
      };
  }
};
