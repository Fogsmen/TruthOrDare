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

const TimerBox = ({ value, setValue }) => {
  const [form, setForm] = useState({ min: parseInt(value / 60).toString(), sec: (value % 60).toString() });
  const inputHandle = (id, txt) => {
    if (isNaN(txt) || parseInt(txt) > 60) return;
    setForm({
      ...form,
      [id]: txt,
    });
  };
  useEffect(() => {
    setValue(parseInt(form.min) * 60 + parseInt(form.sec));
  }, [form, setForm]);

  return (
    <View style={{ flexDirection: "row" }}>
      <TextInput
        style={styles.shottext}
        value={form.min}
        onChangeText={inputHandle.bind(this, "min")}
        keyboardType="number-pad"
      />
      <TextInput
        style={styles.shottext}
        value={form.sec}
        onChangeText={inputHandle.bind(this, "sec")}
        keyboardType="number-pad"
      />
    </View>
  );
};

const CreateBox = ({ getLang, create, needTimer }) => {
  const [value, setValue] = useState("");
  const [shot, setShot] = useState(60);
  const submit = () => {
    if (value.trim().length === 0) {
      Alert.alert("Error", "No empty value allowed", [{ text: "OK" }]);
      return;
    }
    try {
      create(shot, value);
    } catch (err) {
      Alert.alert("Error", err.message, [{ text: "OK" }]);
      return;
    }
  };
  return (
    <View style={styles.createbox}>
      <TextInput style={styles.input} multiline={true} value={value} onChangeText={(txt) => setValue(txt)} />
      {needTimer && (
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <Text style={{ marginRight: 10, color: "white", fontSize: 16, marginVertical: 5 }}>Timer:</Text>
          <TimerBox value={shot} setValue={setShot} />
        </View>
      )}
      <TouchableOpacity onPress={submit}>
        <Text style={styles.createbutton}>{getLang("create")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const EditBox = ({ item, update, remove, getLang, needTimer }) => {
  const [value, setValue] = useState(item.value);
  const [shot, setShot] = useState(item.shot.toString());
  const updateSubmit = () => {
    if (value.trim().length === 0) {
      Alert.alert("Error", "No empty value allowed", [{ text: "OK" }]);
      return;
    }
    try {
      update(item.id, shot, value);
    } catch (err) {
      Alert.alert("Error", err.message, [{ text: "OK" }]);
      return;
    }
  };

  return (
    <View style={styles.createbox}>
      <TextInput style={styles.input} value={value} multiline={true} onChangeText={(txt) => setValue(txt)} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 5,
        }}
      >
        <TouchableOpacity style={{ paddingVertical: 5, marginVertical: 5 }} onPress={updateSubmit}>
          <Text style={styles.updatebutton}>{getLang("update")}</Text>
        </TouchableOpacity>
        {needTimer && <TimerBox value={shot} setValue={setShot} />}
        <TouchableOpacity style={{ paddingVertical: 5, marginVertical: 5 }} onPress={remove.bind(this, item.id)}>
          <Text style={styles.deletebutton}>{getLang("delete")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const AdminCrudScreen = (props) => {
  const isIn = useRef();
  const { create, read, update, remove } = props.navigation.getParam("crud");
  const needTimer = props.navigation.getParam("needTimer");
  const token = useSelector((state) => state.auth.token);
  const { lang, getLang } = useSelector((state) => state.settings);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const createItem = (shot, value) => {
    setLoading(true);
    create(token, lang.toUpperCase(), needTimer ? shot : 0, value)
      .then((res) => {
        loadData();
      })
      .catch((err) => {
        if (isIn.current) {
          setLoading(false);
          Alert.alert("Error", "Connection failed", [{ text: "OK" }]);
        }
      });
  };
  const updateItem = (id, shot, value) => {
    setLoading(true);
    update(token, id, needTimer ? shot : 0, value)
      .then((res) => {
        loadData();
      })
      .catch((err) => {
        if (isIn.current) {
          setLoading(false);
          Alert.alert("Error", "Connection failed", [{ text: "OK" }]);
        }
      });
  };
  const removeItem = (id) => {
    setLoading(true);
    remove(token, id)
      .then((res) => {
        loadData();
      })
      .catch((err) => {
        setLoading(false);
        Alert.alert("Error", "Connection failed", [{ text: "OK" }]);
      });
  };

  const loadData = useCallback(() => {
    setLoading(true);
    read(token)
      .then((res) => {
        if (isIn.current) {
          setData(res);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isIn.current) {
          setLoading(false);
          Alert.alert("Error", "Connection failed", [{ text: "OK" }]);
        }
      });
  }, [token, setLoading, setData]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    isIn.current = true;

    return () => {
      isIn.current = false;
    };
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      {loading ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <ScrollView>
          {data[lang] &&
            data[lang].map((item) => (
              <EditBox
                key={item.id}
                getLang={getLang}
                update={updateItem}
                item={item}
                remove={removeItem}
                needTimer={needTimer}
              />
            ))}
          <CreateBox getLang={getLang} create={createItem} needTimer={needTimer} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

AdminCrudScreen.navigationOptions = (navData) => {
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
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "#ff7675",
    height: "100%",
  },
  createbox: {
    marginBottom: 10,
    marginTop: 20,
    padding: 5,
    backgroundColor: "#ff5252",
    width: "100%",
    paddingTop: 5,
  },
  input: {
    borderColor: "#7f8fa6",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    color: "#2c2c54",
    backgroundColor: "#f7f1e3",
    marginVertical: 8,
  },
  updatebutton: {
    color: "white",
    backgroundColor: "#ffb142",
    paddingHorizontal: 20,
    paddingVertical: 8,
    fontWeight: "bold",
    borderRadius: 5,
  },
  deletebutton: {
    color: "white",
    fontWeight: "bold",
    backgroundColor: "#b33939",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5,
  },
  createbutton: {
    color: "white",
    backgroundColor: "#474787",
    paddingHorizontal: 50,
    paddingVertical: 8,
    fontWeight: "bold",
    borderRadius: 5,
    alignSelf: "center",
  },
  shottext: {
    borderColor: "#7f8fa6",
    borderWidth: 1,
    borderRadius: 5,
    width: 50,
    textAlign: "center",
    padding: 1,
    color: "#2c2c54",
    backgroundColor: "#f7f1e3",
    marginVertical: 8,
    marginHorizontal: 3,
  },
});

export default AdminCrudScreen;
