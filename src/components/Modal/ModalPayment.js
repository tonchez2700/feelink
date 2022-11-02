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


    const navigation = useNavigation();
    const { state, getPaymentsType, handleInputChange, handleInputChangePayment } = useContext(NewRegisterStep3Context);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        getPaymentsType()
    }, []);
    const toggleModalVisibility = () => {
        setModalVisible(!modalVisible);
    };
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
                onPress={() => toggleModalVisibility()}
            />

            <Modal
                animationType="slide"
                transparent
                visible={modalVisible}
                presentationStyle="overFullScreen"
                onDismiss={() => toggleModalVisibility()}>
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
                                <Text style={[tw` text-sm mb-1 font-bold `, { color: '#133C60' }]}>Selecciona la Campaña</Text>
                                <DateRange
                                    titleDate="Fecha"
                                    placeholder='Fecha de pago'
                                    onChangeDate={(date) => {


                                        var dateObject = new Date(date);
                                        if (date != null) {
                                            var dateString = date;

                                            var dateParts = dateString.split("-");

                                            // month is 0-based, that's why we need dataParts[1] - 1
                                            dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

                                        }
                                        handleInputChange(moment(dateObject).format('YYYY-MM-DD'), 'promess_date')
                                    }}
                                />
                            </View>
                            <View style={tw`flex-col items-start w-full`}>
                                <Text style={[tw` text-sm font-bold `, { color: '#133C60' }]}>Monto</Text>
                                <Input
                                    keyboardType={'number-pad'}
                                    placeholder={'$8,000'}
                                    inputContainerStyle={tw` pl-1 `}
                                    onChangeText={(value) => handleInputChange(value, 'amount')}
                                    value={state.data?.payment}
                                    labelStyle={{ color: '#133C60' }}
                                    multiline={false}
                                />
                            </View>
                        </View>
                        <View style={tw`flex-row  justify-between `}>
                            <Button
                                titleStyle={tw`text-xs font-bold`}
                                buttonStyle={[tw` mr-2  rounded-full `, { backgroundColor: '#868686' }]}
                                title="Cancelar"
                                onPress={() => toggleModalVisibility()}
                            /><Button
                                titleStyle={tw`text-xs font-bold `}
                                buttonStyle={[tw`mr-2 rounded-full  `, { backgroundColor: '#2D5DA0' }]}
                                title="Siguiente"
                                onPress={() => { handleInputChangePayment(state.data, paymentPen, state.count), toggleModalVisibility() }}
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
        height: 400,
        width: width * 0.8,
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 5
    },
})