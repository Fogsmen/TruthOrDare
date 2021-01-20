import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import colors from "../../constants/colors";
import HeaderLabel from "../../components/HeaderLabel";
import HeaderToggleMenuButton from "../../components/HeaderToggleMenuButton";
import * as AuthAction from "../../redux/actions/auth";

const LoginScreen = (props) => {
  const auth = useSelector((state) => state.auth);
  const [email, setEmail] = useState(auth.email ?? "");
  const [password, setPassword] = useState(auth.password ?? "");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { getLang } = useSelector((state) => state.settings);

  const inputEmailHandle = (txt) => {
    setEmail(txt);
  };
  const inputPasswordHandle = (txt) => {
    setPassword(txt);
  };

  const login = () => {
    if (email.trim().length === 0 || password.trim().length === 0) {
      Alert.alert("Error", "Please input valid email and password", [{ text: "OK" }]);
      return;
    }
    setIsLoading(true);
    dispatch(AuthAction.login(email, password))
      .then((res) => {
        setIsLoading(false);
        if (res.role === "ADMIN") {
          props.navigation.navigate("AdminGameType");
        } else {
          props.navigation.navigate("MyDares");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        for (const e in err.errors) {
          Alert.alert("Error", err.errors[e][0], [{ text: "OK" }]);
          return;
        }
        Alert.alert("Error", err.message ?? "Connection error", [{ text: "OK" }]);
      });
  };
  const goToRegister = () => {
    props.navigation.replace("Register");
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#192a56" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.screen}>
      <View style={styles.nameBox}>
        <View style={styles.nameBoxInputRow}>
          <View style={styles.nameBoxformIcon}>
            <MaterialCommunityIcons name="email" size={24} color="white" />
          </View>
          <TextInput
            placeholder={getLang("email_address")}
            placeholderTextColor="#b2bec3"
            style={{ color: "white", width: "75%", paddingHorizontal: 10 }}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={inputEmailHandle}
          />
        </View>
        <View style={styles.nameBoxInputRow}>
          <View style={styles.nameBoxformIcon}>
            <FontAwesome5 name="key" size={24} color="white" />
          </View>
          <TextInput
            placeholder={getLang("password")}
            placeholderTextColor="#b2bec3"
            style={{ color: "white", width: "75%", paddingHorizontal: 10 }}
            secureTextEntry={true}
            autoCapitalize="none"
            value={password}
            onChangeText={inputPasswordHandle}
          />
        </View>
      </View>
      <TouchableOpacity onPress={login} style={styles.playerButton}>
        <Text style={styles.playText}>{getLang("u_login")}</Text>
        <MaterialCommunityIcons name="login" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={goToRegister} style={{ paddingVertical: 5, paddingHorizontal: 20 }}>
        <Text style={styles.link}>{getLang("register")}</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    justifyContent: "center",
    height: "100%",
    backgroundColor: "#ff7675",
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
    marginTop: 18,
    marginBottom: 10,
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
    fontWeight: "bold",
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
    marginVertical: 10,
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
  link: {
    marginVertical: 20,
    textAlign: "center",
    fontSize: 16,
    color: "#dff9fb",
  },
});

LoginScreen.navigationOptions = (navData) => {
  const toggleDrawer = () => {
    navData.navigation.toggleDrawer();
  };

  return {
    headerLeft: () => <HeaderToggleMenuButton toggleNavbar={toggleDrawer} />,
    headerTitle: () => <HeaderLabel label="Intimidades – The Tantra  game" />,
  };
};

export default LoginScreen;
