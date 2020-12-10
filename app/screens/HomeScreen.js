import React, { useState } from 'react';
import { Alert, ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
		<ImageBackground source={require('../images/home-background.png')} style={styles.image}>
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
							style={styles.inputText}
						/>
					</View>
				</View>
				<TouchableOpacity style={styles.button} onPress={startGame}>
					<Text style={styles.buttonTxt}>Start The Game</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		</ImageBackground>
	);
};

HomeScreen.navigationOptions = navData => {
	const toggleDrawer = () => {
		navData.navigation.toggleDrawer();
	};

	return {
		headerLeft: () => <HeaderToggleMenuButton toggleNavbar={toggleDrawer} />,
		headerTitle: () => <HeaderLabel label="Your Name" />,
	};
};

const styles = StyleSheet.create({
	screen: {
		padding: 5,
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%'
	},
	image: {
		height: '100%',
		width: '100%',
		resizeMode: "cover",
		justifyContent: "center",
		alignSelf: 'center'
	},
	input: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		height: 50,
		marginVertical: 5,
		borderRadius: 10,
		borderColor: colors.redPrimary,
		borderWidth: 1,
		width: 250
	},
	inputText: {
		color: 'white'
	},
	formIcon: {
		backgroundColor: colors.redPrimary,
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
		backgroundColor: colors.redPrimary,
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