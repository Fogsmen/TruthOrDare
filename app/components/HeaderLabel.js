import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

const HeaderLabel = props => {
	return (
		<View style={styles.header}>
			<Text style={styles.text}>{props.label}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 35,
		borderRadius: 6,
		minWidth: 220
	},
	text: {
		color: 'white',
		fontSize: 13.2,
		fontFamily: (Platform.OS==='android' ? 'Roboto' : null),
		fontWeight: 'bold'
	}
});

export default HeaderLabel;