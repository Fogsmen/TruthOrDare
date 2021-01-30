import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import HeaderGoBackButton from "../../components/HeaderGoBackButton";
import HeaderLabel from "../../components/HeaderLabel";
import HeaderToggleMenuButton from "../../components/HeaderToggleMenuButton";
import * as AdminService from "../../services/AdminService";

const TypeButton = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.buttonTxt}>{title}</Text>
  </TouchableOpacity>
);

const AdminSelectTypeScreen = (props) => {
  const viewSoft = () => {
    props.navigation.navigate("AdminViewDares", { read: AdminService.getSofts });
  };
  const createSoft = () => {
    props.navigation.navigate("AdminCreateDare", { create: AdminService.createSoft });
  };
  const viewHot = () => {
    props.navigation.navigate("AdminViewDares", { read: AdminService.getHots });
  };
  const createHot = () => {
    props.navigation.navigate("AdminCreateDare", { create: AdminService.createHot });
  };
  const dice = () => {
    props.navigation.navigate("AdminDice");
  };

  return (
    <SafeAreaView style={styles.screen}>
      <TypeButton title="View Soft Dares" onPress={viewSoft} />
      <TypeButton title="Create Soft Dare" onPress={createSoft} />
      <View style={{ height: 30 }} />

      <TypeButton title="View Hot Dares" onPress={viewHot} />
      <TypeButton title="Create Hot Dare" onPress={createHot} />
      <View style={{ height: 30 }} />

      <TypeButton title="Dice Game" onPress={dice} />
    </SafeAreaView>
  );
};

AdminSelectTypeScreen.navigationOptions = (navData) => {
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
    paddingHorizontal: 5,
    backgroundColor: "#fc5c65",
    justifyContent: "center",
    flex: 1,
  },
  button: {
    alignSelf: "center",
    marginVertical: 10,
    paddingHorizontal: 10,
    width: "100%",
  },
  buttonTxt: {
    backgroundColor: "#3c40c6",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
    paddingVertical: 10,
    paddingHorizontal: 3,
    color: "white",
    borderRadius: 10,
  },
});

export default AdminSelectTypeScreen;
