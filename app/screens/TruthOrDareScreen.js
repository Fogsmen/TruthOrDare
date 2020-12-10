import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 

import colors from '../constants/colors';

const ShotModal = props => {
	const closeModal = () => {
		props.closeModal();
	};

	return (
		<Modal animationType="slide" transparent={true} visible={props.visible}>
			<TouchableOpacity style={styles.centeredView} activeOpacity={1} onPressOut={closeModal}>
				<View style={styles.modalView}>
					<Text style={styles.modalText}>You have to drink</Text>
					<Text style={{fontWeight: 'bold', fontSize: 30}}>{props.shot}</Text>
					<Text style={{fontSize: 15, marginVertical: 20}}>shots</Text>
				</View>
			</TouchableOpacity>
		</Modal>
	);
};

const TruthOrDareScreen = props => {
	const type = props.navigation.getParam('type');
	const question = props.navigation.getParam('question');
	const [visibleModal, setVisibleModal] = useState(false);

	const goToHome = () => {
		props.navigation.popToTop();
	};
	const nextRound = () => {
		props.navigation.popToTop();
		props.navigation.navigate('Game');
	};
	const alertShot = () => {
		setVisibleModal(true);
	};
	const closeModal = () => {
		setVisibleModal(false);
	};

	return (
		<View style={styles.screen}>
			<View style={styles.header}>
				<TouchableOpacity style={{padding: 20}} onPress={goToHome}>
					<FontAwesome5 name="home" size={24} color="white" />
				</TouchableOpacity>
			</View>
			<View style={styles.title}>
				<Text style={styles.titleText}>{type=='truth' ? 'TRUTH' : 'DARE'}</Text>
			</View>
			<View style={styles.body}>
				<Text style={styles.bodyText}>{question.value}</Text>
				<TouchableOpacity style={{marginVertical: 20, padding: 5}} onPress={alertShot}>
					<FontAwesome5 name="glass-martini-alt" size={30} color="white" />
				</TouchableOpacity>
			</View>
			<TouchableOpacity style={styles.button} onPress={nextRound}>
				<Text style={styles.buttonText}>Next Round</Text>
			</TouchableOpacity>
			<ShotModal visible={visibleModal} closeModal={closeModal} shot={question.shot} />
		</View>
	);
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
		backgroundColor: '#212125',
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
