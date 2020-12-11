import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import * as GameService from '../services/GameService';
import colors from '../constants/colors';
import HeaderToggleMenuButton from '../components/HeaderToggleMenuButton';
import HeaderLabel from '../components/HeaderLabel';
import HeaderGoBackButton from '../components/HeaderGoBackButton';

const InGameScreen = props => {
	const players = useSelector(state => state.game.players);
	const currentPlayer = players[Math.floor(Math.random() * players.length)];
	const selectedGameType = useSelector(state => state.game.selectedGameType);
	const { questions, dares } = GameService.QuestionDares(selectedGameType);

	const goToTruth = () => {
		const question = questions[Math.floor(Math.random() * questions.length)];
		props.navigation.navigate('TruthOrDare', {type: 'truth', question: question});
	};
	const goToDare = () => {
		const dare = dares[Math.floor(Math.random() * dares.length)];
		props.navigation.navigate('TruthOrDare', {type: 'dare', question: dare});
	};

	return (
		<View style={styles.screen}>
			<View style={styles.title}>
				<Text style={styles.titleText}>Whoopsie!</Text>
			</View>
			<View style={styles.body}>
				<Text style={styles.bodyText}>It's {currentPlayer.name}</Text>
			</View>
			<View style={styles.buttons}>
				<TouchableOpacity style={styles.truth} onPress={goToTruth}>
					<Text style={styles.truthText}>TRUTH</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.dare} onPress={goToDare}>
					<Text style={styles.dareText}>DARE</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

InGameScreen.navigationOptions = navData => {
	const toggleDrawer = () => {
		navData.navigation.toggleDrawer();
	};
	const goToHome = () => {
		navData.navigation.goBack();
	};

	return {
		headerLeft: () => <HeaderToggleMenuButton toggleNavbar={toggleDrawer} />,
		headerTitle: () => <HeaderLabel label="Game" />,
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
	buttons: {
		marginVertical: 10
	},
	truth: {
		paddingVertical: 15,
		backgroundColor: 'white',
		borderRadius: 10,
		width: 200,
		alignSelf: 'center',
		marginVertical: 10
	},
	truthText: {
		color: colors.defaultDark,
		textAlign: 'center',
		fontSize: 20,
		fontWeight: '600'
	},
	dare: {
		paddingVertical: 15,
		backgroundColor: colors.defaultDark,
		borderRadius: 10,
		width: 200,
		alignSelf: 'center',
		marginVertical: 10
	},
	dareText: {
		color: 'white',
		textAlign: 'center',
		fontSize: 20,
		fontWeight: '600'
	}
});

export default InGameScreen;
