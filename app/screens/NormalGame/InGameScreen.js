import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from "react-native";
import { useSelector } from "react-redux";
import Swiper from "react-native-deck-swiper";

import * as GameHelper from "../../helpers/GameHelper";
import colors from "../../constants/colors";
import HeaderToggleMenuButton from "../../components/HeaderToggleMenuButton";
import HeaderLabel from "../../components/HeaderLabel";
import HeaderGoBackButton from "../../components/HeaderGoBackButton";

const cardColors = [
  "#EC2379",
  "#9001F0",
  "#F5C518",
  "#F7B402",
  "#FAA699",
  "#0070FF",
];
const localColors = {
  background: "#fcf",
  truth: "#AB01FA",
  dare: "#F52FC5",
};

const PlayerCard = (props) => {
  const width = props.width ?? 150;
  const height = props.height ?? 100;
  const { card, cardIndex } = props;

  return (
    <View
      style={{
        ...styles.playerCard,
        width: width,
        height: height,
        backgroundColor: cardColors[(cardIndex ?? 0) % cardColors.length],
      }}
    >
      <Text style={styles.cardText}>{card.name}</Text>
    </View>
  );
};

const InGameScreen = (props) => {
  const players = useSelector((state) => state.game.players);
  const { lang, getLang } = useSelector((state) => state.settings);
  const { questions, dares } = useSelector((state) => {
    return {
      questions: state.game.questions[lang],
      dares: state.game.dares[lang],
    };
  });
  const goToTruth = () => {
    const question =
      questions[GameHelper.GenerateRandomInteger(0, questions.length)];
    props.navigation.navigate("TruthOrDare", {
      type: "truth",
      question: question,
    });
  };
  const goToDare = () => {
    const dare = dares[GameHelper.GenerateRandomInteger(0, dares.length)];
    props.navigation.navigate("TruthOrDare", { type: "dare", question: dare });
  };
  const goOpacity = useRef(new Animated.Value(1)).current;
  const truthDareOpacity = useRef(new Animated.Value(0)).current;
  const goButtonHide = () => {
    Animated.timing(goOpacity, {
      toValue: 0,
      duration: 700,
      useNativeDriver: true,
    }).start();
  };
  const truthDareShow = () => {
    Animated.timing(truthDareOpacity, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  };
  const swiperRef = useRef(false);
  const cardMove = () => {
    swiperRef.current.swipeRight();
  };
  const flag = useRef(false);
  const rotateCount = GameHelper.GenerateRandomInteger(2, 20);
  const timeout = 250;
  const rotateByCount = (current) => {
    if (flag.current) return;
    if (current > rotateCount) {
      goButtonHide();
      truthDareShow();
      return;
    }
    cardMove();
    setTimeout(() => {
      rotateByCount(current + 1);
    }, timeout);
  };
  const rotate = () => {
    rotateByCount(0);
  };
  useEffect(() => {
    flag.current = false;
    return () => {
      flag.current = true;
    };
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <Swiper
        ref={swiperRef}
        cards={players}
        keyExtractor={(card) => card.id}
        renderCard={(player, i) => <PlayerCard card={player} cardIndex={i} />}
        infinite={true}
        swipeAnimationDuration={timeout - 30}
        backgroundColor={"transparent"}
        cardVerticalMargin={50}
        stackSize={2}
        animateOverlayLabelsOpacity
        animateCardOpacity
        disableTopSwipe={true}
        disableBottomSwipe={true}
        disableLeftSwipe={true}
        disableRightSwipe={true}
        horizontalSwipe={false}
        verticalSwipe={false}
      />
      <Animated.View
        style={{ opacity: goOpacity, ...styles.goButtonAnimation }}
        onTouchEnd={rotate}
      >
        <TouchableOpacity styles={styles.goButton}>
          <Text style={{ fontWeight: "bold", fontSize: 20, color: "white" }}>
            {getLang("go")}
          </Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={{ opacity: truthDareOpacity, ...styles.truthDareButtons }}
      >
        <TouchableOpacity style={styles.truth} onPress={goToTruth}>
          <Text style={styles.truthText}>{getLang("truth")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dare} onPress={goToDare}>
          <Text style={styles.dareText}>{getLang("dare")}</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

InGameScreen.navigationOptions = (navData) => {
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
  screen: {
    padding: 5,
    backgroundColor: localColors.background,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  playerCard: {
    borderRadius: 12,
    shadowRadius: 25,
    shadowColor: "black",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 0 },
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  cardText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
  goButtonAnimation: {
    marginTop: 200,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F08A00",
    borderColor: "white",
    borderWidth: 1.5,
  },
  goButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  truthDareButtons: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-around",
    width: "100%",
  },
  truth: {
    backgroundColor: localColors.truth,
    borderRadius: 50,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  truthText: {
    color: colors.defaultDark,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  dare: {
    backgroundColor: localColors.dare,
    borderRadius: 50,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  dareText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default InGameScreen;
