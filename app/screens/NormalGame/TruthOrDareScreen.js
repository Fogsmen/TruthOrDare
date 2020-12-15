import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { useSelector } from 'react-redux';

import colors from '../../constants/colors';
import HeaderToggleMenuButton from '../../components/HeaderToggleMenuButton';
import HeaderLabel from '../../components/HeaderLabel';
import HeaderGoBackButton from '../../components/HeaderGoBackButton';

const ShotModal = props => {
	const closeModal = () => {
		props.closeModal();
	};
	const getLang = useSelector(state => state.settings.getLang);

	return (
		<Modal animationType="slide" transparent={true} visible={props.visible}>
			<TouchableOpacity style={styles.centeredView} activeOpacity={1} onPressOut={closeModal}>
				<View style={styles.modalView}>
					<Text style={styles.modalText}>{getLang('you_have_to_drink')}</Text>
					<Text style={{fontWeight: 'bold', fontSize: 30}}>{props.shot}</Text>
					<Text style={{fontSize: 15, marginVertical: 20}}>{getLang('shots')}</Text>
				</View>
			</TouchableOpacity>
		</Modal>
	);
};

const TruthOrDareScreen = props => {
	const type = props.navigation.getParam('type');
	const question = props.navigation.getParam('question');
	const [visibleModal, setVisibleModal] = useState(false);
	const myName = useSelector(state => state.auth.userName);
	useEffect(() => {
		props.navigation.setParams({myName: myName});
	}, [myName]);

	const nextRound = () => {
		props.navigation.popToTop();
		props.navigation.navigate('InGame');
	};
	const alertShot = () => {
		setVisibleModal(true);
	};
	const closeModal = () => {
		setVisibleModal(false);
	};
	const getLang = useSelector(state => state.settings.getLang);

	return (
		<View style={styles.screen}>
			<View style={styles.title}>
				<Text style={styles.titleText}>{type=='truth' ? getLang('truth') : getLang('dare')}</Text>
			</View>
			<View style={styles.body}>
				<Text style={styles.bodyText}>{question.value}</Text>
				<TouchableOpacity style={{marginVertical: 20, padding: 5}} onPress={alertShot}>
					<FontAwesome5 name="glass-martini-alt" size={30} color="white" />
				</TouchableOpacity>
			</View>
			<TouchableOpacity style={styles.button} onPress={nextRound}>
				<Text style={styles.buttonText}>{getLang('next_round')}</Text>
			</TouchableOpacity>
			<ShotModal visible={visibleModal} closeModal={closeModal} shot={question.shot} />
		</View>
	);
};

TruthOrDareScreen.navigationOptions = navData => {
	const toggleDrawer = () => {
		navData.navigation.toggleDrawer();
	};
	const goToHome = () => {
		navData.navigation.popToTop();
	};

	return {
		headerLeft: () => <HeaderToggleMenuButton toggleNavbar={toggleDrawer} />,
		headerTitle: () => <HeaderLabel label={navData.navigation.getParam('myName')} />,
		headerRight: () => <HeaderGoBackButton onClick={goToHome} />
	};
};

const styles = StyleSheet.create({
	screen: {
		padding: 5,
		backgroundColor: colors.defaultBackground,
		height: '100%'
	},
	header: {
		marginVertical: 5
	},
	titleText: {
		color: 'white',
		textAlign: 'center',
		fontSize: 20,
		fontWeight: '600'
	},
	body: {
		height: '45%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	bodyText: {
		color: 'white',
		textAlign: 'center',
		fontSize: 20,
		fontWeight: '600'
	},
	button: {
		paddingVertical: 15,
		backgroundColor: colors.defaultDark,
		borderRadius: 10,
		width: 200,
		alignSelf: 'center',
		marginVertical: 20
	},
	buttonText: {
		color: 'white',
		textAlign: 'center',
		fontSize: 20,
		fontWeight: '600'
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	},
	openButton: {
		backgroundColor: "#F194FF",
		borderRadius: 20,
		padding: 10,
		elevation: 2
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center"
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center"
	}
});

export default TruthOrDareScreen;
