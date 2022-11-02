import React from 'react'
import { SafeAreaView, View, Text, ImageBackground } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as NewRegisterProvider } from '../context/NewRegisterContext';
import NewRegister from './NewRegister';
import tw from 'tailwind-react-native-classnames';
import Images from '@assets/images';
import NavBar from '../components/NavBar'
import HomeScreen from './HomeScreen';


const AppStack = createNativeStackNavigator();

const WrapperInnerScreens = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NavBar />
            <View style={[tw`pl-8 pr-8`, { flex: 1 }]}>
                <NewRegisterProvider>
                            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                                <AppStack.Screen name="HomeScreen" component={HomeScreen} />
                                <AppStack.Screen name="NewRegister" component={NewRegister} />
                            </AppStack.Navigator>
                </NewRegisterProvider>
            </View>
        </SafeAreaView>
    )
}

export default WrapperInnerScreens

