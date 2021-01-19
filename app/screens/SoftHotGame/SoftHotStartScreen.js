import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import * as GameAction from "../../redux/actions/game";
import colors from "../../constants/colors";
import HeaderLabel from "../../components/HeaderLabel";
import HeaderToggleMenuButton from "../../components/HeaderToggleMenuButton";

const PaynowComponent = () => {
  const paynow = () => {
    Alert.alert("Error", "This app is not allowed to pay yet.", [
      { text: "OK" },
    ]);
  };

  return (
    <ImageBackground
      style={styles.image}
      resizeMode="stretch"
      source={require("../../images/home-background.png")}
    >
      <Text
        style={{
          fontSize: 20,
          textAlign: "center",
          backgroundColor: "#eb2f06",
          color: "white",
          padding: 20,
          margin: 30,
          borderRadius: 20,
        }}
      >
        You should pay $20 to active this feature.
      </Text>
      <TouchableOpacity style={{ alignItems: "center" }} onPress={paynow}>
        <Text
          style={{
            backgroundColor: "#5f27cd",
            textAlign: "center",
            fontSize: 28,
            color: "white",
            fontWeight: "bold",
            width: 250,
            paddingVertical: 10,
            borderRadius: 5,
          }}
        >
          Pay Now
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const NameBoxRow = (props) => {
  const gender = props.gender;
  const lang = useSelector((state) => state.settings.getLang);
  return (
    <View style={styles.nameBox}>
      <Text style={{ color: "white" }}>
        {gender === "male" ? lang("mans_name") : lang("womans_name")}
      </Text>
      <View style={styles.nameBoxInputRow}>
        <View style={styles.nameBoxformIcon}>
          <MaterialCommunityIcons
            name={`gender-${gender}`}
            size={24}
            color="white"
          />
        </View>
        <TextInput
          placeholder={
            gender === "male" ? lang("mans_name") : lang("womans_name")
          }
          style={{ color: "white", width: "75%", paddingHorizontal: 10 }}
          value={props.value}
          onChangeText={props.onChange}
        />
      </View>
    </View>
  );
};

const NameBox = (props) => {
  const { male, maleChange, female, femaleChange } = props;
  return (
    <View style={{ padding: 1 }}>
      <NameBoxRow gender="female" value={female} onChange={femaleChange} />
      <NameBoxRow gender="male" value={male} onChange={maleChange} />
    </View>
  );
};

const SoftHotStartScreen = (props) => {
  const couple = useSelector((state) => state.game.couple);
  const lang = useSelector((state) => state.settings.getLang);
  const dispatch = useDispatch();
  const type = props.navigation.getParam("type");
  const [maleName, setMaleName] = useState(couple.length > 0 ? couple[0] : "");
  const [femaleName, setFemaleName] = useState(
    couple.length > 1 ? couple[1] : ""
  );
  const [loading, setLoading] = useState(false);
  const maleNameInputHandle = (txt) => {
    setMaleName(txt);
  };
  const femaleNameInputHandle = (txt) => {
    setFemaleName(txt);
  };
  const goToGame = () => {
    if (maleName.trim().length === 0 || femaleName.trim().length === 0) {
      Alert.alert("Error!", "No empty name is allowed!", [{ text: "Ok" }]);
      return;
    }
    setLoading(true);
    dispatch(GameAction.setCoupleNames(maleName, femaleName));
    dispatch(GameAction.loadSoftGameQD())
      .then(() => {
        setLoading(false);
        props.navigation.navigate("SoftHotInGame", { type: type });
      })
      .catch((err) => {
        setLoading(false);
        Alert.alert("Error", err.message, [{ text: "OK" }]);
      });
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#192a56" />
      </View>
    );
  }
  if (type === "hot") {
    return <PaynowComponent />;
  }
  return (
    <SafeAreaView>
      <ImageBackground
        style={styles.image}
        resizeMode="stretch"
        source={require("../../images/home-background.png")}
      />
      <KeyboardAvoidingView style={styles.screen}>
        <NameBox
          male={maleName}
          maleChange={maleNameInputHandle}
          female={femaleName}
          femaleChange={femaleNameInputHandle}
        />
        <TouchableOpacity onPress={goToGame} style={styles.playerButton}>
          <FontAwesome5 name="play" size={24} color="white" />
          <Text style={styles.playText}>{lang("start_game")}</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

SoftHotStartScreen.navigationOptions = (navData) => {
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
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 80,
    justifyContent: "center",
    position: "absolute",
  },
  screen: {
    padding: 20,
    justifyContent: "center",
    height: "100%",
    backgroundColor: "transparent",
  },
  playerRow: {
    flexDirection: "row",
    borderBottomColor: "white",
    borderBottomWidth: 2,
    paddingTop: 20,
    paddingHorizontal: 5,
    paddingBottom: 8,
    justifyContent: "space-between",
    alignItems: "center",
  },
  playerRowText: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
  playersContainer: {
    padding: 5,
    marginVertical: 10,
  },
  addPlayer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 2,
    borderColor: "white",
  },
  palyerName: {
    color: "white",
    fontSize: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  playerButton: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.redPrimary,
    width: 250,
    alignSelf: "center",
    paddingVertical: 12,
    borderRadius: 10,
  },
  playText: {
    color: "white",
    fontSize: 19,
    marginHorizontal: 10,
  },
  multiplayer: {
    padding: 5,
  },
  typeTab: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  typeItem: {
    padding: 5,
    alignItems: "center",
    backgroundColor: colors.redPrimary,
    width: 65,
    borderRadius: 10,
  },
  typeItemText: {
    fontSize: 12,
    color: "white",
  },
  multiButton: {
    marginBottom: 10,
    alignSelf: "center",
  },
  nameBox: {
    padding: 5,
    margin: 5,
    alignItems: "center",
  },
  nameBoxInputRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: colors.redPrimary,
    borderRadius: 10,
    width: "90%",
  },
  nameBoxformIcon: {
    backgroundColor: colors.redPrimary,
    width: 50,
    height: 50,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderTopStartRadius: 10,
    borderBottomStartRadius: 10,
  },
});

export default SoftHotStartScreen;
