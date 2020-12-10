import React from 'react';
import { HeaderButton, HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons'; 
import { StyleSheet } from 'react-native';
import colors from '../constants/colors';

const CustomHeaderButton = props => {
	return <HeaderButton {...props}
		color={colors.darkPrimary}
		IconComponent={Ionicons}
		iconSize={37}
		style={styles.button}
	/>;
}

const HeaderGoBackButton = props => {
	return (
		<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
			<Item iconName="ios-arrow-back" onPress={props.onClick} />
		</HeaderButtons>
	);
};

const styles = StyleSheet.create({
	button: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
});

export default HeaderGoBackButton;