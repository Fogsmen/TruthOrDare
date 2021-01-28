import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ActivityIndicator, View } from "react-native";
import MainNavigator from "./MainNavigator";
import * as StoreService from "../services/StoreService";
import * as GameAction from "../redux/actions/game";
import * as SettingAction from "../redux/actions/settings";
import * as AuthAction from "../redux/actions/auth";

const NavigationContainer = (props) => {
  const dispatch = useDispatch();
  const [loadCouple, setLoadCouple] = useState(false);
  const [loadLang, setLoadLang] = useState(false);
  const [loadCred, setLoadCred] = useState(false);

  useEffect(() => {
    StoreService.getCouple()
      .then((res) => {
        if (res) {
          const couple = JSON.parse(res);
          dispatch(GameAction.loadCoupleNames(couple[0], couple[1]));
        }
        setLoadCouple(true);
      })
      .catch(() => {
        setLoadCouple(true);
      });
    StoreService.getLang()
      .then((res) => {
        if (res) {
          dispatch(SettingAction.loadLanguage(res));
        }
        setLoadLang(true);
      })
      .catch(() => {
        setLoadLang(true);
      });
    StoreService.getEmailPassword()
      .then((res) => {
        if (res) {
          const ans = JSON.parse(res);
          dispatch(AuthAction.loadEmailPassword(ans[0], ans[1]));
        }
        setLoadCred(true);
      })
      .catch(() => {
        setLoadCred(true);
      });
  }, [dispatch]);

  if (!loadCouple || !loadLang || !loadCred) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <MainNavigator />;
};

export default NavigationContainer;
