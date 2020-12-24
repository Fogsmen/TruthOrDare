import React, { useEffect } from 'react';
import { useState } from 'react';
import { ActivityIndicator, Alert, FlatList, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { useDispatch, useSelector } from 'react-redux';
import HeaderLabel from '../../components/HeaderLabel';
import HeaderToggleMenuButton from '../../components/HeaderToggleMenuButton';
import * as ApiService from '../../services/ApiService';
import { useRef } from 'react';
import { useCallback } from 'react';

const CreateBox = props => {
	const email = props.email;
	const [content, setContent] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const inputChange = txt => {
		setContent(txt);
	};
	const createSubmit = async() => {
		const response = await ApiService.createDare(email, content, 0);
		if(!response.ok) {
			throw new Error('Connection error!');
		}
		const result = await response.json();
		if(!result.status) {
			throw new Error(result.message);
		}
		return result.result;
	};
	const create = () => {
		setIsLoading(true);
		createSubmit().then(() => {
			setIsLoading(false);
			props.create();
		}).catch(err => {
			setIsLoading(false);
			Alert.alert('Error', err.message, [{text: 'OK'}]);
		});
	};

	if(isLoading) {
		return (
			<View style={{padding: 50, justifyContent: 'center', alignItems: 'center'}}>
				<ActivityIndicator size="large" color="black" />
			</View>
		);
	}
	return (
		<View style={styles.createbox}>
			<TextInput style={styles.input}
				multiline={true}
				value={content}
				onChangeText={inputChange}
			/>
			<TouchableOpacity onPress={create}>
				<Text style={styles.createbutton}>Create</Text>
			</TouchableOpacity>
		</View>
	)
};

const EditBox = props => {
	const item = props.item;
	const [content, setContent] = useState(item.content);
	const [isLoading, setIsLoading] = useState(false);
	const inputChange = txt => {
		setContent(txt);
	};
	const updateSubmit = async() => {
		const response = await ApiService.updateDare(item.id, content, item.shot);
		if(!response.ok) {
			throw new Error('Connection error!');
		}
		const result = await response.json();
		if(!result.status) {
			throw new Error(result.message);
		}
		return result;
	};
	const deleteSubmit = async() => {
		const response = await ApiService.deleteDare(item.id);
		if(!response.ok) {
			throw new Error('Connection error!');
		}
		const result = await response.json();
		if(!result.status) {
			throw new Error(result.message);
		}
		return result;
	};
	const updateItem = () => {
		setIsLoading(true);
		updateSubmit().then(() => {
			setIsLoading(false);
		}).catch(err => {
			setIsLoading(false);
			Alert.alert('Error', err.message, [{text: 'OK'}]);
		});
	};
	const deleteItem = () => {
		setIsLoading(true);
		deleteSubmit().then(() => {
			setIsLoading(false);
			props.delete(item.id);
		}).catch(err => {
			setIsLoading(false);
			Alert.alert('Error', err.message, [{text: 'OK'}]);
		});
	};

	if(isLoading) {
		return (
			<View style={{padding: 50, justifyContent: 'center', alignItems: 'center'}}>
				<ActivityIndicator size="large" color="black" />
			</View>
		);
	}
	return (
		<View style={styles.createbox}>
			<TextInput style={styles.input}
				value={content} multiline={true}
				onChangeText={inputChange}
			/>
			<View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5}}>
				<TouchableOpacity style={{paddingVertical: 5, marginVertical: 5}}
					onPress={updateItem}>
					<Text style={styles.updatebutton}>Update</Text>
				</TouchableOpacity>
				<TouchableOpacity style={{paddingVertical: 5, marginVertical: 5}}
					onPress={deleteItem}>
					<Text style={styles.deletebutton}>Delete</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const MyDaresScreen = props => {
	const email = useSelector(state => state.auth.email ?? '');
	const [dares, setDares] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const loadDares = async(eamil) => {
		const response = await ApiService.loadDares(eamil);
		if(!response.ok) {
			throw new Error('Connection error!');
		}
		const result = await response.json();
		if(!result.status) {
			throw new Error(result.message);
		}
		return result.result;
	};
	const deleteItem = id => {
		setDares(dares.filter(x => x.id !== id));
	};
	const flag = useRef(false);
	const dispatchDares = useCallback(() => {
		setIsLoading(true);
		loadDares(email).then(res => {
			if(!flag.current) {
				setIsLoading(false);
				setDares(res);
			}
		}).catch(err => {
			Alert.alert('Error', err.message, [{text: 'OK'}]);
			setIsLoading(false);
		});
	}, [email]);

	useState(() => {
		flag.current = false;
		dispatchDares();
		return () => {
			flag.current = true;
		}
	}, [email]);

	return (
		<KeyboardAvoidingView style={styles.screen}>
			{isLoading ?
				<ActivityIndicator size="large" color="black" /> :
				<FlatList
					data={dares}
					keyExtractor={item => item.id}
					renderItem={itemData => <EditBox delete={deleteItem} item={itemData.item} />}
					ListFooterComponent={<CreateBox email={email} create={dispatchDares} />}
				/>
			}
		</KeyboardAvoidingView>
	);
};

MyDaresScreen.navigationOptions = navData => {
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
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#ff7675'
	},
	createbox: {
		marginBottom: 10,
		marginTop: 20,
		padding: 5,
		backgroundColor: '#ff5252',
		paddingTop: 5
	},
	input: {
		borderColor: '#7f8fa6',
		borderWidth: 1,
		borderRadius: 5,
		padding: 5,
		color: '#2c2c54',
		backgroundColor: '#f7f1e3',
		marginVertical: 8
	},
	updatebutton: {
		color: 'white',
		backgroundColor: '#ffb142',
		paddingHorizontal: 20,
		paddingVertical: 8,
		fontWeight: 'bold',
		borderRadius: 5
	},
	deletebutton: {
		color: 'white',
		fontWeight: 'bold',
		backgroundColor: '#b33939',
		paddingHorizontal: 20,
		paddingVertical: 8,
		borderRadius: 5
	},
	createbutton: {
		color: 'white',
		backgroundColor: '#474787',
		paddingHorizontal: 50,
		paddingVertical: 8,
		fontWeight: 'bold',
		borderRadius: 5,
		alignSelf: 'center'
	}
});

export default MyDaresScreen;