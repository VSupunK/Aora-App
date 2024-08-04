import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router';
import { createUser } from '../../lib/appwrite';

const SignUp = () => {
  const [form, setFrom] = useState({
    username: '',
    email: '',
    password: '',
  })

  const [isSubmiting, setisSubmiting] = useState(false)

  const submit = async () => {
    if(!form.username || !form.email || !form.password){
      Alert.alert('Error', 'Please fill in all the fields')
    }
    setisSubmiting(true);

    try {
      const result = await createUser(form.email, form.password, form.username)
    //set it to global state...
    router.replace('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally {
      setisSubmiting(false)
    }

    createUser();
  }

  return (
    <SafeAreaView className="bg-primary h-full">
        <ScrollView>
          <View className='w-full justify-center min-h-[85vh] px-4 my-6'>
            <Image source={images.logo}
            resizeMode='contain' className="w-[115px] h-[35px]"/>

            <Text className="text-2xl text-white text-semibold mt-10 font-psemibold mb-10">Sign up to Aora</Text>
          
          {/* Username input field */}
          <FormField
          title='Username'
          value={form.username}
          handleChangeText={(e) => setFrom({...form, username: e})}
          otherStyles="mt-10"
          />

          {/* Email input field */}
          <FormField
          title='Email'
          value={form.email}
          handleChangeText={(e) => setFrom({...form, email: e})}
          otherStyles="mt-7"
          keyboardType="email-address"
          />

          {/* Password input field */}
          <FormField
          title='Password'
          value={form.password}
          handleChangeText={(e) => setFrom({...form, password: e})}
          otherStyles="mt-7"
          />
          
          <CustomButton 
          title="Sign Up"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={isSubmiting}/>

          <View className="justify-center pt-5 flex-row gap-2">

            <Text className="text-lg text-gray-100 font-pregular">Don't have an account?</Text>
            <Link href="/sign-in" className='text-lg font-psemibold text-secondary'>Sign In</Link>

          </View>
          </View>
        </ScrollView>
    </SafeAreaView>
  )
} 


export default SignUp