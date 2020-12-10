import React from 'react';
import { HeaderButton, HeaderButtons, Item } from 'react-navigation-header-buttons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { StyleSheet } from 'react-native';

const CustomHeaderButton = props => {
	return <HeaderButton {...props}
		color="white"
		IconComponent={MaterialCommunityIcons}
		iconSize={37}
		style={styles.button}
	/>;
}

const HeaderToggleMenuButton = props => {
	return (
		<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
			<Item iconName="menu" onPress={props.toggleNavbar} />
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

export default HeaderToggleMenuButton;