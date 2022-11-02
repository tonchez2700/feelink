import React, { useContext } from 'react'
import { StyleSheet, Text, View, Alert, ScrollView, Dimensions, ImageBackground, KeyboardAvoidingView } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import Images from '@assets/images';
import InputForm from '../components/Forms/InputForm'
import { Icon, Input } from 'react-native-elements'
import ButtonFrom from '../components/Forms/ButtonFrom'
import { useFormik } from 'formik'
import { AuthSchema } from '../config/schemas'
import { Context as AuthContext } from '../context/AuthContext';
import SimpleNavBar from '../components/SimpleNavBar'

const AuthScreen = () => {
    const { state, signin, clearState } = useContext(AuthContext);
    const {
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched
    } = useFormik({
        validationSchema: AuthSchema,
        onSubmit: values => signin(values),
        initialValues: {
            email: '',
            password: ''
        }
    });

    return (


        <View style={tw`h-full items-center`}>
            <ScrollView contentContainerStyle={tw`items-center`}>

                <SimpleNavBar />
                <Text style={[tw`text-3xl mt-10 font-bold`, { color: '#292929' }]}>Bienvenido</Text>
                <View style={tw`w-4/5 mt-8`}>
                    <InputForm
                        placeholder={'Correo'}
                        name='email'
                        leftIcon={<Icon type='font-awesome' name='envelope' size={25} color='black' style={{ marginRight: 15 }} />}
                        autoCapitalize='none'
                        inputContainerStyle={styles.input}
                        keyboardType='email-address'
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        errors={errors}
                        values={values}
                        touched={touched} />
                    <InputForm
                        placeholder={'Contraseña'}
                        name='password'
                        leftIcon={<Icon type='font-awesome' name='lock' size={25} color='black' style={{ marginRight: 26 }} />}
                        autoCapitalize='none'
                        inputContainerStyle={styles.input}
                        secureTextEntry={true}
                        password={true}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        errors={errors}
                        values={values}
                        touched={touched} />
                    
                    <ButtonFrom handleSubmit={handleSubmit} loading={state.fetchingData ? true : false} />
                    <View style={tw`items-center`}>
                        <Text style={[tw`text-xs mb-10 font-bold `, { color: '#707070' }]}>Al crear tu cuenta estas aceptando nuestros Términos de uso y Política de privacidad.</Text>
                    </View>
                </View>
                {
                    state.error === true
                        ?
                        Alert.alert(
                            "Error de Autentificacion",
                            state.message,
                            [{
                                text: "OK",
                                onPress: clearState
                            }]
                        )
                        :
                        null
                }

            </ScrollView>
        </View>


    )
}

export default AuthScreen

const styles = StyleSheet.create({
    container: {
    },
    input: {
        backgroundColor: 'white',
        padding: 9,
        borderBottomColor: 'gray',
        paddingLeft: 20,
        borderRadius: 5,
        elevation: 5,
        backgroundColor: 'white',
        borderBottomColor: 'white'
    }

})
