import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal, Dimensions, } from 'react-native'
import { Context as NewRegisterStep2Context } from '../../context/NewRegisterStep2Context';
import { Input, Button, Icon } from 'react-native-elements';
import DropdownSelect from '../DropdownSelect';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames'


const { width } = Dimensions.get("window");

const ModalProg = (data) => {

    const navigation = useNavigation();
    const { state, clearState, handleInputChangeCamp, handleInputChangeProg, handleInputItems, getcampainsByStatus, getBene } = useContext(NewRegisterStep2Context);
    const [modalVisible, setModalVisible] = useState(false);
    const toggleModalVisibility = () => {
        setModalVisible(!modalVisible);
    };
    
    useEffect(() => {
        getcampainsByStatus()
        getBene(state.data?.campaignSelection?.id)
    }, [state.data]);

    return (
        <View>
            <Button
                titleStyle={[tw`text-base px-1`, { color: '#133C60' }]}
                iconPosition={'top'}
                icon={{
                    name: 'plus',
                    type: 'font-awesome',
                    size: 15,
                    color: '#133C60',
                }}
                buttonStyle={[tw` mr-2 rounded-md mt-1 `, styles.items]}
                title="Beneficio"
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
                        <View style={tw`flex-col items-start p-5`}>
                            <Text style={[tw` text-sm mb-1 font-bold `, { color: '#133C60' }]}>Selecciona la Campaña</Text>
                            <DropdownSelect
                                data={state.campains}
                                type={'Selecciona la Campaña'}
                                fun={(item) => handleInputChangeCamp(item, 'campaignSelection')}
                            />
                            <Text style={[tw` text-sm my-1 font-bold`, { color: '#133C60' }]}>Selecciona el Beneficio</Text>
                            <DropdownSelect
                                data={state.dataBene}
                                type={'Selecciona el Beneficio'}
                                fun={(item) => handleInputChangeProg(item, 'benefit')}
                            />
                        </View>
                        <View style={tw`flex-row justify-between`}>
                            <Button
                                title="Cancelar"
                                buttonStyle={{ backgroundColor: '#848484', marginBottom: 15 }}
                                onPress={() => toggleModalVisibility()}
                            />
                            <Button
                                title="Aceptar"
                                buttonStyle={{ marginLeft: 50, backgroundColor: '#002443', marginBottom: 15 }}
                                onPress={() => {
                                    handleInputItems(state.data, 'diplomantType')
                                    toggleModalVisibility()
                                }}
                            />
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    )
}


export default ModalProg
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
        height: 250,
        width: width * 0.8,
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 5
    },
})