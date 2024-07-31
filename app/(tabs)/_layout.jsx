import { View, Text, Image } from 'react-native'
import { Tabs, Redirect } from 'expo-router'
import { icons } from '../../constants';

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image 
      source={icon}
      resizeMethod='contain'
      tintColor={color}
      className="w-6 h-6"
      />
      <Text className={`${focused? 'font-psemibold' : 'font-pregular'} text-xs`} style={{ color: color }}>
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#FFA001',
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth: 1,
            borderTopColor: '#232533',
            height: 84,
          }
        }}
      >
        {/* Home Button */}
        <Tabs.Screen
        name='home' options={{
          title: 'Home',
          headerShows: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
            icon={icons.home}
            color = {color}
            name="Home"
            focused={focused}
            />
          )
        }}/>

        {/* Bookmark button */}
        <Tabs.Screen
        name='bookmark' options={{
          title: 'Bookmark',
          headerShows: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
            icon={icons.bookmark}
            color = {color}
            name="Bookmark"
            focused={focused}
            />
          )
        }}/>

{/* Create button */}
<Tabs.Screen
        name='create' options={{
          title: 'Create',
          headerShows: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
            icon={icons.plus}
            color = {color}
            name="Create"
            focused={focused}
            />
          )
        }}/>

{/* Profile button */}
<Tabs.Screen
        name='profile' options={{
          title: 'Profile',
          headerShows: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
            icon={icons.profile}
            color = {color}
            name="Profile"
            focused={focused}
            />
          )
        }}/>
      </Tabs>
    </>
  )
}

export default TabsLayout