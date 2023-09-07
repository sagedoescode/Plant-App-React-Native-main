import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { destinationData } from '../constants';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { HeartIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';

export default function Feed() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {destinationData.map((item, index) => (
        <DestinationCard key={index} item={item} navigation={navigation} />
      ))}
    </ScrollView>
  );
}

const DestinationCard = ({ item, navigation }) => {
  const [isFavourite, toggleFavourite] = React.useState(false);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Destination', { ...item })}
      style={styles.card}
    >
      {/* Destination image */}
      <Image
        source={item.image}
        style={styles.cardImage}
      />

      {/* Gradient overlay */}
      <LinearGradient
        colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
        style={styles.gradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      {/* Favourite button */}
      <TouchableOpacity
        onPress={() => toggleFavourite(!isFavourite)}
        style={styles.favouriteButton}
      >
        <HeartIcon
          size={wp(5)}
          color={isFavourite ? 'red' : 'white'}
        />
      </TouchableOpacity>

      {/* Destination information */}
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.shortDescription}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Set your desired background color
  },
  card: {
    width: wp(100),
    marginBottom: wp(2), // Adjust the margin as needed
  },
  cardImage: {
    width: wp(100),
    height: wp(60), // Adjust the height as needed
    borderRadius: wp(5),
  },
  gradient: {
    width: wp(100),
    height: wp(30), // Adjust the height as needed
    position: 'absolute',
    bottom: 0,
    borderRadius: wp(5),
  },
  favouriteButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    position: 'absolute',
    top: wp(2),
    right: wp(2),
    borderRadius: wp(5),
    padding: wp(2),
  },
  cardContent: {
    padding: wp(4),
    paddingBottom: wp(8),
  },
  title: {
    fontSize: wp(4),
    fontWeight: 'bold',
    color: 'white',
  },
  description: {
    fontSize: wp(2.2),
    color: 'white',
  },
});
