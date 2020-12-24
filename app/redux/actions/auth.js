import * as ApiService from '../../services/ApiService';
import * as StoreService from '../../services/StoreService';

export const SET_USER = 'SET_USER';
export const LOAD_EMAIL_PASSWORD = 'LOAD_EMAIL_PASSWORD';

export const loadEmailPassword = (email, password) => {
	return {
		type: LOAD_EMAIL_PASSWORD,
		email,
		password
	};
};

export const login = (email, password) => {
	return async(dispatch, getState) => {
		const response = await ApiService.login(email, password);
		if(!response.ok) {
			throw new Error('Connection error!');
		}
		const result = await response.json();
		if(!result.status) {
			throw new Error(result.message);
		}
		await StoreService.saveEmailPassword(email, password);
		dispatch({
			type: SET_USER,
			email: result.result.email,
			name: result.result.name,
			password: result.result.password
		});
	};
};

export const register = (email, name, password) => {
	return async(dispatch, getState) => {
		const response = await ApiService.register(email, name, password);
		if(!response.ok) {
			throw new Error('Connection error!');
		}
		const result = await response.json();
		if(!result.status) {
			throw new Error(result.message);
		}
		await StoreService.saveEmailPassword(email, password);
		dispatch({
			type: SET_USER,
			email: result.result.email,
			name: result.result.name,
			password: result.result.password
		});
	};
};