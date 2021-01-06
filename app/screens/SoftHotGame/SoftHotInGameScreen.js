import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, LogBox, TouchableNativeFeedback } from 'react-native';
import { useSelector } from 'react-redux';
import Roulette from 'react-native-roulette';

import HeaderToggleMenuButton from '../../components/HeaderToggleMenuButton';
import HeaderLabel from '../../components/HeaderLabel';
import HeaderGoBackButton from '../../components/HeaderGoBackButton';

import * as GameHelper from '../../helpers/GameHelper';
import * as GameService from '../../services/GameService';

const InnerCircle = props => {
	return (
		<View style={styles.centerbutton}>
			<Text style={styles.centerbuttontext}>?</Text>
		</View>
	);
};

const ResultCircle = props => {
	return (
		<View style={styles.resultcard}>
			<Text style={styles.resultcardtxt}>{props.title}</Text>
		</View>
	);
};

const SmallCircle = props => {
	return (
		<View style={{width: 60, height: 60, borderRadius: 60, backgroundColor: '#EE5A24', justifyContent: 'center', alignItems: 'center'}}>
			<View style={{width: 40, height: 40, borderRadius: 40, backgroundColor: '#D980FA', justifyContent: 'center', alignItems: 'center'}}>
				<View style={{width: 20, height: 20, borderRadius: 20, backgroundColor: '#EA2027', justifyContent: 'center', alignItems: 'center'}} />
			</View>
		</View>
	);
};

const TodCard = props => {
	return (
		<View style={styles.todcard}>
			<Text style={styles.todcardtxt}>{props.title}</Text>
		</View>
	);
};

const SoftHotInGameScreen = props => {
	const coupleNames = useSelector(state => state.game.couple);
	const type = props.navigation.getParam('type');
	const { lang, getLang } = useSelector(state => state.settings);
	const flag = useRef(false);

	const [currentPlayer, setCurrentPlayer] = useState(0);
	const dares = [GameService.getCoupleDares(lang, type, 0), GameService.getCoupleDares(lang, type, 1)];
	const questions = [GameService.getCoupleQuestions(lang, type, 0), GameService.getCoupleQuestions(lang, type, 0)];

	const [daresIds, setDaresIds] = useState([[], []]);
	const [questionsIds, setQuestionsIds] = useState([[], []]);
	const [finished, setFinished] = useState(false);
	const [isRolling, setIsRolling] = useState(false);

	const circleRef = useRef();

	useEffect(() => {
		LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
	}, []);

	useEffect(() => {
		flag.current = false;
		setDaresIds([dares[0].map(x => x.id), dares[1].map(x => x.id)]);
		setQuestionsIds([questions[0].map(x => x.id), questions[1].map(x => x.id)]);

		return () => {
			flag.current = true;
		};
	}, [setDaresIds, setQuestionsIds]);

	const rotateCount = GameHelper.GenerateRandomInteger(3, 7);
	const makeAction = () => {
		let sentence = '';

		if((rotateCount) % 3 > 0) {
			const i = questionsIds[currentPlayer][GameHelper.GenerateRandomInteger(0, questionsIds[currentPlayer].length)];
			let newIds = questionsIds;
			newIds[currentPlayer] = questionsIds[currentPlayer].filter(x => x !== i);
			setQuestionsIds(newIds, rotateCount);
			sentence = questions[currentPlayer].filter(x => x.id === i)[0].value.replace(/userName/g, coupleNames[currentPlayer]);
		} else {
			const i = daresIds[currentPlayer][GameHelper.GenerateRandomInteger(0, daresIds[currentPlayer].length)];
			let newIds = daresIds;
			newIds[currentPlayer] = daresIds[currentPlayer].filter(x => x !== i);
			setDaresIds(newIds);
			sentence = dares[currentPlayer].filter(x => x.id === i)[0].value.replace(/userName/g, coupleNames[currentPlayer]);
		}
		setCurrentPlayer(1 - currentPlayer);

		return sentence;
	};
	const goToDare = () => {
		const action = makeAction();
		props.navigation.navigate('SoftHotDare', {type: type, action: action});
	};
	const rotateCard = () => {
		circleRef.current.panResponder.panHandlers.onResponderRelease();
	};
	const rotate = cnt => {
		if(flag.current) return;
		if(cnt <= 0) {
			setFinished(true);
			setTimeout(() => {
				goToDare();
				setFinished(false);
				setIsRolling(false);
			}, 1000);
			return;
		}
		rotateCard();
		setTimeout(() => {
			rotate(cnt - 1);
		}, 480);
	};
	const startRotate = () => {
		setIsRolling(true);
		rotate(rotateCount * 2);
	};

	return (
		<SafeAreaView style={styles.screen}>
			{finished ? <ResultCircle title={(rotateCount%3) > 0 ? 'TRUTH' : 'DARE'} /> :
				<Roulette
					ref={circleRef}
					rouletteRotate={0} enableUserRotate
					distance={100}
					radius={300}
					renderCenter={() => isRolling ? <SmallCircle /> : <InnerCircle />}
					customStyle={styles.roulette}
					><TodCard title="TRUTH" />
					<TodCard title="DARE" />
				</Roulette>
			}
			<TouchableOpacity style={styles.gobutton} onPress={startRotate} disabled={isRolling}>
				<View style={styles.gobuttoninner}>
					<Text style={styles.gobuttontext}>GO</Text>
				</View>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

SoftHotInGameScreen.navigationOptions = navData => {
	const toggleDrawer = () => {
		navData.navigation.toggleDrawer();
	};
	const goToHome = () => {
		navData.navigation.goBack();
	};

	return {
		headerLeft: () => <HeaderToggleMenuButton toggleNavbar={toggleDrawer} />,
		headerTitle: () => <HeaderLabel label="Intimidades – The Tantra  game" />,
		headerRight: () => <HeaderGoBackButton onClick={goToHome} />
	};
};

const styles = StyleSheet.create({
	screen: {
		padding: 5,
		backgroundColor: '#FF683C',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%'
	},
	centerbutton: {
		width: 60,
		height: 60,
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#8224F5',
		borderColor: '#7F2CF5',
		borderWidth: 3,
	},
	centerbuttontext: {
		fontSize: 30,
		fontWeight: 'bold',
		color: 'white'
	},
	todcard: {
		borderRadius: 50,
		width: 90,
		height: 90,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#8224F5',
		borderWidth: 3,
		borderColor: '#7F2CF5'
	},
	todcardtxt: {
		fontWeight: 'bold',
		fontSize: 15,
		color: 'white'
	},
	roulette: {
		backgroundColor: '#FF3E26'
	},
	resultcard: {
		width: 150,
		height: 150,
		borderRadius: 150,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#8224F5',
		borderColor: '#7F2CF5',
		borderWidth: 8
	},
	resultcardtxt: {
		fontSize: 28,
		fontWeight: 'bold',
		color: 'white'
	},
	gobutton: {
		marginTop: 30,
		width: 150,
		height: 80,
		borderRadius: 50,
		backgroundColor: '#8224F5',
		justifyContent: 'center',
		alignItems: 'center'
	},
	gobuttoninner: {
		width: 145,
		height: 75,
		borderRadius: 50,
		borderColor: '#ffffff',
		borderWidth: 2,
		backgroundColor: '#753BF7',
		justifyContent: 'center',
		alignItems: 'center'
	},
	gobuttontext: {
		color: 'white',
		fontSize: 30,
		fontWeight: 'bold',
		backgroundColor: '#7328FA',
		width: 132,
		height: 63,
		borderWidth: 3,
		borderColor: '#ffffff',
		textAlign: 'center',
		textAlignVertical: 'center',
		borderRadius: 50
	}
});

export default SoftHotInGameScreen;
