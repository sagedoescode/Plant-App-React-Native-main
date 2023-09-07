import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { NavBarData } from '../constants';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { theme } from '../theme';
import { useNavigation, useIsFocused } from '@react-navigation/native';

export default function NavBar() {
  const [activeSort, setActiveSort] = useState(1);
  const navigation = useNavigation(); // Get the navigation object
  const isFocused = useIsFocused(); // Check if the screen is focused

  const handleButtonPress = (index) => {
    if (index === 0) {
      navigation.navigate('Home', { screen: 'Feed' });
      setActiveSort(index); // Update the active sort when navigating to 'Feed'
    } else if (index === 2) {
      navigation.navigate('Home', { screen: 'Camera' });
    } else if (index === 1) {
      navigation.navigate('Home', { screen: 'Home' });
      setActiveSort(index);
    } else {
      setActiveSort(index);
    }
  };

  // Check if the screen is focused before updating the active sort
  const updateActiveSort = (index) => {
    if (isFocused) {
      handleButtonPress(index);
    }
  };

  return (
    <View style={styles.container}>
      {NavBarData.map((item, index) => {
        const isActive = index === activeSort;
        const isMainButton = index === 2; // Check if it's the third button (camera.png)

        const buttonStyle = [
          styles.button,
          isActive && styles.activeButton,
        ];

        const tintColor = isMainButton ? 'white' : isActive ? theme.text : 'rgba(0,0,0,0.6)';

        return (
          <TouchableOpacity key={index} onPress={() => updateActiveSort(index)}>
            <Image source={item.image} style={{ width: wp(7), height: wp(7), tintColor }} />
          </TouchableOpacity>
        );
      })}
      <View style={styles.mainButtonContainer}>
        <TouchableOpacity onPress={() => updateActiveSort(2)}>
          <View style={styles.mainButton}>
            <Image source={NavBarData[2].image} style={{ width: wp(9), height: wp(9), tintColor: 'white' }} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}






const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 4,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 16,
  },
  button: {
    padding: 12,
    borderRadius: 100,
  },
  activeButton: {
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  mainButtonContainer: {
    position: 'absolute',
    bottom: wp(2), // Adjust the position from the bottom
    left: '50%', // Center it horizontally
    marginLeft: -(wp(6) / 2), // Offset to center it perfectly, accounting for the border width
    width: wp(14), // Adjust the width to account for the border
    height: wp(14), // Adjust the height to account for the border
    borderRadius: wp(12) / 2, // Make it a circle
    backgroundColor: 'white',
    borderWidth: 4, // Add a white border
    borderColor: 'white', // White border color
  },
  
  mainButton: {
    backgroundColor: '#25CB94', // Change the background color as needed
    width: wp(12), // Adjust the width to make it larger
    height: wp(12), // Adjust the height to make it larger
    borderRadius: wp(5), // Make it a circle
    justifyContent: 'center',
    alignItems: 'center',
  },
});
