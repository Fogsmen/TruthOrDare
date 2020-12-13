import React from 'react';
import 'react-native-gesture-handler';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { MaterialIcons, FontAwesome, MaterialCommunityIcons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { Alert, Linking, LogBox, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import colors from '../constants/colors';
import InGameScreen from '../screens/InGameScreen';
import StartGameScreen from '../screens/StartGameScreen';
import TruthOrDareScreen from '../screens/TruthOrDareScreen';
import LanguageSettingScreen from '../screens/LanguageSettingScreen';
import { useSelector } from 'react-redux';

LogBox.ignoreLogs(['Your project is accessing the following APIs']);

const defaultNavOptions = {
	headerStyle: {
		backgroundColor: colors.defaultBackground,
	},
	headerTitleStyle: {
		width: '100%'
	},
	headerBackTitleStyle: {
		color: 'white'
	},
	headerBackTitle: null,
	headerTintColor: 'white'
};

const defaultDrawOptions = {
	contentOptions: {
		activeTintColor: 'white',
		inactiveTintColor: colors.grayPrimary,
		activeBackgroundColor: colors.defaultBackground
	},
	drawerBackgroundColor: colors.redPrimary,
	drawerWidth: 235
};

const GameNavigator = createStackNavigator({
	StartGame: {
		screen: StartGameScreen,
	},
	InGame: {
		screen: InGameScreen,
	},
	TruthOrDare: {
		screen: TruthOrDareScreen,
	}
}, {
	defaultNavigationOptions: defaultNavOptions
});

const SettingsNavigator = createStackNavigator({
	Language: LanguageSettingScreen
}, {
	defaultNavigationOptions: defaultNavOptions
});

const MainNavigator = createDrawerNavigator({
	Game: GameNavigator,
	Settings: SettingsNavigator
}, {
	...defaultDrawOptions,
	contentComponent: props => {
		const openContactUs = () => {
			const url = "https://www.sammakaruna.org/teacher-training/tantra-teacher-training-greece/";
			try {
				Linking.openURL(url);
			} catch(err) {
				Alert.alert('Error!', err.message, [{text: 'OK'}]);
			}
		};
		const goToLanguageSettingsScreen = () => {
			props.navigation.navigate('Settings');
		};
		const goToGame = () => {
			props.navigation.navigate('Game');
		};
		const getLang = useSelector(state => state.settings.getLang);
		return (
			<View style={{ flex: 1, paddingTop: 20 }}>
				<SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
					<View style={{marginVertical: 30, borderBottomWidth: 1.5, borderBottomColor: '#525150'}}>
						<Text style={{color: '#3b3a39', marginHorizontal: 10, fontSize: 15}}>{getLang('game')}</Text>
						<TouchableOpacity style={{flexDirection: 'row', padding: 10, margin: 5, alignItems: 'center'}}
							onPress={goToGame}>
							<FontAwesome name="users" size={26} color='white' />
							<Text style={{color: 'white', marginLeft: 8, fontWeight: 'bold'}}>{getLang('your_name')}</Text>
						</TouchableOpacity>
					</View>
					<View style={{marginBottom: 20, borderBottomWidth: 1.5, borderBottomColor: '#525150'}}>
						<Text style={{color: '#3b3a39', marginHorizontal: 10, fontSize: 15}}>{getLang('erotic_dares')}</Text>
						<TouchableOpacity style={{flexDirection: 'row', padding: 10, margin: 5, alignItems: 'center'}}>
							<FontAwesome name="heart-o" size={26} color="white" />
							<Text style={{color: 'white', marginLeft: 8, fontWeight: 'bold'}}>{getLang('right_hand_tantra')} ({getLang('soft')})</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{flexDirection: 'row', padding: 10, margin: 5, alignItems: 'center'}}>
							<MaterialCommunityIcons name="heart-flash" size={26} color="white" />
							<Text style={{color: 'white', marginLeft: 8, fontWeight: 'bold'}}>{getLang('left_hand_tantra')} ({getLang('hot')})</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{flexDirection: 'row', padding: 10, margin: 5, alignItems: 'center'}}>
							<FontAwesome5 name="hand-holding-heart" size={26} color="white" />
							<Text style={{color: 'white', marginLeft: 8, fontWeight: 'bold'}}>{getLang('my_dares')}</Text>
						</TouchableOpacity>
					</View>
					<View style={{marginBottom: 20, borderBottomWidth: 1.5, borderBottomColor: '#525150'}}>
						<Text style={{color: '#3b3a39', marginHorizontal: 10, fontSize: 15}}>{getLang('settings')}</Text>
						<TouchableOpacity style={{flexDirection: 'row', padding: 10, margin: 5, alignItems: 'center'}}
							onPress={goToLanguageSettingsScreen}>
							<MaterialIcons name="language" size={26} color="white" />
							<Text style={{color: 'white', marginLeft: 8, fontWeight: 'bold'}}>{getLang('language')}</Text>
						</TouchableOpacity>
					</View>
					<View style={{marginTop: 30}}>
						<TouchableOpacity style={{flexDirection: 'row', padding: 10, margin: 5, alignItems: 'center'}}
							onPress={openContactUs}>
							<AntDesign name="contacts" size={24} color="white" />
							<Text style={{color: 'white', marginLeft: 8, fontWeight: 'bold', fontSize: 12}}>{getLang('contact_us')}</Text>
						</TouchableOpacity>
					</View>
				</SafeAreaView>
			</View>
		);
	}
});

export default createAppContainer(MainNavigator);
