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
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import HeaderGoBackButton from "../../components/HeaderGoBackButton";
import HeaderLabel from "../../components/HeaderLabel";
import HeaderToggleMenuButton from "../../components/HeaderToggleMenuButton";

const DareCard = ({ click, item }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardheader}>
        <Text style={styles.cardheadertext}>Truth</Text>
        <Text style={styles.cardheadertext}>Male</Text>
      </View>
      <View style={styles.cardbody}>
        <Text style={styles.cardbodytext}>This is Body</Text>
      </View>
      <View style={styles.cardfooter}>
        <Text style={styles.cardfooterbtn}>View</Text>
        <Text style={styles.cardfootertext}>01:00</Text>
      </View>
    </TouchableOpacity>
  );
};

const AdminViewDaresScreen = (props) => {
  const isIn = useRef();
  const readData = props.navigation.getParam("read");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = useCallback(() => {
    setLoading(true);
    readData()
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
  }, [readData, setData, setLoading]);

  useEffect(() => {
    isIn.current = true;

    return () => {
      isIn.current = false;
    };
  }, []);

  useEffect(() => {
    const willFocus = props.navigation.addListener("willFocus", loadDares);

    return () => {
      willFocus.remove();
    };
  }, [loadData]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }
  return (
    <FlatList
      style={styles.screen}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => <DareCard click={() => {}} item={itemData.item} />}
    />
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
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "#ff7675",
    height: "100%",
  },
  card: {},
  cardheader: {},
  cardheadertext: {},
  cardbody: {},
  cardbodytext: {},
  cardfooter: {},
  cardfooterbtn: {},
  cardfootertext: {},
});

export default AdminViewDaresScreen;
