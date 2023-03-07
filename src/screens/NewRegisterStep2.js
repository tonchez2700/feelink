import React, { useContext, useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Alert, View, Text, ActivityIndicator } from 'react-native'
import { useNavigation, } from '@react-navigation/native';
import { Input, Button } from 'react-native-elements'
import { Context as NewRegisterStep2Context } from '../context/NewRegisterStep2Context';
import EntryList from '../components/EntryList';
import StepStatus from '../components/StepStatus';
import ModalDiplo from '../components/Modal/ModalDiplo';
import ModalProg from '../components/Modal/ModalProg';
import HeadTitleScreen from '../components/Forms/HeadTitleScreen';
import tw from 'tailwind-react-native-classnames'
import moment from 'moment'

const NewRegisterStep2 = ({ route }) => {

    const navigation = useNavigation();
    const { state, clearState, store, getTotalCost,
        handleDiscountChange, handleDeleteEntryItem } = useContext(NewRegisterStep2Context);
    const { params } = route
    const [remoteDataSet, setRemoteDataSet] = useState(null)


    useEffect(() => {
        clearState()
    }, []);
    useEffect(() => {
        getTotalCost(state.dataItems)
    }, [state.dataProgram, state.discount, state.TotalCost]);

    const getContent = () => {
        return (

            <ScrollView
                showsVerticalScrollIndicator={false}>

                <HeadTitleScreen title='Nuevo Registro' />
                <View style={tw`mb-7`}>
                    <StepStatus
                        number={1}
                    />
                </View>
                <View>
                    <Text style={[tw` text-sm`, { color: 'gray' }]}>Nombre: <Text style={[tw` text-sm`, { color: 'black' }]}>{params?.user.name} {params?.user.paternal_surname} {params?.user.maternal_surname}</Text></Text>
                    <Text style={[tw` text-sm`, { color: 'gray' }]}>Email: <Text style={[tw` text-sm`, { color: 'black' }]}>{params?.user.email}</Text></Text>
                    <Text style={[tw` text-sm`, { color: 'gray' }]}>Telefono: <Text style={[tw` text-sm`, { color: 'black' }]}>{params?.phone}</Text></Text>
                </View>
                <Text style={tw`text-xl my-5`}>Programa Educativo</Text>
                <Text style={[tw` text-sm font-bold`, { color: '#133C60' }]}>Items</Text>

                <View style={tw`flex-row justify-around`}>
                    <ModalDiplo />
                    <ModalProg />
                    {/* <ModalApostille /> */}
                </View>
                <View style={tw`flex-row items-start mt-8`}>
                    <Text style={[tw` text-sm text-white pl-2`, styles.itemsT, { width: '65%' }]}>Items:</Text>
                    <Text style={[tw` text-sm pl-2`, styles.itemsT]}>Monto</Text>
                </View>
                <EntryList
                    data={state.dataItems}
                    TotalCost={state.finalCost}
                    value={state.discout}
                    listDiscount={state.listDiscount}
                    discount={state.discout}
                    fun={(item) => handleDiscountChange(item)}
                    deleteItem={(item) => handleDeleteEntryItem(item)} />

                <View style={tw`flex-row my-10 justify-around items-center `}>
                    <Button
                        titleStyle={tw`text-base font-bold`}
                        buttonStyle={[tw` mr-2 w-32 rounded-full `, { backgroundColor: '#868686' }]}
                        title="Cancelar"
                        onPress={() => {
                            navigation.navigate('HomeScreen')
                        }}
                    /><Button
                        titleStyle={tw`text-base font-bold `}
                        buttonStyle={[tw`mr-2 w-32 rounded-full  `, { backgroundColor: '#2D5DA0' }]}
                        title="Siguiente"
                        onPress={() => store(state.dataItems, state.finalCost, params.user, params.id)}
                    />
                </View>
            </ScrollView>
        );
    }
    return (
        <View>
            {

                getContent()

            }
        </View>
    )
}

export default NewRegisterStep2

const styles = StyleSheet.create({

    itemsT: {
        backgroundColor: '#2D5DA0',
        color: 'white',
        width: '35%'
    },

})
