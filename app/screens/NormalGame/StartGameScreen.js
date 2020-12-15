import React, { useEffect, useState } from 'react';
import { Alert, FlatList, ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MaterialIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useDispatch, useSelector } from 'react-redux';
import * as GameAction from '../../redux/actions/game';
import colors from '../../constants/colors';
import HeaderLabel from '../../components/HeaderLabel';
import HeaderToggleMenuButton from '../../components/HeaderToggleMenuButton';

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

const MultiPlayer = props => {
	const players = useSelector(state => state.game.players);
	const lang = useSelector(state => state.settings.getLang);
	const dispatch = useDispatch();
	const [playerName, setPlayerName] = useState('');

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
	const playerInputHandle = txt => {
		setPlayerName(txt);
	};

	return (
		<View style={styles.multiplayer}>
			<FlatList
				style={styles.playersContainer}
				data={players}
				keyExtractor={p => p.id.toString()}
				renderItem={x => <PlayerRow id={x.item.id} name={x.item.name} onClick={deletePlayer} />}
			/>
			<View style={styles.addPlayer}>
				<TextInput placeholder={lang('add_player')}
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
		</View>
	);
};

const NameBoxRow = props => {
	const gender = props.gender;
	const lang = useSelector(state => state.settings.getLang);
	return (
		<View style={styles.nameBox}>
			<Text style={{color: 'white'}}>{gender==='male' ? lang('mans_name') : lang('womans_name')}</Text>
			<View style={styles.nameBoxInputRow}>
				<View style={styles.nameBoxformIcon}>
					<MaterialCommunityIcons name={`gender-${gender}`} size={24} color="white" />
				</View>
				<TextInput placeholder={gender==='male' ? lang('mans_name') : lang('womans_name')}
					style={{color: 'white'}}
					value={props.value}
					onChangeText={props.onChange}
				/>
			</View>
		</View>
	);
};

const NameBox = props => {
	const selectedGameType = useSelector(state => state.game.selectedGameType);
	const { firstPlayer, secondPlayer, firstChange, secondChange } = props;
	return (
		<View style={{padding: 1}}>
			{(selectedGameType==='mf' || selectedGameType==='ff') ?
				<NameBoxRow gender="female" value={firstPlayer} onChange={firstChange} /> :
				<NameBoxRow gender="male" value={firstPlayer} onChange={firstChange} />
			}
			{(selectedGameType==='mm' || selectedGameType==='mf') ?
				<NameBoxRow gender="male" value={secondPlayer} onChange={secondChange} /> :
				<NameBoxRow gender="female" value={secondPlayer} onChange={secondChange} />
			}
		</View>
	);
};

const StartGameScreen = props => {
	const players = useSelector(state => state.game.players);
	const selectedGameType = useSelector(state => state.game.selectedGameType);
	const lang = useSelector(state => state.settings.getLang);
	const dispatch = useDispatch();
	useEffect(() => {
		props.navigation.setParams({title: lang('your_name')});
	}, [lang]);

	const goToGame = () => {
		if(selectedGameType==='multi' && players.length === 0) {
			Alert.alert('Error!', 'You shoud add at least 1 player', [{text: 'OK'}]);
			return;
		}
		if(selectedGameType !== 'multi' && (firstPlayer.trim().length===0 || secondPlayer.trim().length===0)) {
			Alert.alert('Error!', 'No empty name is allowed!', [{text: 'Ok'}]);
			return;
		}
		if(selectedGameType !== 'multi') {
			dispatch(GameAction.setPlayers([firstPlayer, secondPlayer]));
		}
		props.navigation.navigate('InGame');
	};
	const selectGame = type => {
		dispatch(GameAction.selectGameType(type));
	};
	const [firstPlayer, setFirstPlayer] = useState('');
	const [secondPlayer, setSecondPlayer] = useState('');
	const firstPlayerInputHandle = txt => {
		setFirstPlayer(txt);
	};
	const secondPlayerInputHandle = txt => {
		setSecondPlayer(txt);
	};

	return (
		<ImageBackground style={styles.image} source={require('../../images/home-background.png')}>
			<KeyboardAvoidingView style={styles.screen}>
				<View style={styles.typeTab}>
					<TouchableOpacity style={styles.typeItem} onPress={() => selectGame('mf')}>
						<FontAwesome5 name="transgender" size={30} color="white" />
						<Text style={styles.typeItemText}>{lang('straight')}</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.typeItem} onPress={() => selectGame('mm')}>
						<MaterialCommunityIcons name="gender-male" size={30} color="white" />
						<Text style={styles.typeItemText}>{lang('gray')}</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.typeItem} onPress={() => selectGame('ff')}>
						<MaterialCommunityIcons name="gender-female" size={30} color="white" />
						<Text style={styles.typeItemText}>{lang('lesbian')}</Text>
					</TouchableOpacity>
				</View>
				{selectedGameType==='multi' ? 
					<MultiPlayer /> :
					<NameBox firstPlayer={firstPlayer} firstChange={firstPlayerInputHandle}
						secondPlayer={secondPlayer} secondChange={secondPlayerInputHandle}
					/>
				}
				<TouchableOpacity onPress={goToGame} style={styles.playerButton}>
					<FontAwesome5 name="play" size={24} color="white" />
					<Text style={styles.playText}>{lang('start_game')}</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.multiButton} onPress={() => selectGame('multi')}>
					<Text style={{color: 'white', textDecorationLine: 'underline'}}>{lang('multi_players')}?</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		</ImageBackground>
	);
};

StartGameScreen.navigationOptions = navData => {
	const toggleDrawer = () => {
		navData.navigation.toggleDrawer();
	};

	return {
		headerLeft: () => <HeaderToggleMenuButton toggleNavbar={toggleDrawer} />,
		headerTitle: () => <HeaderLabel label={navData.navigation.getParam('title')} />,
	};
};

const styles = StyleSheet.create({
	image: {
		width: '100%',
		resizeMode: "cover",
		justifyContent: 'center'
	},
	screen: {
		padding: 20,
		justifyContent: 'center',
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
		backgroundColor: colors.redPrimary,
		width: 250,
		alignSelf: 'center',
		paddingVertical: 12,
		borderRadius: 10
	},
	playText: {
		color: 'white',
		fontSize: 19,
		marginHorizontal: 10
	},
	multiplayer: {
		padding: 5
	},
	typeTab: {
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	typeItem: {
		padding: 5,
		alignItems: 'center',
		backgroundColor: colors.redPrimary,
		width: 65,
		borderRadius: 10,
	},
	typeItemText: {
		fontSize: 12,
		color: 'white'
	},
	multiButton: {
		marginBottom: 10,
		alignSelf: 'center'
	},
	nameBox: {
		padding: 5,
		margin: 5,
		alignItems: 'center',
	},
	nameBoxInputRow: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		backgroundColor: colors.redPrimary,
		borderRadius: 10,
		width: '90%'
	},
	nameBoxformIcon: {
		backgroundColor: colors.redPrimary,
		width: 50,
		height: 50,
		padding: 5,
		justifyContent: 'center',
		alignItems: 'center',
		borderTopStartRadius: 10,
		borderBottomStartRadius: 10
	},
});

export default StartGameScreen;