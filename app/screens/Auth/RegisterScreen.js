import React, { useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useDispatch } from 'react-redux';
import colors from '../../constants/colors';
import HeaderLabel from '../../components/HeaderLabel';
import HeaderToggleMenuButton from '../../components/HeaderToggleMenuButton';
import * as AuthAction from '../../redux/actions/auth';

const RegisterScreen = props => {
	const dispatch = useDispatch();
	const [form, setForm] = useState({
		email: '',
		name: '',
		password: '',
		confirmPassword: ''
	});
	const [isLoading, setIsLoading] = useState(false);

	const inputHandler = (id, txt) => {
		setForm({
			...form,
			[id]: txt
		});
	};

	const goToLogin = () => {
		props.navigation.replace('Login');
	};
	const register = () => {
		if(form.email.length===0 || form.name.length===0 || form.password.length===0 || form.confirmPassword != form.password) {
			Alert.alert('Error', 'Please input valid data', [{text: 'OK'}]);
			return;
		}
		setIsLoading(true);
		dispatch(AuthAction.register(form.email, form.name, form.password)).then(() => {
			props.navigation.navigate('MyDares');
		}).catch(err => {
			setIsLoading(false);
			Alert.alert('Error', err.message, [{text: 'OK'}]);
		});
	};

	if(isLoading) {
		return (
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<ActivityIndicator size="large" color="#192a56" />
			</View>
		);
	}

	return (
		<KeyboardAvoidingView style={styles.screen}>
			<ScrollView>
				<View style={styles.nameBox}>
					<View style={styles.nameBoxInputRow}>
						<View style={styles.nameBoxformIcon}>
							<MaterialCommunityIcons name="email" size={24} color="white" />
						</View>
						<TextInput placeholder="E-mail Address"
							placeholderTextColor="#b2bec3"
							style={{color: 'white', width: '75%', paddingHorizontal: 10}}
							keyboardType="email-address"
							value={form.email}
							autoCapitalize="none"
							onChangeText={inputHandler.bind(this, 'email')}
						/>
					</View>
					<View style={styles.nameBoxInputRow}>
						<View style={styles.nameBoxformIcon}>
							<FontAwesome5 name="user-alt" size={24} color="white" />
						</View>
						<TextInput placeholder="Name"
							placeholderTextColor="#b2bec3"
							style={{color: 'white', width: '75%', paddingHorizontal: 10}}
							value={form.name}
							onChangeText={inputHandler.bind(this, 'name')}
						/>
					</View>
					<View style={styles.nameBoxInputRow}>
						<View style={styles.nameBoxformIcon}>
							<FontAwesome5 name="key" size={24} color="white" />
						</View>
						<TextInput placeholder="Password"
							placeholderTextColor="#b2bec3"
							style={{color: 'white', width: '75%', paddingHorizontal: 10}}
							secureTextEntry={true}
							autoCapitalize="none"
							value={form.password}
							onChangeText={inputHandler.bind(this, 'password')}
						/>
					</View>
					<View style={styles.nameBoxInputRow}>
						<View style={styles.nameBoxformIcon}>
							<FontAwesome5 name="key" size={24} color="white" />
						</View>
						<TextInput placeholder="Confirm password"
							placeholderTextColor="#b2bec3"
							style={{color: 'white', width: '75%', paddingHorizontal: 10}}
							secureTextEntry={true}
							autoCapitalize="none"
							value={form.confirmPassword}
							onChangeText={inputHandler.bind(this, 'confirmPassword')}
						/>
					</View>
				</View>
				<TouchableOpacity onPress={register}
					style={styles.playerButton}>
					<Text style={styles.playText}>REGISTER</Text>
					<MaterialCommunityIcons name="login" size={24} color="white" />
				</TouchableOpacity>
				<TouchableOpacity onPress={goToLogin}
					style={{paddingVertical: 5, paddingHorizontal: 20}}>
					<Text style={styles.link}>Login</Text>
				</TouchableOpacity>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

RegisterScreen.navigationOptions = navData => {
	const toggleDrawer = () => {
		navData.navigation.toggleDrawer();
	};

	return {
		headerLeft: () => <HeaderToggleMenuButton toggleNavbar={toggleDrawer} />,
		headerTitle: () => <HeaderLabel label="Intimidades – The Tantra  game" />,
	};
};

const styles = StyleSheet.create({
	screen: {
		padding: 20,
		justifyContent: 'center',
		height: '100%',
		backgroundColor: '#ff7675'
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
		marginTop: 18,
		marginBottom: 10,
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
		marginHorizontal: 10,
		fontWeight: 'bold'
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
		width: '90%',
		marginVertical: 10
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
	link: {
		marginVertical: 20,
		textAlign: 'center',
		fontSize: 16,
		color: '#dff9fb'
	}
});

export default RegisterScreen;