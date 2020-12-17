import React, { useEffect } from 'react';
import { useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Swiper from 'react-native-deck-swiper';

import HeaderToggleMenuButton from '../../components/HeaderToggleMenuButton';
import HeaderLabel from '../../components/HeaderLabel';
import HeaderGoBackButton from '../../components/HeaderGoBackButton';

import * as GameHelper from '../../helpers/GameHelper';
import * as GameService from '../../services/GameService';
import * as GameAction from '../../redux/actions/game';

const cardColors = ['#EC2379', '#9001F0' ,'#F5C518', '#F7B402', '#FAA699', '#0070FF'];
const localColors = {
	background: '#fcf',
	truth: '#AB01FA',
	dare: '#F52FC5'
};

const PlayerCard = props => {
	const width = props.width ?? 150;
	const height = props.height ?? 100;
	const { card, cardIndex } = props;

	return (
		<View style={{...styles.playerCard, width: width, height: height, backgroundColor: cardColors[(cardIndex ?? 0)%cardColors.length]}}>
			<Text style={styles.cardText}>{card.name}</Text>
		</View>
	);
};

const SoftHotInGameScreen = props => {
	const coupleNames = useSelector(state => state.game.couple);
	const type = props.navigation.getParam('type');
	const { lang, getLang } = useSelector(state => state.settings);
	const players = [{id: '1', name: getLang('truth')}, {id: '2', name: getLang('dare')}];

	const [curCard, setCurCard] = useState(0);
	const [currentPlayer, setCurrentPlayer] = useState(0);
	const dares = [GameService.getCoupleDares(lang, type, 0), GameService.getCoupleDares(lang, type, 1)];
	const questions = [GameService.getCoupleQuestions(lang, type, 0), GameService.getCoupleQuestions(lang, type, 0)];

	const [daresIds, setDaresIds] = useState([[], []]);
	const [questionsIds, setQuestionsIds] = useState([[], []]);

	useEffect(() => {
		setDaresIds([dares[0].map(x => x.id), dares[1].map(x => x.id)]);
		setQuestionsIds([questions[0].map(x => x.id), questions[1].map(x => x.id)]);
	}, [setDaresIds, setQuestionsIds]);

	const swiperRef = useRef();
	const cardMove = () => {
		swiperRef.current.swipeRight();
	};
	const rotateCount = GameHelper.GenerateRandomInteger(3, 10);

	const makeAction = () => {
		let sentence = '';

		if((rotateCount + curCard) % 2 === 0) {
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
		setCurCard((rotateCount + curCard) % 2);

		return sentence;
	};

	const goToDare = () => {
		const action = makeAction();
		props.navigation.navigate('SoftHotDare', {type: type, action: action});
	};
	const timeout = 250;
	const rotateByCount = current => {
		if(current >= rotateCount) {
			setTimeout(() => {
				goToDare();
			}, 300);
			return;
		}
		cardMove();
		setTimeout(() => {
			rotateByCount(current + 1);
		}, timeout);
	};
	const rotate = () => {
		rotateByCount(0);
	};

	return (
		<SafeAreaView style={styles.screen}>
			<Swiper
				ref={swiperRef} cards={players}
				keyExtractor={card => card.id} cardIndex={0}
				renderCard={(player, i) => <PlayerCard card={player} cardIndex={i} />}
				infinite={true} swipeAnimationDuration={timeout-30}
				backgroundColor={'transparent'}
				cardVerticalMargin={50}
				stackSize={2}
				animateOverlayLabelsOpacity animateCardOpacity
				disableTopSwipe={true} disableBottomSwipe={true}
				disableLeftSwipe={true} disableRightSwipe={true}
				horizontalSwipe={false} verticalSwipe={false}
			/>
			<TouchableOpacity style={styles.goButton} onPress={rotate}>
				<View styles={{padding: 20}}>
					<Text style={{fontWeight: 'bold', fontSize: 20, color: 'white'}}>{getLang('go')}</Text>
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
		headerTitle: () => <HeaderLabel label="Game" />,
		headerRight: () => <HeaderGoBackButton onClick={goToHome} />
	};
};

const styles = StyleSheet.create({
	screen: {
		padding: 5,
		backgroundColor: localColors.background,
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%'
	},
	playerCard: {
		borderRadius: 12,
		shadowRadius: 25,
		shadowColor: 'black',
		shadowOpacity: 0.08,
		shadowOffset: { width: 0, height: 0 },
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center'
	},
	cardText: {
		fontWeight: 'bold',
		fontSize: 20,
		color: 'white'
	},
	goButton: {
		marginTop: 100,
		justifyContent: 'center',
		alignItems: 'center',
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: '#F08A00',
		borderColor: 'white',
		borderWidth: 1.5
	}
});

export default SoftHotInGameScreen;
