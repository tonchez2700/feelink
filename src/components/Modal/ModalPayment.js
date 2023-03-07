import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal, Dimensions, } from 'react-native'
import { Input, Button, Icon } from 'react-native-elements';
import { Context as NewRegisterStep3Context } from '../../context/NewRegisterStep3Context';
import DropdownSelect from '../DropdownSelect';
import DropD from '../DropD';
import DateRange from '../DateRange';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames'
import moment from 'moment'


const { width } = Dimensions.get("window");

const ModalPayment = ({ paymentPen }) => {

    const [date, setDate] = useState(new Date());
    const navigation = useNavigation();
    const { state, getPaymentsType, handleInputChange, handleInputChangePayment, isVisibleModal } = useContext(NewRegisterStep3Context);


    useEffect(() => {
        getPaymentsType()
    }, []);


    return (
        <View>
            <Button
                titleStyle={[tw`text-base`, { color: '#133C60' }]}
                buttonStyle={[tw` mr-2  rounded-md `, styles.items]}
                iconPosition={'left'}
                icon={{
                    name: 'plus',
                    type: 'font-awesome',
                    size: 15,
                    color: '#133C60',
                }}
                title="Agregar Pago"
                onPress={() => isVisibleModal()}
            />

            <Modal
                visible={state.isVisible}
                hardwareAccelerated
                animationType="slide"
                transparent
                presentationStyle="overFullScreen"
                onRequestClose={() =>
                    isVisibleModal()
                }>
                <View style={styles.viewWrapper}>
                    <View style={styles.modalView}>
                        <View style={tw`flex-col items-start p-3 w-full`}>
                            <View style={tw`flex-col mb-5 w-full`}>
                                <Text style={[tw` text-sm mb-1 font-bold `, { color: '#133C60' }]}>Tipo de pago</Text>
                                <DropdownSelect
                                    data={state.paymentTypes}
                                    type={'Tipo de pago'}
                                    fun={(item) => handleInputChange(item.id, 'reg_payment_type_id')}
                                />
                            </View>
                            <View style={tw`flex-col items-start w-full`}>
                                <Text style={[tw` text-sm mb-1 font-bold `, { color: '#133C60' }]}>Selecciona la Fecha</Text>
                                <DateRange
                                    value={state.data?.promess_date}
                                    titleDate="Fecha"
                                    placeholder='Fecha de pago'
                                    tmp={date}
                                    tmpfun={(item) => setDate(item)}
                                    fun={(item) => {
                                        let dateFormat = new Date(item)
                                        handleInputChange(moment(dateFormat).format('YYYY-MM-DD'), 'promess_date')
                                    }}
                                />

                            </View>
                            <View style={tw`flex-col items-start w-full`}>
                                <View style={tw`flex-col items-start w-full`}>
                                    <Text style={[tw` text-sm font-bold `, { color: '#133C60' }]}>Monto</Text>
                                    <Input
                                        keyboardType={'number-pad'}
                                        placeholder={'$8,000'}
                                        inputContainerStyle={tw` pl-1 `}
                                        onChangeText={(value) => { handleInputChange(value, 'amount'), handleInputChange(null, 'image') }}
                                        value={state.data?.amount}
                                        labelStyle={{ color: '#133C60' }}
                                        multiline={false}
                                    />
                                </View>
                                {state.data?.reg_payment_type_id != 2 ?
                                    <View style={{ width: '100%' }}>
                                        <Text style={[tw` text-sm font-bold `, { color: '#133C60' }]}>Evidencia</Text>
                                        <TouchableOpacity style={{ width: '100%' }} onPress={() => {
                                            isVisibleModal(),
                                                setTimeout(() => {
                                                    navigation.navigate('PhotoPaymentScreen')
                                                }, 1000);
                                        }}>
                                            <Input
                                                keyboardType={'number-pad'}
                                                placeholder={'Evidencia'}
                                                editable={false}
                                                inputContainerStyle={tw` pl-1 `}
                                                value={state.data?.image}
                                                labelStyle={{ color: '#133C60' }}
                                                multiline={false}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    : null
                                }


                            </View>
                        </View>
                        <View style={tw`flex-row  justify-between `}>
                            <Button
                                titleStyle={tw`text-xs font-bold`}
                                buttonStyle={[tw` mr-2  rounded-full `, { backgroundColor: '#868686' }]}
                                title="Cancelar"
                                onPress={() => isVisibleModal()}
                            /><Button
                                titleStyle={tw`text-xs font-bold `}
                                buttonStyle={[tw`mr-2 rounded-full  `, { backgroundColor: '#2D5DA0' }]}
                                title="Siguiente"
                                onPress={() => { handleInputChangePayment(state.data, paymentPen, state.count) }}
                            />

                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    )
}

export default ModalPayment

const styles = StyleSheet.create({

    items: {
        backgroundColor: 'white',
        borderRadius: 1,
        borderWidth: 1,
        borderColor: '#133C60',
    },
    container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: '#fff'
    },
    viewWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    modalView: {
        alignItems: "center",
        justifyContent: "space-evenly",
        position: "absolute",
        top: "30%",
        left: "50%",
        elevation: 5,
        transform: [{ translateX: -(width * 0.4) },
        { translateY: -90 }],
        height: 500,
        width: width * 0.8,
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 5
    },
})