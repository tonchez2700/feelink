import React from 'react'
import { SafeAreaView, View, Text, ImageBackground } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as NewRegisterProvider } from '../context/NewRegisterContext';
import { Provider as NewRegisterStep2Provider } from '../context/NewRegisterStep2Context';
import { Provider as NewRegisterStep3Provider } from '../context/NewRegisterStep3Context';
import NewRegisterStep4 from './NewRegisterStep4';
import NewRegisterStep3 from './NewRegisterStep3';
import NewRegisterStep2 from './NewRegisterStep2';
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
                    <NewRegisterStep2Provider>
                        <NewRegisterStep3Provider>
                            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                                <AppStack.Screen name="HomeScreen" component={HomeScreen} />
                                <AppStack.Screen name="NewRegister" component={NewRegister} />
                                <AppStack.Screen name="NewRegisterStep2" component={NewRegisterStep2} />
                                <AppStack.Screen name="NewRegisterStep3" component={NewRegisterStep3} />
                                <AppStack.Screen name="NewRegisterStep4" component={NewRegisterStep4} />
                            </AppStack.Navigator>
                        </NewRegisterStep3Provider>
                    </NewRegisterStep2Provider>
                </NewRegisterProvider>
            </View>
        </SafeAreaView>
    )
}

export default WrapperInnerScreens

