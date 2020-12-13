import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { useDispatch, useSelector } from 'react-redux';
import HeaderLabel from '../components/HeaderLabel';
import HeaderToggleMenuButton from '../components/HeaderToggleMenuButton';
import colors from '../constants/colors';
import * as SettingsAction from '../redux/actions/settings';
import { useEffect } from 'react/cjs/react.development';

const LanguageSettingScreen = props => {
	const { lang, getLang } = useSelector(state => state.settings);
	const dispatch = useDispatch();
	const setLang = lang => {
		dispatch(SettingsAction.setLanguage(lang));
	};
	useEffect(() => {
		props.navigation.setParams({title: getLang('language')});
	}, [lang]);

	return (
		<ImageBackground style={styles.image} source={require('../images/home-background.png')}>
			<View style={styles.screen}>
				<TouchableOpacity style={styles.item} onPress={() => setLang('en')}>
					<Text style={styles.itemText}>English</Text>
					{lang==='en' && <AntDesign name="checkcircle" size={26} color="white" style={{marginLeft: 10}} />}
				</TouchableOpacity>
				<TouchableOpacity style={styles.item} onPress={() => setLang('ru')}>
					<Text style={styles.itemText}>русский</Text>
					{lang==='ru' && <AntDesign name="checkcircle" size={26} color="white" style={{marginLeft: 10}} />}
				</TouchableOpacity>
				<TouchableOpacity style={styles.item} onPress={() => setLang('sp')}>
					<Text style={styles.itemText}>Española</Text>
					{lang==='sp' && <AntDesign name="checkcircle" size={26} color="white" style={{marginLeft: 10}} />}
				</TouchableOpacity>
			</View>
		</ImageBackground>
	);
};

LanguageSettingScreen.navigationOptions = navData => {
	const toggleDrawer = () => {
		navData.navigation.toggleDrawer();
	};

	return {
		headerLeft: () => <HeaderToggleMenuButton toggleNavbar={toggleDrawer} />,
		headerTitle: () => <HeaderLabel label={navData.navigation.getParam('title')} />,
	};
};

const styles = StyleSheet.create({
	screen: {
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		width: '100%',
		height: '100%',
		resizeMode: "cover",
		justifyContent: 'center'
	},
	item: {
		margin: 20,
		padding: 10,
		backgroundColor: colors.redPrimary,
		width: 160,
		alignItems: 'center',
		borderRadius: 10,
		borderColor: '#ccc',
		borderWidth: 2,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	itemText: {
		color: 'white',
		fontSize: 18,
		fontWeight: 'bold'
	}
});

export default LanguageSettingScreen;