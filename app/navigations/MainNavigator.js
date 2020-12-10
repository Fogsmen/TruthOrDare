import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import colors from '../constants/colors';
import GameScreen from '../screens/GameScreen';
import HomeScreen from '../screens/HomeScreen';
import TruthOrDareScreen from '../screens/TruthOrDareScreen';

const defaultNavOptions = {
	headerStyle: {
		backgroundColor: colors.primary,
	},
	headerTitleStyle: {
		width: '100%'
	},
	headerBackTitleStyle: {
		color: colors.darkPrimary
	},
	headerBackTitle: null,
	headerTintColor: colors.darkPrimary
};

const GameNavigator = createStackNavigator({
	Home: {
		screen: HomeScreen,
	},
	Game: {
		screen: GameScreen,
	},
	TruthOrDare: {
		screen: TruthOrDareScreen,
	}
}, {
	defaultNavigationOptions: {
		headerShown: false
	}
});

export default createAppContainer(GameNavigator);
