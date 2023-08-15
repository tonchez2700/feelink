import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal, Dimensions, ScrollView } from 'react-native'
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

    console.log("data", state.data);
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
                    <ScrollView
                        nestedScrollEnabled
                        style={styles.modalView}
                        keyboardDismissMode="on-drag"
                        keyboardShouldPersistTaps="handled"
                        contentInsetAdjustmentBehavior="automatic">
                        <View style={tw`flex-col items-start p-3 w-full`}>
                            <View style={tw`flex-col mb-5 w-full`}>
                                <Text style={[tw` text-sm mb-1 font-bold `, { color: '#133C60' }]}>Tipo de pago</Text>
                                <DropdownSelect
                                    data={state.paymentTypes}
                                    type={'Tipo de pago'}
                                    fun={(item) => handleInputChange(item.id, 'reg_payment_type_id', 0)}
                                />
                            </View>

                            <View style={tw`flex-col items-start w-full`}>
                                <View style={tw`flex-col items-start w-full`}>
                                    {
                                        state.data[0]?.reg_payment_type_id != 2 ?
                                            <View style={{ width: '100%' }}>
                                                <View style={tw`flex-col items-start w-full`}>
                                                    <Text style={[tw` text-sm mb-1 font-bold `, { color: '#133C60' }]}>Selecciona la Fecha </Text>
                                                    <DateRange
                                                        value={state.data[0]?.promess_date}
                                                        titleDate="Fecha"
                                                        placeholder='Fecha de pago'
                                                        tmp={date}
                                                        tmpfun={(item) => setDate(item)}
                                                        fun={(item) => {
                                                            let dateFormat = new Date(item)
                                                            handleInputChange(moment(dateFormat).format('YYYY-MM-DD'), 'promess_date', 0)
                                                        }}
                                                    />

                                                </View>
                                                <Text style={[tw` text-sm font-bold `, { color: '#133C60' }]}>Monto </Text>
                                                <Input
                                                    keyboardType={'number-pad'}
                                                    placeholder={'$8,000'}
                                                    inputContainerStyle={tw` pl-1 `}
                                                    onChangeText={(value) => { handleInputChange(value, 'amount', 0), handleInputChange(null, 'image', 0) }}
                                                    value={state.data[0]?.amount}
                                                    labelStyle={{ color: '#133C60' }}
                                                    multiline={false}
                                                />
                                            </View>
                                            :
                                            <View style={{ width: '100%' }}>
                                                <Text style={[tw` text-sm mb-1 font-bold `, { color: '#133C60' }]}>Selecciona la Fecha 1</Text>
                                                <DateRange
                                                    value={state.data[0]?.promess_date}
                                                    titleDate="Fecha"
                                                    placeholder='Fecha de pago'
                                                    tmp={date}
                                                    tmpfun={(item) => setDate(item)}
                                                    fun={(item) => {
                                                        let dateFormat = new Date(item)
                                                        handleInputChange(moment(dateFormat).format('YYYY-MM-DD'), 'promess_date', 0)
                                                    }}
                                                />
                                                <Text style={[tw` text-sm font-bold `, { color: '#133C60' }]}>Monto 1</Text>
                                                <Input
                                                    keyboardType={'number-pad'}
                                                    placeholder={'$8,000'}
                                                    inputContainerStyle={tw` pl-1 `}
                                                    onChangeText={(value) => { handleInputChange(value, 'amount', 0), handleInputChange(null, 'image', 0) }}
                                                    value={state.data[0]?.amount}
                                                    labelStyle={{ color: '#133C60' }}
                                                    multiline={false}
                                                />
                                                <Text style={[tw` text-sm mb-1 font-bold `, { color: '#133C60' }]}>Selecciona la Fecha 2</Text>
                                                <DateRange
                                                    value={state.data[1]?.promess_date}
                                                    titleDate="Fecha"
                                                    placeholder='Fecha de pago'
                                                    tmp={date}
                                                    tmpfun={(item) => setDate(item)}
                                                    fun={(item) => {
                                                        let dateFormat = new Date(item)
                                                        handleInputChange(moment(dateFormat).format('YYYY-MM-DD'), 'promess_date', 1)
                                                    }}
                                                />
                                                <Text style={[tw` text-sm font-bold `, { color: '#133C60' }]}>Monto 2</Text>
                                                <Input
                                                    keyboardType={'number-pad'}
                                                    placeholder={'$8,000'}
                                                    inputContainerStyle={tw` pl-1 `}
                                                    onChangeText={(value) => { handleInputChange(value, 'amount', 1), handleInputChange(null, 'image', 1) }}
                                                    value={state.data[1]?.amount}
                                                    labelStyle={{ color: '#133C60' }}
                                                    multiline={false}
                                                />
                                                <Text style={[tw` text-sm mb-1 font-bold `, { color: '#133C60' }]}>Selecciona la Fecha 3</Text>
                                                <DateRange
                                                    value={state.data[2]?.promess_date}
                                                    titleDate="Fecha"
                                                    placeholder='Fecha de pago'
                                                    tmp={date}
                                                    tmpfun={(item) => setDate(item)}
                                                    fun={(item) => {
                                                        let dateFormat = new Date(item)
                                                        handleInputChange(moment(dateFormat).format('YYYY-MM-DD'), 'promess_date', 2)
                                                    }}
                                                />
                                                <Text style={[tw` text-sm font-bold `, { color: '#133C60' }]}>Monto 3</Text>
                                                <Input
                                                    keyboardType={'number-pad'}
                                                    placeholder={'$8,000'}
                                                    inputContainerStyle={tw` pl-1 `}
                                                    onChangeText={(value) => { handleInputChange(value, 'amount', 2), handleInputChange(null, 'image', 2) }}
                                                    value={state.data[2]?.amount}
                                                    labelStyle={{ color: '#133C60' }}
                                                    multiline={false}
                                                />
                                                <Text style={[tw` text-sm mb-1 font-bold `, { color: '#133C60' }]}>Selecciona la Fecha 4</Text>
                                                <DateRange
                                                    value={state.data[3]?.promess_date}
                                                    titleDate="Fecha"
                                                    placeholder='Fecha de pago'
                                                    tmp={date}
                                                    tmpfun={(item) => setDate(item)}
                                                    fun={(item) => {
                                                        let dateFormat = new Date(item)
                                                        handleInputChange(moment(dateFormat).format('YYYY-MM-DD'), 'promess_date', 3)
                                                    }}
                                                />
                                                <Text style={[tw` text-sm font-bold `, { color: '#133C60' }]}>Monto 4</Text>
                                                <Input
                                                    keyboardType={'number-pad'}
                                                    placeholder={'$8,000'}
                                                    inputContainerStyle={tw` pl-1 `}
                                                    onChangeText={(value) => { handleInputChange(value, 'amount', 3), handleInputChange(null, 'image', 3) }}
                                                    value={state.data[3]?.amount}
                                                    labelStyle={{ color: '#133C60' }}
                                                    multiline={false}
                                                />
                                                <Text style={[tw` text-sm mb-1 font-bold `, { color: '#133C60' }]}>Selecciona la Fecha 5</Text>
                                                <DateRange
                                                    value={state.data[4]?.promess_date}
                                                    titleDate="Fecha"
                                                    placeholder='Fecha de pago'
                                                    tmp={date}
                                                    tmpfun={(item) => setDate(item)}
                                                    fun={(item) => {
                                                        let dateFormat = new Date(item)
                                                        handleInputChange(moment(dateFormat).format('YYYY-MM-DD'), 'promess_date', 4)
                                                    }}
                                                />
                                                <Text style={[tw` text-sm font-bold `, { color: '#133C60' }]}>Monto 5</Text>
                                                <Input
                                                    keyboardType={'number-pad'}
                                                    placeholder={'$8,000'}
                                                    inputContainerStyle={tw` pl-1 `}
                                                    onChangeText={(value) => { handleInputChange(value, 'amount', 4), handleInputChange(null, 'image', 4) }}
                                                    value={state.data[4]?.amount}
                                                    labelStyle={{ color: '#133C60' }}
                                                    multiline={false}
                                                />
                                            </View>
                                    }
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
                        <View style={[tw`flex-row mb-6`, { justifyContent: 'space-around' }]}>
                            <Button
                                titleStyle={tw`text-xs font-bold`}
                                buttonStyle={[{ backgroundColor: '#868686', height: 55 }]}
                                title="Cancelar"
                                onPress={() => isVisibleModal()}
                            /><Button
                                titleStyle={tw`text-xs font-bold `}
                                buttonStyle={[{ backgroundColor: '#2D5DA0', height: 55 }]}
                                title="Siguiente"
                                onPress={() => { handleInputChangePayment(state.data, paymentPen, state.count) }}
                            />

                        </View>
                    </ScrollView>
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