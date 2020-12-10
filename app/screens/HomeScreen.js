import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import colors from '../constants/colors';
import * as authAction from '../redux/actions/auth';
import HeaderToggleMenuButton from '../components/HeaderToggleMenuButton';
import HeaderLabel from '../components/HeaderLabel';

const HomeScreen = props => {
	const [myName, setMyName] = useState('');
	const dispatch = useDispatch();

	const inputChangeHandle = txt => {
		setMyName(txt);
	};
	const startGame = () => {
		if(myName.trim().length === 0) {
			Alert.alert('Error', 'No empty name is allowed!', [{text: 'OK'}]);
			return;
		}
		dispatch(authAction.setUserName(myName));
		props.navigation.navigate('Game');
	};

	return (
		<KeyboardAvoidingView style={styles.screen}>
			<View style={styles.input}>
				<View style={styles.formIcon}>
					<FontAwesome name="user" size={24} color="white" />
				</View>
				<View style={styles.formInput}>
					<TextInput placeholder="Your name"
						value={myName}
						onChangeText={inputChangeHandle}
						autoFocus={true}
					/>
				</View>
			</View>
			<TouchableOpacity style={styles.button} onPress={startGame}>
				<Text style={styles.buttonTxt}>Start The Game</Text>
			</TouchableOpacity>
		</KeyboardAvoidingView>
	);
};

HomeScreen.navigationOptions = navData => {
	const toggleDrawer = () => {
		navData.navigation.toggleDrawer();
	};

	return {
		headerLeft: () => <HeaderToggleMenuButton toggleNavbar={toggleDrawer} />,
		headerTitle: () => <HeaderLabel label="Your Name" />,
		headerRight: null
	};
};

const styles = StyleSheet.create({
	screen: {
		padding: 5,
		backgroundColor: colors.defaultBackground,
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%'
	},
	input: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		height: 50,
		marginVertical: 5,
		borderRadius: 10,
		borderColor: colors.darkPrimary,
		borderWidth: 1,
		width: 250
	},
	formIcon: {
		backgroundColor: colors.darkPrimary,
		width: 50,
		height: 50,
		padding: 5,
		marginRight: 5,
		justifyContent: 'center',
		alignItems: 'center',
		borderTopStartRadius: 10,
		borderBottomStartRadius: 10
	},
	button: {
		marginVertical: 15,
		paddingVertical: 10,
		width: 200,
		backgroundColor: colors.defaultDark,
		borderRadius: 10
	},
	buttonTxt: {
		fontWeight: 'bold',
		fontSize: 20,
		color: 'white',
		textAlign: 'center'
	}
});

export default HomeScreen;