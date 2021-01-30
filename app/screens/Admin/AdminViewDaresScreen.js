import React, { useState, useRef, useEffect, useCallback } from "react";
import { ActivityIndicator, Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import HeaderGoBackButton from "../../components/HeaderGoBackButton";
import HeaderLabel from "../../components/HeaderLabel";
import HeaderToggleMenuButton from "../../components/HeaderToggleMenuButton";
import colors from "../../constants/colors";

const DareCard = ({ click, item }) => {
  const min = parseInt(item.shot / 60);
  const sec = item.shot % 60;
  const printTwo = (t) => (t > 10 ? t : `0${t}`);
  return (
    <View style={styles.card}>
      <View style={styles.cardheader}>
        <Text style={styles.cardheadertext}>{item.type === "Q" ? "Truth" : "Dare"}</Text>
        <Text style={styles.cardheadertext}>{item.gender === "M" ? "Male" : "Female"}</Text>
      </View>
      <View style={styles.cardbody}>
        <Text style={styles.cardbodytext}>{item.value}</Text>
      </View>
      <View style={styles.cardfooter}>
        <TouchableOpacity onPress={click.bind(this, item.id)}>
          <Text style={styles.cardfooterview}>View</Text>
        </TouchableOpacity>
        {item.type === "D" && (
          <Text style={styles.cardfootertime}>
            {printTwo(min)} : {printTwo(sec)}
          </Text>
        )}
      </View>
    </View>
  );
};

const AdminViewDaresScreen = (props) => {
  const isIn = useRef();
  const token = useSelector((state) => state.auth.token);
  const { lang } = useSelector((state) => state.settings);
  const { read, readOne, update, remove } = props.navigation.getParam("crud");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = useCallback(() => {
    setLoading(true);
    read(token)
      .then((res) => {
        if (!isIn.current) return;
        setLoading(false);
        setData(res);
      })
      .catch((err) => {
        if (!isIn.current) return;
        setLoading(false);
        Alert.alert("Error", err.message, [{ text: "OK" }]);
      });
  }, [read, setData, setLoading, token, lang]);
  const goToEdit = (id) => {
    props.navigation.navigate("AdminEditDare", { id: id, crud: { update, remove, read: readOne } });
  };

  useEffect(() => {
    const willFocus = props.navigation.addListener("willFocus", loadData);
    loadData();

    return () => {
      willFocus.remove();
    };
  }, [loadData]);

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
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={data[lang]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(itemData) => <DareCard click={goToEdit} item={itemData.item} />}
      />
    </SafeAreaView>
  );
};

AdminViewDaresScreen.navigationOptions = (navData) => {
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
    paddingBottom: 20,
  },
  card: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 5,
    backgroundColor: colors.defaultBackground,
    borderRadius: 10,
  },
  cardheader: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 5,
  },
  cardheadertext: {
    textAlign: "center",
    fontSize: 18,
    color: colors.defaultBackground,
    padding: 2,
    backgroundColor: "white",
    fontWeight: "bold",
    minWidth: 100,
    borderRadius: 10,
  },
  cardbody: {
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  cardbodytext: {
    color: "white",
  },
  cardfooter: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardfooterview: {
    textAlign: "center",
    backgroundColor: "#3c40c6",
    color: "white",
    paddingHorizontal: 20,
    paddingVertical: 3,
    fontSize: 19,
    fontWeight: "bold",
    borderRadius: 5,
  },
  cardfootertime: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 2,
    textAlign: "center",
    fontSize: 16,
    textAlignVertical: "center",
    borderRadius: 5,
    borderColor: "#b2bec3",
    borderWidth: 1,
    fontWeight: "bold",
  },
});

export default AdminViewDaresScreen;
