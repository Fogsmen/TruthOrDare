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
  const normalMultiQuestion = () => {
    const crud = AdminService.crudNormalMultiQuestion;
    props.navigation.navigate("AdminCrud", { crud });
  };
  const normalMultiDare = () => {
    const crud = AdminService.crudNormalMultiDare;
    props.navigation.navigate("AdminCrud", { crud });
  };
  const normalMFQuestion = () => {
    const crud = AdminService.crudNormalMFQuestion;
    props.navigation.navigate("AdminCrud", { crud });
  };
  const normalMFDare = () => {
    const crud = AdminService.crudNormalMFDare;
    props.navigation.navigate("AdminCrud", { crud });
  };
  const normalMMQuestion = () => {
    const crud = AdminService.crudNormalMMQuestion;
    props.navigation.navigate("AdminCrud", { crud });
  };
  const normalMMDare = () => {
    const crud = AdminService.crudNormalMMDare;
    props.navigation.navigate("AdminCrud", { crud });
  };
  const normalFFQuestion = () => {
    const crud = AdminService.crudNormalFFQuestion;
    props.navigation.navigate("AdminCrud", { crud });
  };
  const normalFFDare = () => {
    const crud = AdminService.crudNormalFFDare;
    props.navigation.navigate("AdminCrud", { crud });
  };
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
      <TypeButton title="Normal Multiple Game Questions" onPress={normalMultiQuestion} />
      <TypeButton title="Normal Multiple Game Dares" onPress={normalMultiDare} />

      <TypeButton title="Normal Male-Female Questions" onPress={normalMFQuestion} />
      <TypeButton title="Normal Male-Female Dares" onPress={normalMFDare} />

      <TypeButton title="Normal Male-Male Questions" onPress={normalMMQuestion} />
      <TypeButton title="Normal Male-Male Dares" onPress={normalMMDare} />

      <TypeButton title="Normal Female-Female Questions" onPress={normalFFQuestion} />
      <TypeButton title="Normal Female-Female Dares" onPress={normalFFDare} />

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
