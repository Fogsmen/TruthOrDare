import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
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
import * as AdminService from "../../services/AdminService";

const CreateBox = ({ getLang, createItem }) => {
  const [value, setValue] = useState("");
  const inputChange = (txt) => {
    setValue(txt);
  };
  const create = () => {
    if (value.trim().length === 0) {
      Alert.alert("Error", "No empty filed is allowed", [{ text: "OK" }]);
      return;
    }
    createItem(value);
    setValue("");
  };

  return (
    <View style={styles.createbox}>
      <TextInput style={styles.input} multiline={true} value={value} onChangeText={inputChange} />
      <TouchableOpacity onPress={create}>
        <Text style={styles.createbutton}>{getLang("create")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const EditBox = ({ getLang, id, value, updateItem, deleteItem }) => {
  const [val, setVal] = useState("");
  const inputChange = (txt) => {
    setVal(txt);
  };
  const update = () => {
    if (val.trim().length === 0) {
      Alert.alert("Error", "No empty filed is allowed", [{ text: "OK" }]);
      return;
    }
    updateItem(id, val);
  };
  useEffect(() => {
    setVal(value);
  }, [value]);

  return (
    <View style={styles.createbox}>
      <TextInput style={styles.input} value={val} onChangeText={inputChange} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 5,
        }}
      >
        <TouchableOpacity style={{ paddingVertical: 5, marginVertical: 5 }} onPress={update}>
          <Text style={styles.updatebutton}>{getLang("update")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ paddingVertical: 5, marginVertical: 5 }} onPress={deleteItem.bind(this, id)}>
          <Text style={styles.deletebutton}>{getLang("delete")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const DiceBox = ({ getLang, title, items, setItems }) => {
  const updateItem = (id, value) => {
    let tempItems = [...items];
    tempItems[id] = value;
    setItems(tempItems);
  };
  const deleteItem = (id) => {
    const tempItems = items.filter((x, i) => i !== id);
    setItems(tempItems);
  };
  const addItem = (value) => {
    setItems([...items, value]);
  };
  return (
    <View style={styles.dicebox}>
      <Text style={styles.diceboxtitle}>{title}</Text>
      {items.map((value, index) => (
        <EditBox
          key={index}
          getLang={getLang}
          id={index}
          value={value}
          updateItem={updateItem}
          deleteItem={deleteItem}
        />
      ))}
      <CreateBox getLang={getLang} createItem={addItem} />
    </View>
  );
};

const AdminDiceScreen = (props) => {
  const isIn = useRef();
  const { lang, getLang } = useSelector((state) => state.settings);
  const token = useSelector((state) => state.auth.token);
  const [places, setPlaces] = useState([]);
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(false);

  const updateData = () => {
    setLoading(true);
    AdminService.updateDice(token, lang.toUpperCase(), places, actions)
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
  const loadData = useCallback(() => {
    setLoading(true);
    AdminService.getDice(token, lang.toUpperCase())
      .then((res) => {
        if (isIn.current) {
          setLoading(false);
          setPlaces(res.place);
          setActions(res.action);
        }
      })
      .catch((err) => {
        if (isIn.current) {
          setLoading(false);
          Alert.alert("Error", "Connection failed", [{ text: "OK" }]);
        }
      });
  }, [token, lang, setActions, setPlaces, setLoading]);

  useEffect(() => {
    loadData();
  }, [loadData, lang]);

  useEffect(() => {
    isIn.current = true;

    return () => {
      isIn.current = false;
    };
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#192a56" />
      </View>
    );
  }
  return (
    <KeyboardAvoidingView style={styles.screen}>
      <ScrollView>
        <DiceBox getLang={getLang} title="Places" items={places} setItems={setPlaces} />
        <DiceBox getLang={getLang} title="Actions" items={actions} setItems={setActions} />
        <TouchableOpacity
          onPress={updateData}
          style={{ marginTop: 8, paddingTop: 8, borderTopColor: "#8e44ad", borderTopWidth: 1 }}
        >
          <Text style={styles.createbutton}>Save Data</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

AdminDiceScreen.navigationOptions = (navData) => {
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
  dicebox: {
    paddingVertical: 10,
    marginBottom: 20,
  },
  diceboxtitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
});

export default AdminDiceScreen;
