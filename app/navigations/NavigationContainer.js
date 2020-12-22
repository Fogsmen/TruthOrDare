import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MainNavigator from './MainNavigator';
import * as StoreService from '../services/StoreService';
import * as GameAction from '../redux/actions/game';
import * as SettingAction from '../redux/actions/settings';
import { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

const NavigationContainer = props => {
	const dispatch = useDispatch();
	const [loadCouple, setLoadCouple] = useState(false);
	const [loadNames, setLoadNames] = useState(false);
	const [loadLang, setLoadLang] = useState(false);

	useEffect(() => {
		StoreService.getCouple().then(res => {
			if(res) {
				const couple = JSON.parse(res);
				dispatch(GameAction.loadCoupleNames(couple[0], couple[1]));
			}
			setLoadCouple(true);
		}).catch(() => {
			setLoadCouple(true);
		});
		StoreService.getNames().then(res => {
			dispatch(GameAction.loadPlayers(JSON.parse(res)));
			setLoadNames(true);
		}).catch(() => {
			setLoadNames(true);
		});
		StoreService.getLang().then(res => {
			dispatch(SettingAction.loadLanguage(res));
			setLoadLang(true);
		}).catch(() => {
			setLoadLang(true);
		});
	}, [dispatch]);

	if(!loadCouple || !loadNames || !loadLang) {
		return (
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<ActivityIndicator size="large" />
			</View>
		)
	}

	return (
		<MainNavigator />
	);
};

export default NavigationContainer;
