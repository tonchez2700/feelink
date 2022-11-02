import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import tw from 'tailwind-react-native-classnames'
import HeadTitleScreen from '../components/Forms/HeadTitleScreen';
import MenuItem from '../components/MenuItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const [user, setUser] = useState({})
    const navigation = useNavigation();

    
    return (
        <View style={tw`h-full`}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ alignItems: 'center' }}>
                <HeadTitleScreen title='Registro de Estudiantes' />
                <MenuItem
                    title='Registrar Estudiante'
                    icon='user-plus'
                    color='#34C38F'
                    fontFamily='font-awesome-5'
                    navigateScreen='NewRegister' />
                {/* <MenuItem
                    title='Lista de Registro'
                    icon='list'
                    color='#F1B44C'
                    fontFamily='font-awesome-5'
                    navigateScreen='NewRegisterStep2' /> */}
            </ScrollView>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
