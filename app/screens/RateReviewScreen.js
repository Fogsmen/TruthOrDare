import React, { useState } from "react";
import {
  Alert,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Linking,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import colors from "../constants/colors";
import HeaderToggleMenuButton from "../components/HeaderToggleMenuButton";
import HeaderLabel from "../components/HeaderLabel";
import * as StoreReview from "expo-store-review";

const WriteStars = (props) => {
  const [star, setStar] = useState(0);
  const changeValue = (newValue) => {
    setStar(newValue);
  };
  const stars = [...Array(5).keys()];
  const sentence = () => {
    switch (star) {
      case 1:
        return "Whoops!";

      case 2:
        return "Whoops!";

      case 3:
        return "Oh, no!";

      case 4:
        return "It's okay";

      case 5:
        return "Awesome!!";

      default:
        return "???";
    }
  };

  return (
    <View style={styles.box}>
      <View style={{ marginVertical: 2, flexDirection: "row" }}>
        {stars.map((i) => {
          return star > i ? (
            <TouchableWithoutFeedback key={i} onPress={() => changeValue(i + 1)}>
              <AntDesign name="star" size={35} color="white" />
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback key={i} onPress={() => changeValue(i + 1)}>
              <AntDesign name="staro" size={35} color="white" />
            </TouchableWithoutFeedback>
          );
        })}
      </View>
      {star > 0 && (
        <View style={{ marginVertical: 5 }}>
          <Text style={{ fontWeight: "bold", fontSize: 14, color: "white" }}>{sentence()}</Text>
        </View>
      )}
    </View>
  );
};

const RateReviewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleReview = () => {
    setIsLoading(true);
    StoreReview.isAvailableAsync()
      .then((res) => {
        setIsLoading(false);
        if (res) {
          StoreReview.requestReview();
        } else {
          Alert.alert("Error", "You are not available to submit review now!", [{ text: "OK" }]);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        Alert.alert("Error", err.message, [{ text: "OK" }]);
      });
  };
  const openWhatsApp = () => {
    try {
      Linking.openURL("https://api.whatsapp.com/send?phone=66950340010&text=Contact%20Us");
    } catch (err) {
      Alert.alert("Error", err.message, [{ text: "OK" }]);
    }
  };

  return (
    <View style={styles.screen}>
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.title}>GIVE FEEDBACK!</Text>
          <Text style={styles.body}>What rating would you give this app?</Text>
          <View style={{ marginBottom: 30 }}>
            <WriteStars />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleReview}>
            <Text style={styles.buttonText}>Rate the app</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ position: "absolute", bottom: 20 }} onPress={openWhatsApp}>
            <Text style={{ color: "white", textDecorationLine: "underline" }}>Contact Us</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

RateReviewScreen.navigationOptions = (navData) => {
  const toggleDrawer = () => {
    navData.navigation.toggleDrawer();
  };

  return {
    headerLeft: () => <HeaderToggleMenuButton toggleNavbar={toggleDrawer} />,
    headerTitle: () => <HeaderLabel label="Intimidades – The Tantra  game" />,
    headerRight: () => null,
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
  button: {
    borderRadius: 5,
    paddingHorizontal: 30,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8500FA",
  },
  buttonText: {
    fontWeight: "800",
    fontSize: 20,
    color: "white",
  },
  title: {
    fontSize: 22,
    color: "white",
    paddingVertical: 3,
    fontWeight: "bold",
  },
  body: {
    fontSize: 15,
    color: "white",
    marginBottom: 20,
  },
  box: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RateReviewScreen;
