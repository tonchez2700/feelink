import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import { useNavigation, } from '@react-navigation/native';
import { useEffect, useRef, useState, useContext } from 'react';
import { Camera } from 'expo-camera';
import { Context as NewRegisterStep3Context } from '../context/NewRegisterStep3Context';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import tw from 'tailwind-react-native-classnames';

const PhotoPaymentScreen = () => {

    let cameraRef = useRef();
    const navigation = useNavigation();
    const { state, handleInputChange, isVisibleModal } = useContext(NewRegisterStep3Context);
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
    const [photo, setPhoto] = useState();
    const [imagenSeleccionada, setImagenSeleccionada] = useState(null);


    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
            setHasCameraPermission(cameraPermission.status === "granted");
            setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
        })();
    }, []);

    if (hasCameraPermission === undefined) {
        return <Text>Requesting permissions...</Text>
    } else if (!hasCameraPermission) {
        return <Text>Permisos de la camara no permitido. Por favor de cambiar la configuracion.</Text>
    }
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            const base64 = await FileSystem.readAsStringAsync(result.uri, {
                encoding: FileSystem.EncodingType.Base64,
            });
            handleInputChange(`data:image/png;base64,${base64}`, 'image')
            isVisibleModal();
            navigation.goBack();
        }
    };
    let takePic = async () => {
        let options = {
            quality: 1,
            base64: true,
            exif: false
        };

        let newPhoto = await cameraRef.current.takePictureAsync(options);
        setPhoto(newPhoto);

    };

    if (photo) {

        let savePhoto = () => {
            handleInputChange(`data:image/jpg;base64${photo.base64}`, 'image')
            isVisibleModal();
            MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
                setPhoto(undefined);

            });


        };

        return (
            <SafeAreaView style={styles.container}>
                <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginTop: 10 }}>
                    {hasMediaLibraryPermission ?
                        <Button containerStyle={{ width: '40%' }} title="Guardar" onPress={savePhoto} />
                        :
                        undefined
                    }
                    <Button containerStyle={{ width: '40%' }} title="Deshacer" onPress={() => setPhoto(undefined)} />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <Camera style={styles.container} ref={cameraRef}>
            <View style={styles.buttonContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Button containerStyle={{ width: '45%', backgroundColor: '#2D5DA0' }} title="Galeria" onPress={pickImage} />
                    <Button containerStyle={{ width: '45%', backgroundColor: '#2D5DA0' }} title="Tomar Fotografia" onPress={takePic} />
                </View>
            </View>
        </Camera>
    );
}

export default PhotoPaymentScreen
const styles = StyleSheet.create({
    container: {
        height: '90%',
        alignContent: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        top: '40%',
        alignSelf: 'center'
    },
    preview: {
        alignSelf: 'stretch',
        flex: 1
    }
});