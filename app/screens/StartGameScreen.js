import React, { useEffect, useState } from 'react';
import { Alert, FlatList, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'; 
import { useDispatch, useSelector } from 'react-redux';
import * as GameAction from '../redux/actions/game';
import colors from '../constants/colors';
import HeaderLabel from '../components/HeaderLabel';
import HeaderToggleMenuButton from '../components/HeaderToggleMenuButton';

const PlayerRow = props => {
	const deleteRow = () => {
		props.onClick(props.id);
	};

	return (
		<View style={styles.playerRow}>
			<Text style={styles.playerRowText}>{props.name}</Text>
			<TouchableOpacity onPress={deleteRow} style={{padding: 5}}>
				<MaterialIcons name="close" size={24} color="white" />
			</TouchableOpacity>
		</View>
	);
};

const StartGameScreen = props => {
	const players = useSelector(state => state.game.players);
	const dispatch = useDispatch();
	const myName = useSelector(state => state.auth.userName);
	useEffect(() => {
		props.navigation.setParams({myName: myName});
	}, [myName]);

	const [playerName, setPlayerName] = useState('');
	const playerInputHandle = txt => {
		setPlayerName(txt);
	};

	const deletePlayer = id => {
		dispatch(GameAction.deletePlayer(id));
	};
	const addPlayer = () => {
		if(playerName.trim().length === 0) {
			Alert.alert('Error!', 'No empty name is allowed.', [{text: 'OK'}]);
			return;
		}
		dispatch(GameAction.addPlayer(playerName));
		setPlayerName('');
	};
	const goToGame = () => {
		if(players.length === 0) {
			Alert.alert('Error!', 'You shoud add at least 1 player', [{text: 'OK'}]);
			return;
		}
		props.navigation.navigate('InGame');
	};

	return (
		<KeyboardAvoidingView style={styles.screen}>
			{(players.length===0 ?
				<View style={{justifyContent: 'center', alignItems: 'center', marginVertical: 50}}>
					<Text style={{textAlign: 'center', fontSize: 20, color: 'white'}}>Please add players</Text>
				</View>
				: <FlatList
					style={styles.playersContainer}
					data={players}
					keyExtractor={p => p.id.toString()}
					renderItem={x => <PlayerRow id={x.item.id} name={x.item.name} onClick={deletePlayer} />}
				/>
			)}
			<View style={styles.footer}>
				<View style={styles.addPlayer}>
					<TextInput placeholder="Add player"
						placeholderTextColor='#cccccc'
						value={playerName}
						onChangeText={playerInputHandle}
						style={styles.palyerName}
						autoFocus={true}
					/>
					<TouchableOpacity onPress={addPlayer} style={{padding: 5}}>
						<MaterialIcons name="add" size={24} color="white" />
					</TouchableOpacity>
				</View>
				<TouchableOpacity onPress={goToGame} style={styles.playerButton}>
					<FontAwesome5 name="play" size={24} color="white" />
					<Text style={styles.playText}>Let's Play</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
};

StartGameScreen.navigationOptions = navData => {
	const toggleDrawer = () => {
		navData.navigation.toggleDrawer();
	};

	return {
		headerLeft: () => <HeaderToggleMenuButton toggleNavbar={toggleDrawer} />,
		headerTitle: () => <HeaderLabel label={navData.navigation.getParam('myName')} />,
	};
};

const styles = StyleSheet.create({
	screen: {
		padding: 20,
		justifyContent: 'center',
		backgroundColor: colors.defaultBackground,
		height: '100%'
	},
	playerRow: {
		flexDirection: 'row',
		borderBottomColor: 'white',
		borderBottomWidth: 2,
		paddingTop: 20,
		paddingHorizontal: 5,
		paddingBottom: 8,
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	playerRowText: {
		fontSize: 20,
		fontWeight: '600',
		color: 'white'
	},
	playersContainer: {
		padding: 5,
		marginVertical: 10
	},
	footer: {
		marginTop: 10,
		marginBottom: 10,
	},
	addPlayer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderBottomWidth: 2,
		borderColor: 'white',
	},
	palyerName: {
		color: 'white',
		fontSize: 20,
		paddingVertical: 5,
		paddingHorizontal: 10,
	},
	playerButton: {
		marginVertical: 20,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.defaultDark,
		width: 250,
		alignSelf: 'center',
		paddingVertical: 12,
		borderRadius: 10
	},
	playText: {
		color: 'white',
		fontSize: 19,
		marginHorizontal: 10
	}
});

export default StartGameScreen;