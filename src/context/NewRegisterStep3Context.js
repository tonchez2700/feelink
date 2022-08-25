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
    finalState: false,
    fetchingData: false,
    campains: [],
    dataPayment: [],
    cost: '',
    TotalCost: 0,
    data: '',

}

const NewRegisterStep3Reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'CLEAR_STATE':
            return {
                ...initialState,
            }
        case 'CLEAR_STATE_ALL':
            return {
                ...state,
                finalState: action.payload.state,
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
        case 'SET_INPUT':
            let typeData = action.payload.typeData
            return {
                ...state,
                data: {
                    ...state.data,
                    [typeData]: action.payload.value
                }
            }
        case 'ADD_PAYMENT':
            let amount = 0;
            let newData = [action.payload.data];
            newData.forEach(element => {
                amount = state.TotalCost + parseInt(element.amount)
            });
            newData = [...state.dataPayment, action.payload.data];
            return {
                ...state,
                dataPayment: newData,
                TotalCost: amount
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


const getcampainsByStatus = (dispatch) => {
    return async () => {
        try {
            dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: true } });
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const token = user.token
            const response = await httpClient
                .get(`campains?campain_status_id=1`, {
                    'Authorization': `Bearer ${token}`,
                }
                );
            if (response != '') {
                const listcampain = response.map(item => ({
                    id: item.id,
                    title: item.name,
                }))
                dispatch({
                    type: 'SET_DATA_CAMPAINS',
                    payload: { listcampain }
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


const handleInputChange = (dispatch) => {
    return async (value, typeData) => {
        dispatch({
            type: 'SET_INPUT',
            payload: { value, typeData }
        })
    }
}

const store = (dispatch) => {
    return async (data, payments, paymentDe, TotalCost) => {

        const dataTotal = {
            student_id: data.student_id,
            rfc: "XAXX010101000",
            user: data.user,
            rows: data.data,
            subtotal: data.cost,
            total: data.cost,
            discount: 0,
            payments
        }
        if ((paymentDe - TotalCost) == 0) {
            Alert.alert(
                "Correcto",
                'Plan de estudio agregado correctamente.',
                [{
                    text: "Aceptar",
                    onPress: rootNavigation.navigate('NewRegisterStep4', dataTotal)
                }]
            )
        } else {
            Alert.alert(
                "Saldo Pendien",
                "Hay saldo pendiente por definir fecha de pago",
                [{
                    text: "Aceptar"
                }]
            )
        }
    }
}
const storeFinal = (dispatch) => {
    return async (dataTotal) => {
        const rows = []
        dataTotal.rows.forEach(element => {
            if (element.reg_product_type_id == 1) {
                rows.push({
                    reg_product_type_id: element.educationalProgram.reg_product_type_id,
                    group_id: element.educationalProgram.group_id
                })
            } else {
                rows.push({
                    reg_product_type_id: element.benefit.reg_product_type_id,
                    group_id: element.benefit.group_id
                })
            }
        });
        console.log(rows);
        const data = {
            rfc: dataTotal.rfc,
            student_id: dataTotal.student_id,
            subtotal: dataTotal.subtotal,
            discount: dataTotal.discount,
            total: dataTotal.total,
            is_taxable: 1,
            rows: rows,
            payments: dataTotal.payments
        }
        dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: true } });
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        const token = user.token
        console.log(data);
        const response = await httpClient.post(
            'sellings', data,
            { 'Authorization': `Bearer ${token}` }
        );
        console.log(response);
        if (response.status) {
            dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: false } });
            dispatch({ type: 'CLEAR_STATE_ALL', payload: { state: true } });
            Alert.alert(
                "Correcto",
                'Registro creado correctamente.',
                [{
                    text: "Aceptar",
                    onPress: rootNavigation.navigate('HomeScreen')
                }]
            )
        } else {
            dispatch({ type: 'CLEAR_STATE_ALL', payload: { state: false } });
            Alert.alert(
                "Ocurrio un problema",
                "Servicio no disponible",
                [{
                    text: "Aceptar"
                }]
            )
        }
    }
}

const handleInputChangePayment = (dispatch) => {
    return async (data) => {
        const validated = validateData(data)
        if (!validated.error) {
            dispatch({
                type: 'ADD_PAYMENT',
                payload: {
                    data: {
                        ...data,
                        reg_payment_type_id: 1,
                        is_paid: 0,
                        is_taxable: 1
                    }
                }
            })
        } else {
            Alert.alert(
                "Ha ocurrido un error",
                validated.message,
                [{
                    text: "Aceptar",
                }]
            )
        }

    }
}
const validateData = (data) => {
    let result = { error: false }
    if (!data.promess_date)
        return { ...result, error: true, message: 'Falta seleccionar Fecha de pago' }
    if (!data.amount)
        return { ...result, error: true, message: 'Falta seleccionar Cantidad a pagar' }
    return result
}

export const { Context, Provider } = createDataContext(
    NewRegisterStep3Reducer,
    {
        clearState,
        getcampainsByStatus,
        handleInputChange,
        handleInputChangePayment,
        store,
        storeFinal,


    },
    initialState
);