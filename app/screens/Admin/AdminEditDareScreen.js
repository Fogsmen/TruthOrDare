import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import HeaderGoBackButton from "../../components/HeaderGoBackButton";
import HeaderLabel from "../../components/HeaderLabel";
import HeaderToggleMenuButton from "../../components/HeaderToggleMenuButton";
import colors from "../../constants/colors";

const printTwo = (t) => (t > 10 ? t : `0${t}`);

const AdminEditDareScreen = (props) => {
  const isIn = useRef();
  const token = useSelector((state) => state.auth.token);
  const id = props.navigation.getParam("id");
  const { read, update, remove } = props.navigation.getParam("crud");
  const [loading, setLoading] = useState(false);
  const [dare, setDare] = useState();

  const loadDare = useCallback(() => {
    setLoading(true);
    read(token, id)
      .then((res) => {
        if (!isIn.current) return;
        setLoading(false);
        setDare(res);
      })
      .catch((err) => {
        if (!isIn.current) return;
        setLoading(false);
        Alert.alert("Error", err.message, [{ text: "OK" }]);
      });
  }, [token, id]);

  const updateDare = () => {
    setLoading(true);
    update(token, id, dare.type, dare.gender, dare.shot, dare.value)
      .then((res) => {
        if (!isIn.current) return;
        setDare(res);
        loadDare();
      })
      .catch((err) => {
        if (!isIn.current) return;
        setLoading(false);
        Alert.alert("Error", err.message, [{ text: "OK" }]);
      });
  };

  const removeDare = () => {
    setLoading(true);
    remove(token, id)
      .then((res) => {
        props.navigation.goBack();
      })
      .catch((err) => {
        if (!isIn.current) return;
        setLoading(false);
        Alert.alert("Error", err.message, [{ text: "OK" }]);
      });
  };

  const inputHandle = (txt) => {
    setDare({ ...dare, value: txt });
  };
  const setShot = (shot) => {
    setDare({ ...dare, shot });
  };

  useEffect(() => {
    loadDare();
  }, [loadDare]);

  useEffect(() => {
    isIn.current = true;

    return () => {
      isIn.current = false;
    };
  }, []);

  if (loading || !dare) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.typegender}>
        <Text style={styles.type}>{dare.type === "Q" ? "Truth" : "Dare"}</Text>
        <Text style={styles.gender}>{dare.gender === "M" ? "Male" : "Female"}</Text>
      </View>
      <TextInput style={styles.text} multiline value={dare.value} onChangeText={inputHandle} />
      <Text style={styles.timer}>
        {printTwo(parseInt(dare.shot / 60))}:{printTwo(dare.shot % 60)}
      </Text>
      <View style={styles.timerbar}>
        <TouchableOpacity style={styles.timerbarbtn} onPress={() => setShot(30)}>
          <Text style={styles.timerbarbtntxt}>00:30</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.timerbarbtn} onPress={() => setShot(60)}>
          <Text style={styles.timerbarbtntxt}>01:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.timerbarbtn} onPress={() => setShot(120)}>
          <Text style={styles.timerbarbtntxt}>02:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.timerbarbtn} onPress={() => setShot(300)}>
          <Text style={styles.timerbarbtntxt}>05:00</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={updateDare}>
          <Text style={styles.updatebtn}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={removeDare}>
          <Text style={styles.removebtn}>Delete</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

AdminEditDareScreen.navigationOptions = (navData) => {
  const toggleDrawer = () => {
    navData.navigation.toggleDrawer();
  };
  const goToHome = () => {
    navData.navigation.goBack();
  };

  return {
    headerLeft: () => <HeaderToggleMenuButton toggleNavbar={toggleDrawer} />,
    headerTitle: () => <HeaderLabel label="Intimidades – Admin panel" />,
    headerRight: () => <HeaderGoBackButton onClick={goToHome} />,
  };
};

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    backgroundColor: "#ff7675",
    height: "100%",
  },
  typegender: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  type: {
    textAlign: "center",
    fontSize: 18,
    color: colors.defaultBackground,
    padding: 2,
    backgroundColor: "white",
    fontWeight: "bold",
    minWidth: 100,
    borderRadius: 10,
  },
  gender: {
    textAlign: "center",
    fontSize: 18,
    color: "white",
    padding: 2,
    backgroundColor: "#4815ED",
    fontWeight: "bold",
    minWidth: 100,
    borderRadius: 10,
  },
  text: {
    margin: 10,
    padding: 8,
    borderRadius: 5,
    backgroundColor: "white",
    fontSize: 16,
    borderWidth: 0.5,
    borderColor: "#2c3e50",
  },
  timer: {
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "#2c3e50",
    fontSize: 17,
    textAlign: "center",
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: 20,
  },
  timerbar: {
    flexDirection: "row",
    backgroundColor: "#509B00",
    marginVertical: 10,
  },
  timerbarbtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#500132",
  },
  timerbarbtntxt: {
    color: "white",
    padding: 7,
    fontSize: 15,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 35,
    marginHorizontal: 30,
  },
  updatebtn: {
    color: "white",
    backgroundColor: "#ffb142",
    paddingHorizontal: 20,
    paddingVertical: 8,
    fontWeight: "bold",
    borderRadius: 5,
  },
  removebtn: {
    color: "white",
    fontWeight: "bold",
    backgroundColor: "#b33939",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5,
  },
});

export default AdminEditDareScreen;
