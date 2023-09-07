import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Platform, TextInput } from 'react-native'
import { useRoute } from '@react-navigation/native';
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import Categories from '../components/categories';
import SortCategories from '../components/sortCategories';
import Destinations from '../components/destinations';
import NavBar from '../components/navBar';
import feed from '../components/feed';
import { useNavigation } from '@react-navigation/native';
const ios = Platform.OS=='ios';
const topMargin = ios? 'mt-3': 'mt-10';
export default function FeedScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  console.log(route.name);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className={"space-y-6 "+topMargin}>
        {/* avatar */}
        <View className="mx-5 flex-row justify-between items-center mb-10">
          <Text style={{fontSize: wp(7)}} className="font-bold text-neutral-700">Let's Discover</Text>
          <TouchableOpacity>
            <Image source={require('../../assets/images/avatar.png')} style={{height: wp(12), width: wp(12)}} />
          </TouchableOpacity>
        </View>

        {/* search bar */}
        <View className="mx-5 mb-4">
          <View className="flex-row items-center bg-neutral-100 rounded-full p-4 space-x-2 pl-6">
            <MagnifyingGlassIcon size={20} strokeWidth={3} color="gray" />
            <TextInput
              placeholder='Search user'
              placeholderTextColor={'gray'}
              className="flex-1 text-base mb-1 pl-1 tracking-wider"
            />
          </View>
        </View>

        {/* destinations */}
        <View>
          <Destinations />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}