import React, { useState } from 'react';
import { Alert, Dimensions, ImageBackground, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
	const dispatch = useDispatch();
	const playerInputHandle = txt => {
		dispatch(GameAction.updatePlayer(props.id, txt));
	};

	return (
		<View style={styles.playerRow}>
			<TextInput
				placeholderTextColor='#cccccc'
				value={props.name}
				onChangeText={playerInputHandle}
				style={styles.playerRowText}
			/>
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
	const { lastPlayer, setLastPlayer } = props;

	const deletePlayer = id => {
		dispatch(GameAction.deletePlayer(id));
	};
	const addPlayer = () => {
		if(lastPlayer.trim().length === 0) {
			Alert.alert('Error!', 'No empty name is allowed.', [{text: 'OK'}]);
			return;
		}
		dispatch(GameAction.addPlayer(lastPlayer));
		setLastPlayer('');
	};
	const playerInputHandle = txt => {
		setLastPlayer(txt);
	};

	return (
		<View style={styles.multiplayer}>
			{players.map((player, index) => <PlayerRow
				key={index} id={player.id}
				name={player.name}
				onClick={deletePlayer} 
			/>)}
			<View style={styles.addPlayer}>
				<TextInput placeholder={lang('add_player')}
					placeholderTextColor='#cccccc'
					value={lastPlayer}
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
					style={{color: 'white', width: '75%', paddingHorizontal: 10}}
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
	const players = useSelector(state => state.game.players) ?? [];
	const selectedGameType = useSelector(state => state.game.selectedGameType);
	const lang = useSelector(state => state.settings.getLang);
	const dispatch = useDispatch();
	const [lastPlayer, setLastPlayer] = useState(props.lastPlayer ?? '');

	const goToGame = () => {
		if(selectedGameType === 'multi' && lastPlayer.trim().length > 0) {
			dispatch(GameAction.addPlayer(lastPlayer));
			setLastPlayer('');
		}
		if(selectedGameType==='multi' && players.length < 2) {
			Alert.alert('Error!', 'You shoud add at least 2 player', [{text: 'OK'}]);
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
	const [firstPlayer, setFirstPlayer] = useState(players.length > 0 ? players[0].name : '');
	const [secondPlayer, setSecondPlayer] = useState(players.length > 1 ? players[1].name : '');
	const firstPlayerInputHandle = txt => {
		setFirstPlayer(txt);
	};
	const secondPlayerInputHandle = txt => {
		setSecondPlayer(txt);
	};

	return (
		<SafeAreaView>
			<ImageBackground style={styles.image} resizeMode="stretch" source={require('../../images/home-background.png')} />
			<KeyboardAvoidingView style={styles.screen}>
				<ScrollView style={{backgroundColor: 'transparent'}}>
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
						<MultiPlayer lastPlayer={lastPlayer} setLastPlayer={setLastPlayer} /> :
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
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

StartGameScreen.navigationOptions = navData => {
	const toggleDrawer = () => {
		navData.navigation.toggleDrawer();
	};

	return {
		headerLeft: () => <HeaderToggleMenuButton toggleNavbar={toggleDrawer} />,
		headerTitle: () => <HeaderLabel label="Intimidades – The Tantra  game" />,
	};
};

const styles = StyleSheet.create({
	image: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height - 80,
		justifyContent: 'center',
		position: 'absolute',
	},
	screen: {
		padding: 20,
		justifyContent: 'center',
		height: '100%',
		backgroundColor: 'transparent'
	},
	playerRow: {
		flexDirection: 'row',
		borderBottomColor: 'white',
		borderBottomWidth: 2,
		paddingTop: 20,
		paddingHorizontal: 5,
		paddingBottom: 8,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	playerRowText: {
		fontSize: 20,
		fontWeight: '600',
		color: 'white',
		width: '80%'
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
		marginTop: 60,
		marginBottom: 10,
	},
	palyerName: {
		color: 'white',
		fontSize: 20,
		paddingVertical: 5,
		paddingHorizontal: 10,
		width: '80%'
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