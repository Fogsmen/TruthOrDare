import React from 'react';
import 'react-native-gesture-handler';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { FontAwesome } from '@expo/vector-icons';
import colors from '../constants/colors';
import InGameScreen from '../screens/InGameScreen';
import StartGameScreen from '../screens/StartGameScreen';
import TruthOrDareScreen from '../screens/TruthOrDareScreen';
import HomeScreen from '../screens/HomeScreen';
import { LogBox } from 'react-native';
import { color } from 'react-native-reanimated';

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

const UserNavigator = createStackNavigator({
	Home: HomeScreen
}, {
	defaultNavigationOptions: defaultNavOptions
});

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
	User: {
		screen: UserNavigator,
		navigationOptions: {
			title: 'User',
			drawerIcon: <FontAwesome name="user-circle" size={24} color='white' />
		}
	},
	Game: {
		screen: GameNavigator,
		navigationOptions: {
			title: 'Game',
			drawerIcon: <FontAwesome name="gamepad" size={24} color='white' />
		}
	}
}, defaultDrawOptions);

export default createAppContainer(MainNavigator);
