import React, { useState, useRef, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
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
import HeaderLabel from "../../components/HeaderLabel";
import HeaderToggleMenuButton from "../../components/HeaderToggleMenuButton";
import * as ApiService from "../../services/ApiService";

const CreateBox = ({ getLang, createItem }) => {
  const [value, setValue] = useState("");
  const inputChange = (txt) => {
    setValue(txt);
  };

  return (
    <View style={styles.createbox}>
      <TextInput
        style={styles.input}
        multiline={true}
        value={value}
        onChangeText={inputChange}
      />
      <TouchableOpacity onPress={createItem.bind(this, value)}>
        <Text style={styles.createbutton}>{getLang("create")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const EditBox = ({ getLang, item, updateItem, deleteItem }) => {
  const [value, setValue] = useState();
  const inputChange = (txt) => {
    setValue(txt);
  };
  useEffect(() => {
    setValue(item.value);
  }, [item]);
  return (
    <View style={styles.createbox}>
      <TextInput
        style={styles.input}
        value={value}
        multiline={true}
        onChangeText={inputChange}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 5,
        }}
      >
        <TouchableOpacity
          style={{ paddingVertical: 5, marginVertical: 5 }}
          onPress={updateItem.bind(this, item.id, value)}
        >
          <Text style={styles.updatebutton}>{getLang("update")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ paddingVertical: 5, marginVertical: 5 }}
          onPress={deleteItem.bind(this, item.id)}
        >
          <Text style={styles.deletebutton}>{getLang("delete")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const MyDaresScreen = (props) => {
  const token = useSelector((state) => state.auth.token);
  const { lang, getLang } = useSelector((state) => state.settings);
  const isIn = useRef();
  const [dares, setDares] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const loadDares = useCallback(() => {
    setIsLoading(true);
    setRefresh(true);
    ApiService.getMyDares(token, lang)
      .then((res) => {
        if (isIn.current) {
          setRefresh(false);
          setIsLoading(false);
          setDares(res);
        }
      })
      .catch((err) => {
        if (isIn.current) {
          setIsLoading(false);
          setRefresh(false);
          Alert.alert("Error", err.message ?? "Server error", [{ text: "OK" }]);
        }
      });
  }, [token, lang, setDares, setIsLoading]);
  const createDare = useCallback(
    (value) => {
      if (value.trim().length === 0) return;
      setIsLoading(true);
      ApiService.createMyDare(token, lang, value)
        .then((res) => {
          if (isIn.current) loadDares();
        })
        .catch((err) => {
          if (isIn.current) {
            setIsLoading(false);
            Alert.alert("Error", err.message ?? "Connction error", [
              { text: "OK" },
            ]);
          }
        });
    },
    [loadDares]
  );
  const deleteDare = useCallback(
    (id) => {
      setIsLoading(true);
      ApiService.deleteMyDare(token, id)
        .then((res) => {
          if (isIn.current) {
            loadDares();
          }
        })
        .catch((err) => {
          if (isIn.current) {
            setIsLoading(false);
            Alert.alert("Error", err.message ?? "Connection error", [
              { text: "OK" },
            ]);
          }
        });
    },
    [loadDares]
  );
  const updateDare = useCallback(
    (id, value) => {
      if (value.trim().lengt === 0) return;
      setIsLoading(true);
      ApiService.updateMyDare(token, id, value)
        .then((res) => {
          if (isIn.current) {
            loadDares();
          }
        })
        .catch((err) => {
          if (isIn.current) {
            setIsLoading(false);
            Alert.alert("Error", "Connection error", [{ text: "OK" }]);
          }
        });
    },
    [loadDares]
  );

  useEffect(() => {
    isIn.current = true;
    const willFocusSub = props.navigation.addListener("willFocus", loadDares);

    return () => {
      willFocusSub.remove();
      isIn.current = false;
    };
  }, [loadDares, lang, token]);

  return (
    <KeyboardAvoidingView style={styles.screen}>
      {isLoading ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <FlatList
          refreshing={refresh}
          onRefresh={loadDares}
          data={dares}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(itemData) => (
            <EditBox
              getLang={getLang}
              updateItem={updateDare}
              deleteItem={deleteDare}
              item={itemData.item}
            />
          )}
          ListFooterComponent={
            <CreateBox getLang={getLang} createItem={createDare} />
          }
        />
      )}
    </KeyboardAvoidingView>
  );
};

MyDaresScreen.navigationOptions = (navData) => {
  const toggleDrawer = () => {
    navData.navigation.toggleDrawer();
  };

  return {
    headerLeft: () => <HeaderToggleMenuButton toggleNavbar={toggleDrawer} />,
    headerTitle: () => <HeaderLabel label="Intimidades – The Tantra  game" />,
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
});

export default MyDaresScreen;
