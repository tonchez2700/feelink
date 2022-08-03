import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal, Dimensions, } from 'react-native'
import { Input, Button, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Context as AdvanceContext } from '../../context/AdvanceContext';
import tw from 'tailwind-react-native-classnames'


const { width } = Dimensions.get("window");

const ModalAccept = (data) => {

    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const { state, authorizationAdvance } = useContext(AdvanceContext);

    const toggleModalVisibility = () => {
        setModalVisible(!modalVisible);
    };

    const multipleFunction = () => {
        toggleModalVisibility();
    }

    return (
        <View>
            <Button
                titleStyle={tw`text-lg font-bold `}
                buttonStyle={[styles.button, { backgroundColor: '#002443' }]}
                title="Autorizar"
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
                        <Text style={tw`font-bold text-xl text-center`}>¿Estas seguro que quieres "AUTORIZAR"?</Text>
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
                                    authorizationAdvance(data.data.tokenId, data.data.processActions[0])
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

export default ModalAccept


const styles = StyleSheet.create({
    button: {
        marginTop: 20,
        borderRadius: 23

    },
    titleT: {
        textAlign: 'center'
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
        top: "50%",
        left: "50%",
        elevation: 5,
        transform: [{ translateX: -(width * 0.4) },
        { translateY: -90 }],
        height: 250,
        width: width * 0.8,
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 5
    },
})
