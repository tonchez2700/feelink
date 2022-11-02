import React, { useContext, useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Alert, View, Text, ActivityIndicator } from 'react-native'
import { useNavigation, } from '@react-navigation/native';
import { Input, Button } from 'react-native-elements'
import { Context as NewRegisterStep3Context } from '../context/NewRegisterStep3Context';
import EntryListFinal from '../components/EntryListFinal';
import EntryPaymentFinal from '../components/EntryPaymentFinal';
import StepStatus from '../components/StepStatus';
import HeadTitleScreen from '../components/Forms/HeadTitleScreen';
import tw from 'tailwind-react-native-classnames'


const NewRegisterStep4 = ({ route }) => {

    const navigation = useNavigation();
    const { params } = route
    const { state, storeFinal, handleNotesChange } = useContext(NewRegisterStep3Context);

    const getContent = () => {
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}>

                <HeadTitleScreen title='Nuevo Registro' />
                <View style={tw`mb-4`}>
                    <StepStatus
                        number={3}
                    />
                </View>

                <Text style={[tw`text-lg`]}>Datos generales</Text>
                <View>
                    <Text style={[tw` text-sm`, { color: 'gray' }]}>Nombre: <Text style={[tw` text-sm`, { color: 'black' }]}>{params?.user.name} {params?.user.paternal_surname} {params?.user.maternal_surname}</Text></Text>
                    <Text style={[tw` text-sm`, { color: 'gray' }]}>Email: <Text style={[tw` text-sm`, { color: 'black' }]}>{params?.user.email}</Text></Text>
                    <Text style={[tw` text-xs`, { color: 'gray' }]}>Monto Total: <Text style={[tw` text-sm font-medium`, { color: 'black' }]}>${params?.total}</Text></Text>
                </View>
                <View style={{ borderColor: '#2D5DA0', borderTopWidth: 3, marginTop: 10 }}>
                    <Text style={[tw`text-xl my-2`]}>Programas Educativos</Text>
                    <View style={tw`flex-row items-start`}>
                        <Text style={[tw` text-sm w-9/12 text-white pl-2`, styles.itemsT]}>Items:</Text>
                        <Text style={[tw` text-sm w-60 text-white pl-2`, styles.itemsT]}>Monto</Text>
                    </View>
                    <EntryListFinal
                        data={params?.rows}
                        TotalCost={params?.total}
                    />
                </View>
                <View style={{ borderColor: '#2D5DA0', borderTopWidth: 3, marginTop: 30 }}>
                    <Text style={tw`text-xl my-2`}>Desglose de Pagos</Text>
                    <View style={tw`flex-row items-start my-2`}>
                        <Text style={[tw`  text-sm  w-5/12 text-white pl-2`, styles.itemsT]}>Fecha</Text>
                        <Text style={[tw`  text-sm  w-5/12 text-white pl-2`, styles.itemsT]}>Tipo</Text>
                        <Text style={[tw`  text-sm  w-1/3  text-white pl-2`, styles.itemsT]}>Monto</Text>
                    </View>
                    <EntryPaymentFinal
                        data={params?.payments}
                        TotalCost={params?.total}
                    />


                </View>
                <Text style={[tw`text-base mt-3`]}>Notas adicionales</Text>
                <Input
                    inputStyle={[tw`text-left `, {
                        backgroundColor: 'white',
                        padding: 9,
                        borderBottomColor: 'gray',
                        paddingLeft: 20,
                        borderRadius: 5,
                        backgroundColor: 'white',
                        borderBottomColor: 'white'
                    }]}
                    onChangeText={(value) => handleNotesChange(value, 'notes')}
                    containerStyle={[tw`text-left border-0 border-white `, { borderWidth: 10 }]}
                    value={state.notes}
                    labelStyle={{ color: '#133C60' }}
                />
                <View style={tw`flex-row my-10 justify-around items-center `}>
                    <Button
                        titleStyle={tw`text-base font-bold`}
                        buttonStyle={[tw` mr-2 w-32 rounded-full `, { backgroundColor: '#868686' }]}
                        title="Cancelar"
                        onPress={() => navigation.navigate('HomeScreen')}
                    /><Button
                        loading={state.fetchingData ? true : false}
                        titleStyle={tw`text-base font-bold `}
                        buttonStyle={[tw`mr-2 w-32 rounded-full  `, { backgroundColor: '#2D5DA0' }]}
                        title="Confirmar"
                        onPress={() => storeFinal(params, state.notes)}
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

export default NewRegisterStep4

const styles = StyleSheet.create({

    itemsT: {
        backgroundColor: '#2D5DA0',
        color: 'white'
    },

})
