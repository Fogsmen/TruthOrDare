import React, { useRef, useCallback, useState, useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

import colors from "../../constants/colors";
import HeaderToggleMenuButton from "../../components/HeaderToggleMenuButton";
import HeaderLabel from "../../components/HeaderLabel";
import HeaderGoBackButton from "../../components/HeaderGoBackButton";
import * as GameHelper from "../../helpers/GameHelper";
import * as ApiService from "../../services/ApiService";

const WriteStars = ({ star, setStar }) => {
  const stars = [...Array(5).keys()];
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <View style={{ marginVertical: 2, flexDirection: "row" }}>
        {stars.map((i) => {
          return star > i ? (
            <TouchableWithoutFeedback key={i} onPress={() => setStar(i + 1)}>
              <AntDesign name="star" size={35} color="white" />
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback key={i} onPress={() => setStar(i + 1)}>
              <AntDesign name="staro" size={35} color="white" />
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </View>
  );
};

const SoftHotDareScreen = (props) => {
  const isIn = useRef();
  const { sentence, soft_id } = props.navigation.getParam("action");
  const { getLang } = useSelector((state) => state.settings);

  const [loading, setLoading] = useState(false);
  const [star, setStar] = useState(0);

  const submitRate = () => {
    setLoading(true);
    ApiService.rateCoupleSoft(soft_id, star)
      .then((res) => {
        if (isIn.current) {
          setLoading(false);
          Alert.alert("Success", "Your rate has been submitted successfully");
        }
      })
      .catch((err) => {
        if (isIn.current) {
          setLoading(false);
          Alert.alert("Error", "Connection failed", [{ text: "OK" }]);
        }
      });
  };
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

  useEffect(() => {
    isIn.current = true;
    return () => {
      isIn.current = false;
    };
  }, []);

  return (
    <View style={styles.screen}>
      <View style={{ ...styles.section, flexDirection: "row" }}>
        <TouchableOpacity onPress={startCountdown}>
          {isPlay ? (
            <MaterialCommunityIcons name="stop-circle-outline" size={30} color="white" />
          ) : (
            <MaterialCommunityIcons name="play-circle-outline" size={30} color="white" />
          )}
        </TouchableOpacity>
        <Text style={styles.timerText}>{GameHelper.SecToMinFormat(second)}</Text>
      </View>
      <View style={{ ...styles.section, paddingHorizontal: 20 }}>
        <Text style={styles.bodyText}>{sentence}</Text>
      </View>
      <View style={{ ...styles.section }}>
        <TouchableOpacity style={styles.button} onPress={goToNextDare}>
          <Text style={styles.buttonText}>{getLang("next_dare")}</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : (
        <View style={styles.ratebox}>
          <WriteStars star={star} setStar={setStar} />
          <TouchableOpacity style={styles.ratebutton} onPress={submitRate}>
            <Text style={styles.ratebuttonText}>Rate this dare</Text>
          </TouchableOpacity>
        </View>
      )}
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
  ratebutton: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8500FA",
    marginTop: 15,
  },
  ratebuttonText: {
    fontWeight: "bold",
    fontSize: 17,
    color: "white",
  },
  ratebox: {
    flex: 1,
  },
});

export default SoftHotDareScreen;
