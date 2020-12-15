import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import colors from '../../constants/colors';
import HeaderToggleMenuButton from '../../components/HeaderToggleMenuButton';
import HeaderLabel from '../../components/HeaderLabel';
import HeaderGoBackButton from '../../components/HeaderGoBackButton';
import * as GameService from '../../services/GameService';

const SoftHotDareScreen = props => {
	const type = props.navigation.getParam('type');
	const { lang, getLang } = useSelector(state => state.settings);
	const gender = props.navigation.getParam('gender');
	const name = useSelector(state => state.game.couple)[gender];
	const action = GameService.getCoupleSentence(lang, type, gender).value.replace('userName', name);

	useEffect(() => {
		props.navigation.setParams({title: getLang(type)});
	}, [lang, getLang, type]);

	const goToNextDare = () => {
		props.navigation.popToTop();
		props.navigation.navigate('SoftHotInGame', {type: type})
	};

	return (
		<View style={styles.screen}>
			<View style={{...styles.section, flexDirection: 'row'}}>
				<MaterialCommunityIcons name="play-circle-outline" size={30} color="white" />
				<Text style={styles.timerText}>00:15</Text>
			</View>
			<View style={{...styles.section, paddingHorizontal: 20}}>
				<Text style={styles.bodyText}>{action}</Text>
			</View>
			<View style={{...styles.section}}>
				<TouchableOpacity style={styles.button} onPress={goToNextDare}>
					<Text style={styles.buttonText}>{getLang('next_dare')}</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

SoftHotDareScreen.navigationOptions = navData => {
	const toggleDrawer = () => {
		navData.navigation.toggleDrawer();
	};
	const goToHome = () => {
		navData.navigation.popToTop();
	};

	return {
		headerLeft: () => <HeaderToggleMenuButton toggleNavbar={toggleDrawer} />,
		headerTitle: () => <HeaderLabel label={navData.navigation.getParam('title')} />,
		headerRight: () => <HeaderGoBackButton onClick={goToHome} />
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 5,
		backgroundColor: colors.defaultBackground,
		justifyContent: 'center',
		alignItems: 'center',
	},
	section: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	timerText: {
		fontWeight: 'bold',
		color: 'white',
		fontSize: 24,
		marginLeft: 10
	},
	bodyText: {
		fontWeight: '800',
		color: 'white',
		fontSize: 15
	},
	button: {
		borderRadius: 5,
		paddingHorizontal: 50,
		paddingVertical: 10,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#8500FA'
	},
	buttonText: {
		fontWeight: '800',
		fontSize: 25,
		color: 'white'
	},
});

export default SoftHotDareScreen;
