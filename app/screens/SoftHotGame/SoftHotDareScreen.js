import React, { useRef, useCallback, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../../constants/colors";
import HeaderToggleMenuButton from "../../components/HeaderToggleMenuButton";
import HeaderLabel from "../../components/HeaderLabel";
import HeaderGoBackButton from "../../components/HeaderGoBackButton";
import * as GameHelper from "../../helpers/GameHelper";

const SoftHotDareScreen = (props) => {
  const action = props.navigation.getParam("action");
  const { lang, getLang } = useSelector((state) => state.settings);

  const goToNextDare = () => {
    props.navigation.goBack();
  };

  const initialSec = 60;
  const [second, setSecond] = useState(initialSec);
  const [isPlay, setIsPlay] = useState(false);
  const currentPlay = useRef(false);

  const countdownSec = useCallback(
    (current) => {
      if (!currentPlay.current) return;
      if (current <= 0) {
        setSecond(initialSec);
        currentPlay.current = false;
        setIsPlay(false);
        return;
      }
      setSecond(current);
      setTimeout(() => {
        countdownSec(current - 1);
      }, 1000);
    },
    [isPlay, second]
  );
  const startCountdown = () => {
    if (currentPlay.current) {
      currentPlay.current = false;
      setIsPlay(false);
    } else {
      currentPlay.current = true;
      setIsPlay(true);
      countdownSec(second);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={{ ...styles.section, flexDirection: "row" }}>
        <TouchableOpacity onPress={startCountdown}>
          {isPlay ? (
            <MaterialCommunityIcons
              name="stop-circle-outline"
              size={30}
              color="white"
            />
          ) : (
            <MaterialCommunityIcons
              name="play-circle-outline"
              size={30}
              color="white"
            />
          )}
        </TouchableOpacity>
        <Text style={styles.timerText}>
          {GameHelper.SecToMinFormat(second)}
        </Text>
      </View>
      <View style={{ ...styles.section, paddingHorizontal: 20 }}>
        <Text style={styles.bodyText}>{action}</Text>
      </View>
      <View style={{ ...styles.section }}>
        <TouchableOpacity style={styles.button} onPress={goToNextDare}>
          <Text style={styles.buttonText}>{getLang("next_dare")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

SoftHotDareScreen.navigationOptions = (navData) => {
  const toggleDrawer = () => {
    navData.navigation.toggleDrawer();
  };
  const goToHome = () => {
    navData.navigation.popToTop();
  };

  return {
    headerLeft: () => <HeaderToggleMenuButton toggleNavbar={toggleDrawer} />,
    headerTitle: () => <HeaderLabel label="Intimidades – The Tantra  game" />,
    headerRight: () => <HeaderGoBackButton onClick={goToHome} />,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 5,
    backgroundColor: colors.defaultBackground,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  timerText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 24,
    marginLeft: 10,
  },
  bodyText: {
    fontWeight: "800",
    color: "white",
    fontSize: 15,
  },
  button: {
    borderRadius: 5,
    paddingHorizontal: 50,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8500FA",
  },
  buttonText: {
    fontWeight: "800",
    fontSize: 25,
    color: "white",
  },
});

export default SoftHotDareScreen;
