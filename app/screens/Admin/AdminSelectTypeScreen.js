import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
  const coupleSoftFemaleQuestion = () => {
    const crud = AdminService.crudCoupleSoftFemaleQuestion;
    props.navigation.navigate("AdminCrud", { crud });
  };
  const coupleSoftFemaleDare = () => {
    const crud = AdminService.crudCoupleSoftFemaleDare;
    props.navigation.navigate("AdminCrud", { crud });
  };
  const coupleSoftMaleQuestion = () => {
    const crud = AdminService.crudCoupleSoftMaleQuestion;
    props.navigation.navigate("AdminCrud", { crud });
  };
  const coupleSoftMaleDare = () => {
    const crud = AdminService.crudCoupleSoftMaleDare;
    props.navigation.navigate("AdminCrud", { crud });
  };
  const coupleHotFemaleQuestion = () => {
    const crud = AdminService.crudCoupleHotFemaleQuestion;
    props.navigation.navigate("AdminCrud", { crud });
  };
  const coupleHotFemaleDare = () => {
    const crud = AdminService.crudCoupleHotFemaleDare;
    props.navigation.navigate("AdminCrud", { crud });
  };
  const coupleHotMaleQuestion = () => {
    const crud = AdminService.crudCoupleHotMaleQuestion;
    props.navigation.navigate("AdminCrud", { crud });
  };
  const coupleHotMaleDare = () => {
    const crud = AdminService.crudCoupleHotMaleDare;
    props.navigation.navigate("AdminCrud", { crud });
  };
  const dice = () => {
    props.navigation.navigate("AdminDice");
  };

  return (
    <ScrollView style={styles.screen}>
      <TypeButton title="Couple Soft Female Questions" onPress={coupleSoftFemaleQuestion} />
      <TypeButton title="Couple Soft Female Dares" onPress={coupleSoftFemaleDare} />
      <TypeButton title="Couple Soft Male Questions" onPress={coupleSoftMaleQuestion} />
      <TypeButton title="Couple Soft Male Dares" onPress={coupleSoftMaleDare} />

      <TypeButton title="Couple Hot Female Questions" onPress={coupleHotFemaleQuestion} />
      <TypeButton title="Couple Hot Female Dares" onPress={coupleHotFemaleDare} />
      <TypeButton title="Couple Hot Male Questions" onPress={coupleHotMaleQuestion} />
      <TypeButton title="Couple Hot Male Dares" onPress={coupleHotMaleDare} />

      <TypeButton title="Dice Game" onPress={dice} />
      <View style={{ height: 30 }} />
    </ScrollView>
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
    paddingTop: 10,
    paddingBottom: 50,
    paddingHorizontal: 5,
    backgroundColor: "#fc5c65",
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
