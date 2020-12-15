import React, { useEffect, useState } from 'react';
import { Alert, ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useDispatch, useSelector } from 'react-redux';
import * as GameAction from '../../redux/actions/game';
import colors from '../../constants/colors';
import HeaderLabel from '../../components/HeaderLabel';
import HeaderToggleMenuButton from '../../components/HeaderToggleMenuButton';

const NameBoxRow = props => {
	const gender = props.gender;
	const lang = useSelector(state => state.settings.getLang);
	return (
		<View style={styles.nameBox}>
			<Text style={{color: 'white'}}>{gender==='male' ? lang('mans_name') : lang('womans_name')}</Text>
			<View style={styles.nameBoxInputRow}>
				<View style={styles.nameBoxformIcon}>
					<MaterialCommunityIcons name={`gender-${gender}`} size={24} color="white" />
				</View>
				<TextInput placeholder={gender==='male' ? lang('mans_name') : lang('womans_name')}
					style={{color: 'white'}}
					value={props.value}
					onChangeText={props.onChange}
				/>
			</View>
		</View>
	);
};

const NameBox = props => {
	const { male, maleChange, female, femaleChange } = props;
	return (
		<View style={{padding: 1}}>
			<NameBoxRow gender="female" value={male} onChange={maleChange} />
			<NameBoxRow gender="male" value={female} onChange={femaleChange} />
		</View>
	);
};

const SoftHotStartScreen = props => {
	const couple = useSelector(state => state.game.couple);
	const lang = useSelector(state => state.settings.getLang);
	const dispatch = useDispatch();
	const type = props.navigation.getParam('type');
	useEffect(() => {
		props.navigation.setParams({title: lang(type)});
	}, [lang]);

	const goToGame = () => {
		if(maleName.trim().length===0 || femaleName.trim().length===0) {
			Alert.alert('Error!', 'No empty name is allowed!', [{text: 'Ok'}]);
			return;
		}
		dispatch(GameAction.setCoupleNames(maleName, femaleName));
		props.navigation.navigate('SoftHotInGame', {type: type});
	};

	const [maleName, setMaleName] = useState(couple.male ?? '');
	const [femaleName, setFemaleName] = useState(couple.female ?? '');
	const maleNameInputHandle = txt => {
		setMaleName(txt);
	};
	const femaleNameInputHandle = txt => {
		setFemaleName(txt);
	};

	if(type==='hot') {
		return (
			<View style={{flex:1, justifyContent: 'center', alignItems: 'center', padding: 20}}>
				<Text style={{fontSize: 20, fontWeight: 'bold'}}>You need to pay to play this game, first</Text>
			</View>
		);
	}

	return (
		<ImageBackground style={styles.image} source={require('../../images/home-background.png')}>
			<KeyboardAvoidingView style={styles.screen}>
				<NameBox male={maleName} maleChange={maleNameInputHandle}
					female={femaleName} femaleChange={femaleNameInputHandle}
				/>
				<TouchableOpacity onPress={goToGame} style={styles.playerButton}>
					<FontAwesome5 name="play" size={24} color="white" />
					<Text style={styles.playText}>{lang('start_game')}</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		</ImageBackground>
	);
};

SoftHotStartScreen.navigationOptions = navData => {
	const toggleDrawer = () => {
		navData.navigation.toggleDrawer();
	};

	return {
		headerLeft: () => <HeaderToggleMenuButton toggleNavbar={toggleDrawer} />,
		headerTitle: () => <HeaderLabel label={navData.navigation.getParam('title')} />,
	};
};

const styles = StyleSheet.create({
	image: {
		width: '100%',
		resizeMode: "cover",
		justifyContent: 'center'
	},
	screen: {
		padding: 20,
		justifyContent: 'center',
		height: '100%'
	},
	playerRow: {
		flexDirection: 'row',
		borderBottomColor: 'white',
		borderBottomWidth: 2,
		paddingTop: 20,
		paddingHorizontal: 5,
		paddingBottom: 8,
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	playerRowText: {
		fontSize: 20,
		fontWeight: '600',
		color: 'white'
	},
	playersContainer: {
		padding: 5,
		marginVertical: 10
	},
	addPlayer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderBottomWidth: 2,
		borderColor: 'white',
	},
	palyerName: {
		color: 'white',
		fontSize: 20,
		paddingVertical: 5,
		paddingHorizontal: 10,
	},
	playerButton: {
		marginVertical: 20,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.redPrimary,
		width: 250,
		alignSelf: 'center',
		paddingVertical: 12,
		borderRadius: 10
	},
	playText: {
		color: 'white',
		fontSize: 19,
		marginHorizontal: 10
	},
	multiplayer: {
		padding: 5
	},
	typeTab: {
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	typeItem: {
		padding: 5,
		alignItems: 'center',
		backgroundColor: colors.redPrimary,
		width: 65,
		borderRadius: 10,
	},
	typeItemText: {
		fontSize: 12,
		color: 'white'
	},
	multiButton: {
		marginBottom: 10,
		alignSelf: 'center'
	},
	nameBox: {
		padding: 5,
		margin: 5,
		alignItems: 'center',
	},
	nameBoxInputRow: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		backgroundColor: colors.redPrimary,
		borderRadius: 10,
		width: '90%'
	},
	nameBoxformIcon: {
		backgroundColor: colors.redPrimary,
		width: 50,
		height: 50,
		padding: 5,
		justifyContent: 'center',
		alignItems: 'center',
		borderTopStartRadius: 10,
		borderBottomStartRadius: 10
	},
});

export default SoftHotStartScreen;