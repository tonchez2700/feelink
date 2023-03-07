import { Alert } from 'react-native'
import createDataContext from './createDataContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import httpClient from '../services/httpClient'
import * as rootNavigation from '../helpers/rootNavigation';
import { INVITED_ENTRY_TYPE, PROVIDER_ENTRY_TYPE, SERVICE_ENTRY_TYPE } from '../config/defines';
import moment from 'moment';

const initialState = {
    error: false,
    message: "",
    fetchingData: false,
    dataFrom: '',
    data: [],
    listEmail: [],
    cities: [],
    jobs: [],
    genders: [],
    media_origins: [],
    isVisible: false
}

const NewRegisterReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'CLEAR_STATE':
            return {
                ...initialState,
            }
        case 'FETCHING_DATA':
            return { ...state, fetchingData: action.payload.fetchingData }
        case 'SET_REQUEST_ERROR':
            return {
                ...state,
                error: true,
                message: action.payload.message,
                fetchingData: false
            }
        case 'SET_CATALOG':
            return {
                ...state,
                cities: action.payload.data.cities,
                genders: action.payload.data.genders,
                jobs: action.payload.data.jobs,
                media_origins: action.payload.data.media_origins,
            }
        case 'SET_DATA_STUDENT':
            let typedata = action.payload.typedata
            return {
                ...state,
                fetchingData: false,
                isVisible: false,
                dataFrom: {
                    ...state.dataFrom,
                    [typedata]: action.payload.value
                }
            }
        case 'SET_FROM_STUDENT':
            return {
                ...state,
                fetchingData: false,
                listEmail: action.payload.listEmail
            }
        case 'SET_SELECT_STUDENT':
            return {
                ...state,
                fetchingData: false,
                dataFrom: {
                    ...action.payload.value
                }
            }
        case 'SET_VISIBILITY_STATE':
            return {
                ...state,
                isVisible: action.payload.isVisible,
            }
        case 'SET_DATE_VALUE':
            return {
                ...state,
                date: action.payload.date,
                isVisible: false
            }
        default:
            return state
    }

}

const clearState = (dispatch) => {
    return () => {
        dispatch({ type: 'CLEAR_STATE' });
    }
}
const getCatalog = (dispatch) => {
    return async () => {
        try {
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const token = user.token
            const cities = await httpClient
                .get(`cities`, {
                    'Authorization': `Bearer ${token}`,
                }
                );
            const genders = await httpClient
                .get(`genders`, {
                    'Authorization': `Bearer ${token}`,
                }
                );
            const jobs = await httpClient
                .get(`jobs`, {
                    'Authorization': `Bearer ${token}`,
                }
                );
            const media_origins = await httpClient
                .get(`media_origins`, {
                    'Authorization': `Bearer ${token}`,
                }
                );
            const data = {
                genders,
                jobs,
                media_origins,
                cities
            }
            if (data != '') {
                dispatch({
                    type: 'SET_CATALOG',
                    payload: { data }
                });
            } else {
                dispatch({
                    type: 'SET_REQUEST_ERROR',
                    payload: {
                        error: true,
                        message: 'Por el momento el servicio no está disponible, inténtelo mas tarde.'
                    }
                });
            }
        } catch (error) {
            dispatch({
                type: 'SET_REQUEST_ERROR',
                payload: {
                    error: true,
                    message: 'Por el momento el servicio no está disponible, inténtelo mas tarde.'
                }
            });
        }
    }

}

const handleEmailChange = (dispatch) => {
    return async (email) => {
        try {
            dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: true } });
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const token = user.token
            const response = await httpClient
                .get(`students?email=${email}`, {
                    'Authorization': `Bearer ${token}`,
                }
                );
            if (response != '') {
                const listEmail = response.map(item => ({
                    id: item.id,
                    title: item.user.email,
                    phone: item.phone,
                    name: item.user.name,
                    paternal_surname: item.user.paternal_surname,
                    maternal_surname: item.user.maternal_surname,
                    city_id: item.city_id,
                    birthdate: item.birthdate,
                    gender_id: item.gender_id,
                    job_id: item.job_id,
                    media_origin_id: item.media_origin_id,
                }))
                dispatch({
                    type: 'SET_FROM_STUDENT',
                    payload: { listEmail }
                });
            } else {
                dispatch({
                    type: 'SET_REQUEST_ERROR',
                    payload: {
                        error: true,
                        message: 'Por el momento el servicio no está disponible, inténtelo mas tarde.'
                    }
                });
            }
        } catch (error) {
            dispatch({
                type: 'SET_REQUEST_ERROR',
                payload: {
                    error: true,
                    message: 'Por el momento el servicio no está disponible, inténtelo mas tarde.'
                }
            });
        }
    }

}

const store = (dispatch) => {
    return async (data) => {

        dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: true } });


        const validated = validateData(data)
        if (!validated.error) {
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const token = user.token
            const response = await httpClient.post(
                'students', data,
                { 'Authorization': `Bearer ${token}` }
            );
            if (response.status) {
                dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: false } });
                Alert.alert(
                    "Correcto",
                    'Registro creado correctamente.',
                    [{
                        text: "Aceptar",
                        onPress: rootNavigation.navigate('NewRegisterStep2', response.data)
                    }]
                )
            } else {
                dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: false } });
                Alert.alert(
                    "Error",
                    response.errors.email[0],
                    [{
                        text: "Aceptar"

                    }]
                )
            }

        } else {
            Alert.alert(
                "Error",
                validated.message,
                [{
                    text: "Aceptar"

                }]
            )
        }

    }
}

const validateData = (data) => {
    let result = { error: false }
    if (!data.email)
        return { ...result, error: true, message: 'El Email es requerido.' }
    if (!data.phone)
        return { ...result, error: true, message: 'El Teléfono es requerido.' }
    if (!data.name)
        return { ...result, error: true, message: 'El Nombre es requerido.' }
    if (!data.paternal_surname)
        return { ...result, error: true, message: 'El Apellido paterno es requerido.' }
    if (!data.maternal_surname)
        return { ...result, error: true, message: 'El Apellido materno es requerido.' }
    if (!data.city_id)
        return { ...result, error: true, message: 'El Cuidad es requerido.' }
    if (!data.birthdate)
        return { ...result, error: true, message: 'El Fecha es requerido es requerido.' }
    if (!data.gender_id)
        return { ...result, error: true, message: 'El Género es requerido.' }
    if (!data.job_id)
        return { ...result, error: true, message: 'El Ocupación es requerido.' }
    if (!data.media_origin_id)
        return { ...result, error: true, message: 'El Medio de origen es requerido.' }


    return result
}

const handleInputChange = (dispatch) => {
    return async (value, typedata) => {

        dispatch({
            type: 'SET_DATA_STUDENT',
            payload: { value, typedata }
        })
    }
}

const selectStudenEmail = (dispatch) => {
    return async (value) => {
        dispatch({
            type: 'SET_SELECT_STUDENT',
            payload: { value }
        })
    }
}

//Metodos de DatePicker


const handleVisibility = (dispatch) => {
    return async () => {
        dispatch({
            type: 'SET_VISIBILITY_STATE',
            payload: {
                isVisible: true,
            }
        })
    }

}
export const { Context, Provider } = createDataContext(
    NewRegisterReducer,
    {
        clearState,
        handleEmailChange,
        selectStudenEmail,
        handleInputChange,
        getCatalog,
        handleVisibility,
        store

    },
    initialState
);