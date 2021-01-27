import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import * as GameAction from "../../redux/actions/game";
import colors from "../../constants/colors";
import HeaderLabel from "../../components/HeaderLabel";
import HeaderToggleMenuButton from "../../components/HeaderToggleMenuButton";

const PlayerRow = (props) => {
  const deleteRow = () => {
    props.onClick(props.id);
  };
  const dispatch = useDispatch();
  const playerInputHandle = (txt) => {
    dispatch(GameAction.updatePlayer(props.id, txt));
  };

  return (
    <View style={styles.playerRow}>
      <TextInput
        placeholderTextColor="#cccccc"
        value={props.name}
        onChangeText={playerInputHandle}
        style={styles.playerRowText}
      />
      <TouchableOpacity onPress={deleteRow} style={{ padding: 5 }}>
        <MaterialIcons name="close" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const MultiPlayer = (props) => {
  const players = useSelector((state) => state.game.players);
  const lang = useSelector((state) => state.settings.getLang);
  const dispatch = useDispatch();
  const { lastPlayer, setLastPlayer } = props;

  const deletePlayer = (id) => {
    dispatch(GameAction.deletePlayer(id));
  };
  const addPlayer = () => {
    if (lastPlayer.trim().length === 0) {
      Alert.alert("Error!", "No empty name is allowed.", [{ text: "OK" }]);
      return;
    }
    dispatch(GameAction.addPlayer(lastPlayer));
    setLastPlayer("");
  };
  const playerInputHandle = (txt) => {
    setLastPlayer(txt);
  };

  return (
    <View style={styles.multiplayer}>
      {players.map((player, index) => (
        <PlayerRow key={index} id={player.id} name={player.name} onClick={deletePlayer} />
      ))}
      <View style={styles.addPlayer}>
        <TextInput
          placeholder={lang("add_player")}
          placeholderTextColor="#cccccc"
          value={lastPlayer}
          onChangeText={playerInputHandle}
          style={styles.palyerName}
          autoFocus={true}
        />
        <TouchableOpacity onPress={addPlayer} style={{ padding: 5 }}>
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const NameBoxRow = ({ gender, value, onChange }) => {
  const lang = useSelector((state) => state.settings.getLang);
  return (
    <View style={styles.nameBox}>
      <Text style={{ color: "white" }}>{gender === "male" ? lang("mans_name") : lang("womans_name")}</Text>
      <View style={styles.nameBoxInputRow}>
        <View style={styles.nameBoxformIcon}>
          <MaterialCommunityIcons name={`gender-${gender}`} size={24} color="white" />
        </View>
        <TextInput
          placeholder={gender === "male" ? lang("mans_name") : lang("womans_name")}
          style={{ color: "white", width: "75%", paddingHorizontal: 10 }}
          value={value}
          onChangeText={onChange}
        />
      </View>
    </View>
  );
};

const NameBox = ({ gameType, firstPlayer, secondPlayer, firstChange, secondChange }) => (
  <View style={{ padding: 1 }}>
    {gameType === "MF" || gameType === "FF" ? (
      <NameBoxRow gender="female" value={firstPlayer} onChange={firstChange} />
    ) : (
      <NameBoxRow gender="male" value={firstPlayer} onChange={firstChange} />
    )}
    {gameType === "MM" || gameType === "MF" ? (
      <NameBoxRow gender="male" value={secondPlayer} onChange={secondChange} />
    ) : (
      <NameBoxRow gender="female" value={secondPlayer} onChange={secondChange} />
    )}
  </View>
);

const StartGameScreen = (props) => {
  const players = useSelector((state) => state.game.players) ?? [];
  const [gameType, setGameType] = useState("MF");
  const lang = useSelector((state) => state.settings.getLang);
  const dispatch = useDispatch();
  const [lastPlayer, setLastPlayer] = useState(props.lastPlayer ?? "");
  const [loading, setLoading] = useState(false);

  const goToGame = () => {
    if (gameType === "MUL" && lastPlayer.trim().length > 0) {
      dispatch(GameAction.addPlayer(lastPlayer));
      setLastPlayer("");
    }
    if (gameType === "MUL" && players.length < 2) {
      Alert.alert("Error!", "You shoud add at least 2 player", [{ text: "OK" }]);
      return;
    }
    if (gameType !== "MUL" && (firstPlayer.trim().length === 0 || secondPlayer.trim().length === 0)) {
      Alert.alert("Error!", "No empty name is allowed!", [{ text: "Ok" }]);
      return;
    }
    if (gameType !== "MUL") {
      dispatch(GameAction.setPlayers([firstPlayer, secondPlayer]));
    }
    setLoading(true);
    dispatch(GameAction.loadNormalGameQD(gameType))
      .then((res) => {
        setLoading(false);
        props.navigation.navigate("InGame");
      })
      .catch((err) => {
        setLoading(false);
        Alert.alert("Error", "Connection failed", [{ text: "OK" }]);
      });
  };
  const [firstPlayer, setFirstPlayer] = useState(players.length > 0 ? players[0].name : "");
  const [secondPlayer, setSecondPlayer] = useState(players.length > 1 ? players[1].name : "");
  const firstPlayerInputHandle = (txt) => {
    setFirstPlayer(txt);
  };
  const secondPlayerInputHandle = (txt) => {
    setSecondPlayer(txt);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#192a56" />
      </View>
    );
  }
  return (
    <SafeAreaView>
      <ImageBackground style={styles.image} resizeMode="stretch" source={require("../../images/home-background.png")} />
      <KeyboardAvoidingView style={styles.screen}>
        <ScrollView style={{ backgroundColor: "transparent" }}>
          <View style={styles.typeTab}>
            <TouchableOpacity style={styles.typeItem} onPress={() => setGameType("MF")}>
              <FontAwesome5 name="transgender" size={30} color="white" />
              <Text style={styles.typeItemText}>{lang("straight")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.typeItem} onPress={() => setGameType("MM")}>
              <MaterialCommunityIcons name="gender-male" size={30} color="white" />
              <Text style={styles.typeItemText}>{lang("gray")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.typeItem} onPress={() => setGameType("FF")}>
              <MaterialCommunityIcons name="gender-female" size={30} color="white" />
              <Text style={styles.typeItemText}>{lang("lesbian")}</Text>
            </TouchableOpacity>
          </View>
          {gameType === "MUL" ? (
            <MultiPlayer lastPlayer={lastPlayer} setLastPlayer={setLastPlayer} />
          ) : (
            <NameBox
              gameType={gameType}
              firstPlayer={firstPlayer}
              firstChange={firstPlayerInputHandle}
              secondPlayer={secondPlayer}
              secondChange={secondPlayerInputHandle}
            />
          )}
          <TouchableOpacity onPress={goToGame} style={styles.playerButton}>
            <FontAwesome5 name="play" size={24} color="white" />
            <Text style={styles.playText}>{lang("start_game")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.multiButton} onPress={() => setGameType("MUL")}>
            <Text style={{ color: "white", textDecorationLine: "underline" }}>{lang("multi_players")}?</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

StartGameScreen.navigationOptions = (navData) => {
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
    width: "80%",
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
    marginTop: 60,
    marginBottom: 10,
  },
  palyerName: {
    color: "white",
    fontSize: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: "80%",
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

export default StartGameScreen;
