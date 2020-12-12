import React from 'react';
import 'react-native-gesture-handler';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { FontAwesome, MaterialCommunityIcons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import colors from '../constants/colors';
import InGameScreen from '../screens/InGameScreen';
import StartGameScreen from '../screens/StartGameScreen';
import TruthOrDareScreen from '../screens/TruthOrDareScreen';
import { Alert, Linking, LogBox, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

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

const MainNavigator = createDrawerNavigator({
	Game: {
		screen: GameNavigator,
		navigationOptions: {
			title: 'Your Names',
			drawerIcon: <FontAwesome name="users" size={24} color='white' />
		}
	}
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
		return (
			<View style={{ flex: 1, paddingTop: 20 }}>
				<SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
					<View style={{marginVertical: 30, borderBottomWidth: 1.5, borderBottomColor: '#525150'}}>
						<Text style={{color: '#3b3a39', marginHorizontal: 10, fontSize: 15}}>GAME</Text>
						<DrawerItems {...props} />
					</View>
					<View style={{marginVertical: 20, borderBottomWidth: 1.5, borderBottomColor: '#525150'}}>
						<Text style={{color: '#3b3a39', marginHorizontal: 10, fontSize: 15}}>EROTIC DARES</Text>
						<TouchableOpacity style={{flexDirection: 'row', padding: 10, margin: 5, alignItems: 'center'}}>
							<FontAwesome name="heart-o" size={26} color="white" />
							<Text style={{color: 'white', marginLeft: 8, fontWeight: 'bold'}}>Right hand Tantra (soft)</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{flexDirection: 'row', padding: 10, margin: 5, alignItems: 'center'}}>
							<MaterialCommunityIcons name="heart-flash" size={26} color="white" />
							<Text style={{color: 'white', marginLeft: 8, fontWeight: 'bold'}}>Left hand Tantra (hot)</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{flexDirection: 'row', padding: 10, margin: 5, alignItems: 'center'}}>
							<FontAwesome5 name="hand-holding-heart" size={26} color="white" />
							<Text style={{color: 'white', marginLeft: 8, fontWeight: 'bold'}}>My Dares</Text>
						</TouchableOpacity>
					</View>
					<View style={{marginTop: 30}}>
						<TouchableOpacity style={{flexDirection: 'row', padding: 10, margin: 5, alignItems: 'center'}}
							onPress={openContactUs}>
							<AntDesign name="contacts" size={24} color="white" />
							<Text style={{color: 'white', marginLeft: 8, fontWeight: 'bold', fontSize: 12}}>Contact Us</Text>
						</TouchableOpacity>
					</View>
				</SafeAreaView>
			</View>
		);
	}
});

export default createAppContainer(MainNavigator);
