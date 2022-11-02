import React, { useContext, useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Alert, View, Text, ActivityIndicator } from 'react-native'
import { useNavigation, } from '@react-navigation/native';
import { Input, Button } from 'react-native-elements'
import { Context as NewRegisterStep3Context } from '../context/NewRegisterStep3Context';
import EntryPayment from '../components/EntryPayment';
import StepStatus from '../components/StepStatus';
import ModalPayment from '../components/Modal/ModalPayment';
import HeadTitleScreen from '../components/Forms/HeadTitleScreen';
import tw from 'tailwind-react-native-classnames'
import moment from 'moment'

const NewRegisterStep3 = ({ route }) => {

    const navigation = useNavigation();
    const { state, clearState, handleSwitchChange, store } = useContext(NewRegisterStep3Context);
    const { params } = route
    useEffect(() => {
         clearState()
    }, []);
    const getContent = () => {
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}>

                <HeadTitleScreen title='Nuevo Registro' />
                <View style={tw`mb-7`}>
                    <StepStatus
                        number={2}
                    />
                </View>
                <View>
                    <Text style={[tw` text-sm`, { color: 'gray' }]}>Nombre: <Text style={[tw` text-sm`, { color: 'black' }]}>{params?.user.name} {params?.user.paternal_surname} {params?.user.maternal_surname}</Text></Text>
                    <Text style={[tw` text-sm`, { color: 'gray' }]}>Email: <Text style={[tw` text-sm`, { color: 'black' }]}>{params?.user.email}</Text></Text>
                    <Text style={[tw` text-xs`, { color: 'gray' }]}>Monto Total: <Text style={[tw` text-sm font-medium`, { color: 'black' }]}>${params?.cost}</Text></Text>
                </View>
                <Text style={tw`text-xl my-4`}>Desglose de Pagos</Text>

                <View style={tw`flex-row`}>
                    <ModalPayment
                        paymentPen={(params?.cost - state.TotalCost)}
                    />
                </View>
                <Text style={[tw` text-sm font-medium text-right`, { color: 'black' }]}>Saldo Pendiente: <Text style={[tw` text-base font-bold`, { color: '#FF7A00' }]}>${(params?.cost - state.TotalCost)}</Text></Text>
                <View style={tw`flex-row my-2`}>
                    <Text style={[tw`  text-sm text-white`, styles.itemsT]}>Fecha</Text>
                    <Text style={[tw`  text-sm text-white`, styles.itemsT]}>Tipo</Text>
                    <Text style={[tw`  text-sm text-white`, styles.itemsT]}>Monto</Text>
                </View>
                <EntryPayment
                    data={state.dataPayment}
                    TotalCost={state.TotalCost}
                    taxable={state.is_taxable}
                    fun={(item) => handleSwitchChange(item, state.is_taxable)}
                />
                <View style={tw`flex-row my-10 justify-around items-center `}>
                    <Button
                        titleStyle={tw`text-base font-bold`}
                        buttonStyle={[tw` mr-2 w-32 rounded-full `, { backgroundColor: '#868686' }]}
                        title="Cancelar"
                        onPress={() => navigation.navigate('HomeScreen')}
                    /><Button
                        titleStyle={tw`text-base font-bold `}
                        buttonStyle={[tw`mr-2 w-32 rounded-full  `, { backgroundColor: '#2D5DA0' }]}
                        title="Siguiente"
                        onPress={() => {
                            store(params, state.dataPayment, params?.cost, state.TotalCost, state.is_taxable)
                        }}
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

export default NewRegisterStep3

const styles = StyleSheet.create({

    itemsT: {
        textAlign: 'center',
        backgroundColor: '#2D5DA0',
        color: 'white',
        width: '33.33%'
    },

})
