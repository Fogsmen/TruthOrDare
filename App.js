import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';
import MainNavigator from './app/navigations/MainNavigator';
import store from './app/redux/store';

export default function App() {
	return (
		<Provider store={store}>
			<MainNavigator />
			<StatusBar style="auto" />
		</Provider>
	);
};
