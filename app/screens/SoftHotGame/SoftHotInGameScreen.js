import React, { useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import Swiper from 'react-native-deck-swiper';

import HeaderToggleMenuButton from '../../components/HeaderToggleMenuButton';
import HeaderLabel from '../../components/HeaderLabel';
import HeaderGoBackButton from '../../components/HeaderGoBackButton';

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
	const couple = useSelector(state => state.game.couple);
	const type = props.navigation.getParam('type');
	const players = [{id: '1', name: couple[0]}, {id: '2', name: couple[1]}]
	const { lang, getLang } = useSelector(state => state.settings);

	const swiperRef = useRef();
	const cardMove = () => {
		swiperRef.current.swipeRight();
	};
	const rotateCount = Math.floor(Math.random() * 10) + 2;
	const goToDare = () => {
		props.navigation.navigate('SoftHotDare', {type: type, gender: (rotateCount%2)})
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
				keyExtractor={card => card.id}
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
