import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  KeyboardAvoidingView,
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

const CreateBox = ({ getLang, create }) => {
  const [value, setValue] = useState("");
  const [shot, setShot] = useState("0");
  const submit = () => {
    if (value.trim().length === 0 || shot.trim().length === 0) {
      Alert.alert("Error", "No empty value allowed", [{ text: "OK" }]);
      return;
    }
    try {
      create(parseInt(shot), value);
    } catch (err) {
      Alert.alert("Error", err.message, [{ text: "OK" }]);
      return;
    }
  };
  return (
    <View style={styles.createbox}>
      <TextInput style={styles.input} multiline={true} value={value} onChangeText={(txt) => setValue(txt)} />
      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <Text style={{ marginRight: 10, color: "white", fontSize: 16, marginVertical: 5 }}>Shot:</Text>
        <TextInput
          style={styles.shottext}
          value={shot}
          onChangeText={(t) => !isNaN(t) && setShot(t)}
          keyboardType="number-pad"
        />
      </View>
      <TouchableOpacity onPress={submit}>
        <Text style={styles.createbutton}>{getLang("create")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const EditBox = ({ item, update, remove, getLang }) => {
  const [value, setValue] = useState(item.value);
  const [shot, setShot] = useState(item.shot.toString());
  const updateSubmit = () => {
    if (value.trim().length === 0 || shot.trim().length === 0) {
      Alert.alert("Error", "No empty value allowed", [{ text: "OK" }]);
      return;
    }
    try {
      update(item.id, parseInt(shot), value);
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
        <TextInput
          style={styles.shottext}
          value={shot}
          onChangeText={(txt) => !isNaN(txt) && setShot(txt)}
          keyboardType="number-pad"
        />
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
  const token = useSelector((state) => state.auth.token);
  const { lang, getLang } = useSelector((state) => state.settings);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const createItem = (shot, value) => {
    setLoading(true);
    create(token, lang.toUpperCase(), shot, value)
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
    update(token, id, shot, value)
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
    <KeyboardAvoidingView style={styles.screen}>
      {loading ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <FlatList
          data={data[lang]}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(itemData) => (
            <EditBox getLang={getLang} update={updateItem} item={itemData.item} remove={removeItem} />
          )}
          ListFooterComponent={<CreateBox getLang={getLang} create={createItem} />}
        />
      )}
    </KeyboardAvoidingView>
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
    width: 60,
    textAlign: "center",
    padding: 1,
    color: "#2c2c54",
    backgroundColor: "#f7f1e3",
    marginVertical: 8,
  },
});

export default AdminCrudScreen;
