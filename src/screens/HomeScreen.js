import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ScrollView, Text, FlatList } from 'react-native';
import tw from 'tailwind-react-native-classnames'
import { Input, Button, Icon } from 'react-native-elements'
import MenuItem from '../components/MenuItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const [user, setUser] = useState({})
    const navigation = useNavigation();
    const [flexWrapper, setFlexWrapper] = useState(true);

    return (

        <ScrollView
            contentContainerStyle={{ flex: flexWrapper ? 1 : 0 }}
            showsVerticalScrollIndicator={false}>

            <View style={tw`items-end m-2`}>
                <Button
                    titleStyle={tw`text-base font-bold  `}
                    buttonStyle={[tw` w-32 `, { backgroundColor: '#2D5DA0' }]}
                    title="Nueva entrada"
                    onPress={() => navigation.navigate('NewRegister')}
                />
            </View>

            <View class={"inline-grid grid-cols-3 gap-4"}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={tw`flex-1 mb-5`}
                    data={files}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => {
                        if (item.supplier_employee_file_type_id === 1)
                            return renderItem(item)

                        return null
                    }}
                />
            </View>
        </ScrollView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        width: '100%',
        marginVertical: 20,
    },
})
