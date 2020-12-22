import React from 'react';
import 'react-native-gesture-handler';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { MaterialIcons, FontAwesome, MaterialCommunityIcons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { Alert, Linking, LogBox, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import colors from '../constants/colors';
import InGameScreen from '../screens/NormalGame/InGameScreen';
import StartGameScreen from '../screens/NormalGame/StartGameScreen';
import TruthOrDareScreen from '../screens/NormalGame/TruthOrDareScreen';
import LanguageSettingScreen from '../screens/Settings/LanguageSettingScreen';
import { useSelector } from 'react-redux';
import DiceGameScreen from '../screens/DiceGameScreen';
import SoftHotStartScreen from '../screens/SoftHotGame/SoftHotStartScreen';
import SoftHotInGameScreen from '../screens/SoftHotGame/SoftHotInGameScreen';
import SoftHotDareScreen from '../screens/SoftHotGame/SoftHotDareScreen';
import RateReviewScreen from '../screens/RateReviewScreen';

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
	drawerWidth: 255
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

const SoftHotGameNavigator = createStackNavigator({
	SoftHotStart: {
		screen: SoftHotStartScreen
	},
	SoftHotInGame: {
		screen: SoftHotInGameScreen
	},
	SoftHotDare: {
		screen: SoftHotDareScreen
	}
}, {
	defaultNavigationOptions: defaultNavOptions
});

const SettingsNavigator = createStackNavigator({
	Language: LanguageSettingScreen
}, {
	defaultNavigationOptions: defaultNavOptions
});

const DiceGameNavigator = createStackNavigator({
	Dice: DiceGameScreen
}, {
	defaultNavigationOptions: defaultNavOptions
});

const RateReviewNavigator = createStackNavigator({
	RateReview: RateReviewScreen
}, {
	defaultNavigationOptions: defaultNavOptions
});

const MainNavigator = createDrawerNavigator({
	Game: GameNavigator,
	Settings: SettingsNavigator,
	DiceGame: DiceGameNavigator,
	SoftCouple: SoftHotGameNavigator,
	HotCouple: SoftHotGameNavigator,
	RateReview: RateReviewNavigator
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
		const openLearnMore = () => {
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
		const goToDiceGame = () => {
			props.navigation.navigate('DiceGame');
		};
		const goToSoftCouple = () => {
			props.navigation.navigate('SoftCouple', {}, {
				type: 'Navigation/NAVIGATE',
				routeName: 'SoftHotStart',
				params: {type: 'soft'},
			});
		};
		const goToHotCouple = () => {
			props.navigation.navigate('HotCouple', {}, {
				type: 'Navigation/NAVIGATE',
				routeName: 'SoftHotStart',
				params: {type: 'hot'},
			});
		};
		const goToRateReview = () => {
			props.navigation.navigate('RateReview');
		};
		const getLang = useSelector(state => state.settings.getLang);
		return (
			<ScrollView style={{ paddingTop: 15 }}>
				<SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
					<View style={{marginVertical: 15, borderBottomWidth: 1.5, borderBottomColor: '#525150'}}>
						<Text style={{color: '#3b3a39', marginHorizontal: 10, fontSize: 15}}>{getLang('game')}</Text>
						<TouchableOpacity style={{flexDirection: 'row', padding: 10, margin: 5, alignItems: 'center'}}
							onPress={goToGame}>
							<FontAwesome name="users" size={26} color='white' />
							<Text style={{color: 'white', marginLeft: 8, fontWeight: 'bold'}}>{getLang('your_name')}</Text>
						</TouchableOpacity>
					</View>
					<View style={{marginBottom: 15, borderBottomWidth: 1.5, borderBottomColor: '#525150'}}>
						<Text style={{color: '#3b3a39', marginHorizontal: 10, fontSize: 15}}>{getLang('erotic_dares')}</Text>
						<TouchableOpacity style={{flexDirection: 'row', padding: 10, margin: 5, alignItems: 'center'}}
							onPress={goToSoftCouple}>
							<FontAwesome name="heart-o" size={26} color="white" />
							<Text style={{color: 'white', marginLeft: 8, fontWeight: 'bold'}}>{getLang('right_hand_tantra')} ({getLang('soft')})</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{flexDirection: 'row', padding: 10, margin: 5, alignItems: 'center'}}
							onPress={goToHotCouple}>
							<MaterialCommunityIcons name="heart-flash" size={26} color="white" />
							<Text style={{color: 'white', marginLeft: 8, fontWeight: 'bold'}}>{getLang('left_hand_tantra')} ({getLang('hot')})</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{flexDirection: 'row', padding: 10, margin: 5, alignItems: 'center'}}>
							<FontAwesome5 name="hand-holding-heart" size={26} color="white" />
							<Text style={{color: 'white', marginLeft: 8, fontWeight: 'bold'}}>{getLang('my_dares')}</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{flexDirection: 'row', padding: 10, margin: 5, alignItems: 'center'}}
							onPress={goToDiceGame}>
							<FontAwesome5 name="dice-five" size={26} color="white" />
							<Text style={{color: 'white', marginLeft: 8, fontWeight: 'bold'}}>{getLang('dice')}</Text>
						</TouchableOpacity>
					</View>
					<View style={{marginBottom: 15, borderBottomWidth: 1.5, borderBottomColor: '#525150'}}>
						<Text style={{color: '#3b3a39', marginHorizontal: 10, fontSize: 15}}>{getLang('settings')}</Text>
						<TouchableOpacity style={{flexDirection: 'row', padding: 10, margin: 5, alignItems: 'center'}}
							onPress={goToLanguageSettingsScreen}>
							<MaterialIcons name="language" size={26} color="white" />
							<Text style={{color: 'white', marginLeft: 8, fontWeight: 'bold'}}>{getLang('language')}</Text>
						</TouchableOpacity>
					</View>
					<View style={{marginTop: 15, marginBottom: 25}}>
						<TouchableOpacity style={{flexDirection: 'row', padding: 10, margin: 5, alignItems: 'center'}}
							onPress={openLearnMore}>
							<AntDesign name="contacts" size={24} color="white" />
							<Text style={{color: 'white', marginLeft: 8, fontWeight: 'bold', fontSize: 12}}>{getLang('learn_more')}</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{flexDirection: 'row', padding: 10, margin: 5, alignItems: 'center'}}
							onPress={openContactUs}>
							<AntDesign name="contacts" size={24} color="white" />
							<Text style={{color: 'white', marginLeft: 8, fontWeight: 'bold', fontSize: 12}}>{getLang('contact_us')}</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{flexDirection: 'row', padding: 10, margin: 5, alignItems: 'center'}}
							onPress={goToRateReview}>
							<MaterialIcons name="rate-review" size={24} color="white" />
							<Text style={{color: 'white', marginLeft: 8, fontWeight: 'bold', fontSize: 12}}>{getLang('rate_the_app')}</Text>
						</TouchableOpacity>
					</View>
				</SafeAreaView>
			</ScrollView>
		);
	}
});

export default createAppContainer(MainNavigator);
