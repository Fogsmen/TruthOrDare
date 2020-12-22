import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';
import NavigationContainer from './app/navigations/NavigationContainer';
import store from './app/redux/store';

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer />
			<StatusBar style="auto" />
		</Provider>
	);
};
