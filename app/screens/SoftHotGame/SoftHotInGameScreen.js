import React, { useEffect } from 'react';
import { useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, LogBox } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Roulette from 'react-native-roulette';

import HeaderToggleMenuButton from '../../components/HeaderToggleMenuButton';
import HeaderLabel from '../../components/HeaderLabel';
import HeaderGoBackButton from '../../components/HeaderGoBackButton';

import * as GameHelper from '../../helpers/GameHelper';
import * as GameService from '../../services/GameService';

const GoButton = props => {
	return (
		<TouchableOpacity onPress={props.onPress} style={styles.gobutton}>
			<Text style={styles.gobuttontxt}>GO</Text>
		</TouchableOpacity>
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
				setFinished(false);
				setIsRolling(false);
				goToDare();
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
					renderCenter={() => isRolling ? <SmallCircle /> : <GoButton onPress={startRotate} />}
					customStyle={styles.roulette}
					><TodCard title="TRUTH" />
					<TodCard title="DARE" />
				</Roulette>
			}
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
		backgroundColor: '#D9B4FA',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%'
	},
	gobutton: {
		width: 80,
		height: 80,
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F500DA',
	},
	gobuttontxt: {
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
		backgroundColor: '#F500DA',
		borderWidth: 3,
		borderColor: '#FA40F0'
	},
	todcardtxt: {
		fontWeight: 'bold',
		fontSize: 15,
		color: 'white'
	},
	roulette: {
		backgroundColor: '#CAAAF5'
	},
	resultcard: {
		width: 150,
		height: 150,
		borderRadius: 150,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F500DA',
		borderColor: '#FA40F0',
		borderWidth: 8
	},
	resultcardtxt: {
		fontSize: 28,
		fontWeight: 'bold',
		color: 'white'
	}
});

export default SoftHotInGameScreen;
