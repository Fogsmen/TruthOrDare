import React, {
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
  useEffect,
  useCallback,
} from "react";
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import HeaderLabel from "../components/HeaderLabel";
import HeaderToggleMenuButton from "../components/HeaderToggleMenuButton";
import colors from "../constants/colors";

import * as ApiService from "../services/ApiService";
import * as GameHelper from "../helpers/GameHelper";

const DiceComp = forwardRef((props, ref) => {
  const dice = useRef();
  const width = props.width ?? 125;
  const height = props.height ?? 125;
  const { loopCount, speed, words } = props;
  const timeInterval = speed === "fast" ? 250 : 290;
  const rotate = (position = 0) => {
    dice.current.scrollTo({
      x: width * (position % words.length),
      animated: true,
    });
  };
  const rotateByCount = (current) => {
    if (current > loopCount) return;
    rotate(current);
    setTimeout(() => {
      rotateByCount(current + 1);
    }, timeInterval);
  };
  useImperativeHandle(ref, () => ({
    loop() {
      rotateByCount(0);
    },
  }));

  return (
    <View style={{ height: height }}>
      <ScrollView
        ref={dice}
        horizontal={true}
        decelerationRate={speed === "fast" ? "fast" : "normal"}
        centerContent={true}
        pagingEnabled={true}
        scrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{ width: width, backgroundColor: colors.defaultBackground }}
        scrollEnabled={false}
      >
        {words.map((word, index) => (
          <View
            key={index}
            style={{ height: height, width: width, ...styles.diceSquare }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
              }}
            >
              {word}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
});

const DiceGameScreen = (props) => {
  const isIn = useRef();
  const { lang, getLang } = useSelector((state) => state.settings);
  const [loading, setLoading] = useState(false);
  const [place, setPlace] = useState([]);
  const [action, setAction] = useState([]);
  const [firstLoop, setFirstloop] = useState(
    GameHelper.GenerateRandomInteger(10, 30)
  );
  const [secondLoop, setSecondLoop] = useState(
    GameHelper.GenerateRandomInteger(10, 30)
  );
  const firstDice = useRef();
  const secondDice = useRef();

  const getDices = useCallback(async () => {
    try {
      return await ApiService.getDices(lang.toUpperCase());
    } catch (err) {
      throw new Error("Connection failed");
    }
  }, [lang]);
  const loadDices = useCallback(() => {
    setLoading(true);
    getDices()
      .then((res) => {
        if (isIn.current) {
          setLoading(false);
          setPlace(res.place);
          setAction(res.action);
        }
      })
      .catch((err) => {
        if (isIn.current) {
          setLoading(false);
          Alert.alert("Error", err.message, [{ text: "OK" }]);
        }
      });
  }, [setLoading, setPlace, setAction, lang, getDices]);

  useEffect(() => {
    loadDices();
  }, [loadDices, lang]);

  useEffect(() => {
    isIn.current = true;

    return () => {
      isIn.current = false;
    };
  }, []);

  const runDice = () => {
    firstDice.current.loop();
    secondDice.current.loop();
    setFirstloop(GameHelper.GenerateRandomInteger(10, 30));
    setSecondLoop(GameHelper.GenerateRandomInteger(10, 30));
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#192a56" />
      </View>
    );
  }
  return (
    <ImageBackground
      style={styles.image}
      resizeMode="stretch"
      source={require("../images/home-background.png")}
    >
      <View style={styles.screen}>
        <View style={{ margin: 20 }}>
          <DiceComp
            words={place}
            speed="fast"
            loopCount={firstLoop}
            ref={firstDice}
          />
        </View>
        <View style={{ margin: 20 }}>
          <DiceComp
            words={action}
            speed="normal"
            loopCount={secondLoop}
            ref={secondDice}
          />
        </View>
        <TouchableOpacity style={styles.gobutton} onPress={runDice}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 25 }}>
            {getLang("go")}
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

DiceGameScreen.navigationOptions = (navData) => {
  const toggleDrawer = () => {
    navData.navigation.toggleDrawer();
  };

  return {
    headerLeft: () => <HeaderToggleMenuButton toggleNavbar={toggleDrawer} />,
    headerTitle: () => <HeaderLabel label="Intimidades – The Tantra  game" />,
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    resizeMode: "cover",
    justifyContent: "center",
  },
  screen: {
    padding: 5,
    justifyContent: "center",
    height: "100%",
    alignItems: "center",
  },
  diceSquare: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.redPrimary,
    borderColor: colors.defaultBackground,
    borderRadius: 10,
    borderWidth: 5,
  },
  gobutton: {
    backgroundColor: "#5e0acd",
    borderRadius: 60,
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1,
  },
});

export default DiceGameScreen;
