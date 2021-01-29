import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { Video } from "expo-av";

import HeaderToggleMenuButton from "../../components/HeaderToggleMenuButton";
import HeaderLabel from "../../components/HeaderLabel";
import HeaderGoBackButton from "../../components/HeaderGoBackButton";

import * as GameHelper from "../../helpers/GameHelper";
import colors from "../../constants/colors";

const GoButton = (props) => {
  return (
    <TouchableOpacity style={styles.gobutton} onPress={props.onPress}>
      <View style={styles.gobuttoninner}>
        <Text style={styles.gobuttontext}>GO</Text>
      </View>
    </TouchableOpacity>
  );
};

const TruthDareVideo = (props) => {
  const finished = (status) => {
    if (status.didJustFinish) props.didJustFinish();
  };

  return (
    <View style={{ backgroundColor: colors.defaultBackground, padding: 35 }}>
      <Video
        source={props.path}
        style={styles.video}
        rate={1.0}
        volume={1.0}
        resizeMode="cover"
        onPlaybackStatusUpdate={finished}
        shouldPlay={props.shouldPlay}
        isLooping
      />
      {!props.shouldPlay && <GoButton onPress={props.onPress} />}
    </View>
  );
};

const truthPath = require("../../videos/truth.mp4");
const darePath = require("../../videos/dare.mp4");

const SoftHotInGameScreen = (props) => {
  const coupleNames = useSelector((state) => state.game.couple);
  const type = props.navigation.getParam("type");
  const { lang } = useSelector((state) => state.settings);
  const flag = useRef(false);

  const [currentPlayer, setCurrentPlayer] = useState(0);
  const questionsObj = useSelector((state) => {
    return type === "soft" ? state.game.coupleSoft.questions : state.game.coupleHot.questions;
  });
  const daresObj = useSelector((state) => {
    return type === "soft" ? state.game.coupleSoft.dares : state.game.coupleHot.dares;
  });
  const questions = [questionsObj[lang]["F"], questionsObj[lang]["M"]];
  const dares = [daresObj[lang]["F"], daresObj[lang]["M"]];

  const [daresIds, setDaresIds] = useState([[], []]);
  const [questionsIds, setQuestionsIds] = useState([[], []]);

  useEffect(() => {
    flag.current = false;
    setDaresIds([dares[0].map((x) => x.id), dares[1].map((x) => x.id)]);
    setQuestionsIds([questions[0].map((x) => x.id), questions[1].map((x) => x.id)]);

    return () => {
      flag.current = true;
    };
  }, [setDaresIds, setQuestionsIds]);

  const [rotateCount, setRotateCount] = useState(GameHelper.GenerateRandomInteger(3, 7));
  const makeAction = () => {
    let sentence = "",
      soft_id = -1,
      isDare = false;

    if (rotateCount % 3 > 0) {
      const i =
        questionsIds[currentPlayer % 2][GameHelper.GenerateRandomInteger(0, questionsIds[currentPlayer % 2].length)];
      let newIds = questionsIds;
      newIds[currentPlayer % 2] = questionsIds[currentPlayer % 2].filter((x) => x !== i);
      setQuestionsIds(newIds, rotateCount);
      const tmpQ = questions[currentPlayer % 2].filter((x) => x.id === i)[0];
      sentence = tmpQ.value.replace(/userName/g, coupleNames[currentPlayer % 2]);
      soft_id = tmpQ.id;
    } else {
      const i = daresIds[currentPlayer % 2][GameHelper.GenerateRandomInteger(0, daresIds[currentPlayer % 2].length)];
      let newIds = daresIds;
      newIds[currentPlayer % 2] = daresIds[currentPlayer % 2].filter((x) => x !== i);
      setDaresIds(newIds);
      const tmpD = dares[currentPlayer % 2].filter((x) => x.id === i)[0];
      sentence = tmpD.value.replace(/userName/g, coupleNames[currentPlayer]);
      soft_id = tmpD.id;
      isDare = true;
    }
    setCurrentPlayer((currentPlayer + 1) % coupleNames.length);
    setRotateCount(GameHelper.GenerateRandomInteger(3, 7));

    return { sentence, soft_id, isDare };
  };
  const goToDare = () => {
    const action = makeAction();
    props.navigation.navigate("SoftHotDare", { type: type, action: action });
  };
  const [shouldPlay, setShouldPlay] = useState(false);
  const playVideo = () => {
    setShouldPlay(true);
  };
  const finishedPlay = () => {
    setShouldPlay(false);
    goToDare();
  };

  return (
    <TruthDareVideo
      path={rotateCount % 3 > 0 ? truthPath : darePath}
      didJustFinish={finishedPlay}
      shouldPlay={shouldPlay}
      onPress={playVideo}
    />
  );
};

SoftHotInGameScreen.navigationOptions = (navData) => {
  const toggleDrawer = () => {
    navData.navigation.toggleDrawer();
  };
  const goToHome = () => {
    navData.navigation.goBack();
  };

  return {
    headerLeft: () => <HeaderToggleMenuButton toggleNavbar={toggleDrawer} />,
    headerTitle: () => <HeaderLabel label="Intimidades – The Tantra  game" />,
    headerRight: () => <HeaderGoBackButton onClick={goToHome} />,
  };
};

const styles = StyleSheet.create({
  video: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fcf",
  },
  gobutton: {
    position: "absolute",
    bottom: 100,
    width: 150,
    height: 80,
    borderRadius: 50,
    backgroundColor: "#8224F5",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  gobuttoninner: {
    width: 145,
    height: 75,
    borderRadius: 50,
    borderColor: "#ffffff",
    borderWidth: 2,
    backgroundColor: "#753BF7",
    justifyContent: "center",
    alignItems: "center",
  },
  gobuttontext: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    backgroundColor: "#7328FA",
    width: 132,
    height: 63,
    borderWidth: 3,
    borderColor: "#ffffff",
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 50,
  },
});

export default SoftHotInGameScreen;
