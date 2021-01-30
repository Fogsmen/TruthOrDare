import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  ActivityIndicator,
  Alert,
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

const printTwo = (t) => (t > 10 ? t : `0${t}`);

const AdminCreateDareScreen = (props) => {
  const isIn = useRef();
  const token = useSelector((state) => state.auth.token);
  const { lang } = useSelector((state) => state.settings);
  const create = props.navigation.getParam("create");
  const [type, setType] = useState("D");
  const [gender, setGender] = useState("M");
  const [shot, setShot] = useState(0);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const createDare = () => {
    if (value.trim().length === 0) {
      Alert.alert("Error", "No empty text allowed", [{ text: "OK" }]);
      return;
    }
    setLoading(true);
    create(token, lang.toUpperCase(), type, shot, value, gender)
      .then((res) => {
        if (!isIn.current) return;
        setLoading(false);
        Alert.alert("Successed", "Created Successfully", [{ text: "OK" }]);
      })
      .catch((err) => {
        if (!isIn.current) return;
        setLoading(false);
        Alert.alert("Error", err.message, [{ text: "OK" }]);
      });
  };

  useEffect(() => {
    isIn.current = true;

    return () => {
      isIn.current = false;
    };
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.typebar}>
        <TouchableOpacity onPress={() => setType("D")}>
          <Text style={[styles.typebtn, type === "D" ? styles.activebtn : null]}>Dare</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setType("Q")}>
          <Text style={[styles.typebtn, type === "Q" ? styles.activebtn : null]}>Truth</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.typebar}>
        <TouchableOpacity onPress={() => setGender("M")}>
          <Text style={[styles.typebtn, gender === "M" ? styles.activebtn : null]}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setGender("F")}>
          <Text style={[styles.typebtn, gender === "F" ? styles.activebtn : null]}>Female</Text>
        </TouchableOpacity>
      </View>
      <TextInput style={styles.valuetxt} value={value} multiline onChangeText={(txt) => setValue(txt)} />
      {type === "D" && (
        <View>
          <Text style={styles.timer}>
            {printTwo(parseInt(shot / 60))}:{printTwo(shot % 60)}
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
        </View>
      )}
      <TouchableOpacity onPress={createDare}>
        <Text style={styles.button}>CREATE DARE</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

AdminCreateDareScreen.navigationOptions = (navData) => {
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
    minHeight: "100%",
  },
  typebar: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  typebtn: {
    textAlign: "center",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 3,
    backgroundColor: "#AE0136",
    color: "#6A0220",
    fontSize: 17,
    width: 100,
  },
  activebtn: {
    color: "#710020",
    backgroundColor: "white",
  },
  valuetxt: {
    marginTop: 30,
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
  button: {
    backgroundColor: "#500130",
    color: "white",
    fontSize: 16,
    textAlign: "center",
    margin: 30,
    padding: 10,
    fontWeight: "bold",
    borderRadius: 5,
  },
});

export default AdminCreateDareScreen;
