import { Alert } from 'react-native'
import createDataContext from './createDataContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import httpClient from '../services/httpClient'
import * as rootNavigation from '../helpers/rootNavigation';
import moment from 'moment';


const initialState = {
    error: false,
    message: "",
    fetchingData: false,
    campains: [],
    dataDiplomant: [],
    count: 0,
    cost: '',
    subTotalCost: 0,
    TotalCost: 0,
    finalCost: 0,
    discout: 0,
    dataProgram: [],
    dataBene: [],
    dataItems: [],
    data: '',
    listDiscount: [
        { label: '0%', value: 0 },
        { label: '5%', value: 5 },
        { label: '10%', value: 10 },
        { label: '15%', value: 15 },
        { label: '20%', value: 20 },
        { label: '25%', value: 25 },
        { label: '30%', value: 30 },
        { label: '35%', value: 35 },
        { label: '40%', value: 40 },
        { label: '45%', value: 45 },
        { label: '50%', value: 50 },
    ]

}

const NewRegisterStep2Reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'CLEAR_STATE':
            return {
                campains: state.campains,
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
        case 'DELETE_ENTRY_TYPE_ITEM':
            let cost = 0
            let dataItems = state.dataItems.filter((item) => item.count !== action.payload.count);
            dataItems.map((item) => {
                if (item.reg_product_type_id == 1) {
                    cost = cost + item.educationalProgram.cost
                } else {
                    cost = cost + item.benefit.cost
                }
            })
            return {
                ...state,
                dataItems,
                finalCost: cost
            }
        case 'SET_CAMP':
            let DataCamp = action.payload.typeData
            return {
                ...state,
                data: {
                    ...state.data,
                    [DataCamp]: action.payload.value,
                    reg_product_type_id: action.payload.value.type
                },
            }
        case 'SET_PROG':
            let count = state.count + 1
            let DataProg = action.payload.typeData
            return {
                ...state,
                count: count,
                data: {
                    ...state.data,
                    count: count,
                    [DataProg]: action.payload.value,
                    reg_product_type_id: action.payload.value.reg_product_type_id,
                },
            }
        case 'SET_DATA_ITEMS':
            let typeItem = action.payload.type
            return {
                ...state,
                dataItems: [
                    ...state.dataItems,
                    typeItem = action.payload.value
                ],
                data: '',
            }
        case 'SET_DATA_CAMPAINS':
            return {
                ...state,
                campains: action.payload.listcampain,
            }
        case 'SET_FINAL_COST':
            return {
                ...state,
                finalCost: action.payload.final
            }
        case 'SET_TOTAL_COST':
            return {
                ...state,
                subTotalCost: action.payload.totalCost,
                finalCost: action.payload.totalCost
            }
        case 'SET_DISCOUNT':
            return {
                ...state,
                discout: action.payload.value
            }
        case 'SET_DATA_PROGRAM':
            return {
                ...state,
                dataProgram: action.payload.listProgram
            }
        case 'SET_DATA_BENE':
            return {
                ...state,
                dataBene: action.payload.listBene
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
const getprogram = (dispatch) => {
    return async (id) => {
        try {
            dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: true } });
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const token = user.token
            const response = await httpClient
                .get(`groups?diplomat_type_id=1&campain_id=${id}`, {
                    'Authorization': `Bearer ${token}`,
                }
                );
            if (response != '') {
                const listProgram = response.map(item => ({
                    group_id: item.id,
                    reg_product_type_id: item.diplomat.diplomat_type_id,
                    title: item.diplomat.name,
                    cost: item.cost
                }))
                dispatch({
                    type: 'SET_DATA_PROGRAM',
                    payload: { listProgram }
                });
            } else {
                const listProgram = [];
                dispatch({
                    type: 'SET_DATA_PROGRAM',
                    payload: { listProgram }
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
const getBene = (dispatch) => {
    return async (id) => {
        try {
            dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: true } });
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const token = user.token
            const response = await httpClient
                .get(`groups?diplomat_type_id=2&campain_id=${id}`, {
                    'Authorization': `Bearer ${token}`,
                }
                );
            if (response != '') {
                const listBene = response.map(item => ({
                    group_id: item.id,
                    reg_product_type_id: item.diplomat.diplomat_type_id,
                    title: item.diplomat.name,
                    cost: item.cost
                }))
                dispatch({
                    type: 'SET_DATA_BENE',
                    payload: { listBene }
                });
            } else {
                const listBene = [];
                dispatch({
                    type: 'SET_DATA_BENE',
                    payload: { listBene }
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

const handleInputChangeCamp = (dispatch) => {
    return async (value, typeData) => {
        dispatch({
            type: 'SET_CAMP',
            payload: { value, typeData }
        })
    }
}
const handleInputChangeProg = (dispatch) => {
    return async (value, typeData) => {
        dispatch({
            type: 'SET_PROG',
            payload: { value, typeData }
        })
    }
}

const getCostFinal = (dispatch) => {
    return async (total, discount) => {
        let result = (total * discount) / 100
        let final = total - result
        dispatch({
            type: 'SET_FINAL_COST',
            payload: { final }
        })
    }
}
const handleInputItems = (dispatch) => {
    return async (value, type) => {
        let validated;

        if (value.reg_product_type_id == 1) {
            validated = validateDiplo(value)
        } else {
            validated = validateBenefit(value)
        }

        if (!validated.error) {
            dispatch({
                type: 'SET_DATA_ITEMS',
                payload: { value, type }
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

const store = (dispatch) => {
    return async (data, cost, user, id) => {

        const dataPlan = {
            student_id: id,
            data,
            cost,
            user
        }
        if (data != '') {
            Alert.alert(
                "Correcto",
                'Plan de estudio agregado correctamente.',
                [{
                    text: "Aceptar",
                    onPress: rootNavigation.navigate('NewRegisterStep3', dataPlan)
                }]
            )
        } else {
            Alert.alert(
                "Falta agregar campo",
                'Agerga un plan de estudio ',
                [{
                    text: "Aceptar"

                }]
            )
        }


    }
}

const getTotalCost = (dispatch) => {
    return async (value) => {
        let totalCost = 0
        value.forEach(element => {
            if (element.reg_product_type_id == 1) {
                totalCost = totalCost + element.educationalProgram.cost
            } else {
                totalCost = totalCost + element.benefit.cost
            }

        });
        dispatch({
            type: 'SET_TOTAL_COST',
            payload: { totalCost }
        })
    }
}
const handleDiscountChange = (dispatch) => {
    return async (value) => {
        dispatch({
            type: 'SET_DISCOUNT',
            payload: { value }
        })
    }
}
const validateDiplo = (data) => {
    let result = { error: false }
    if (!data.campaignSelection)
        return { ...result, error: true, message: 'Falta seleccionar una Campaña.' }
    if (!data.educationalProgram)
        return { ...result, error: true, message: 'Falta seleccionar Programa Educativo' }
    return result
}
const validateBenefit = (data) => {
    let result = { error: false }
    if (!data.campaignSelection)
        return { ...result, error: true, message: 'Falta seleccionar una Campaña.' }
    if (!data.benefit)
        return { ...result, error: true, message: 'Falta seleccionar Programa Educativo' }
    return result
}

const handleDeleteEntryItem = (dispatch) => {
    return async (count) => {
        dispatch({ type: 'DELETE_ENTRY_TYPE_ITEM', payload: { count } });
    }
}

export const { Context, Provider } = createDataContext(
    NewRegisterStep2Reducer,
    {
        clearState,
        getcampainsByStatus,
        getprogram,
        getBene,
        getTotalCost,
        handleInputChangeCamp,
        handleDeleteEntryItem,
        handleInputChangeProg,
        handleDiscountChange,
        getCostFinal,
        handleInputItems,
        store,


    },
    initialState
);