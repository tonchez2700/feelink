import { useReducer } from 'react'
import moment from 'moment';

const initialState = {
    date: '',
    time: null,
    tmpDate: null,
    mode: 'date',
    isVisible: false
};

const datePickerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CLEAR_STATE':
            return initialState
        case 'HIDE_PICKER':
            return { ...state, isVisible: false }
        case 'SET_INITIAL_DATA':
            return { ...state, date: action.payload.date }
        case 'SET_VISIBILITY_STATE':
            return {
                ...state,
                tmpDate: state.tmpDate ? state.tmpDate : new Date(),
                isVisible: action.payload.isVisible,
                mode: action.payload.mode
            }
        case 'SET_DATE_VALUE':
            return {
                ...state,
                date: action.payload.date,
                tmpDate: action.payload.tmpDate,
                isVisible: false
            }
        case 'SET_TIME_VALUE':
            return {
                ...state,
                time: action.payload.time,
                tmpDate: action.payload.tmpDate,
                isVisible: false
            }
        case 'SET_DATE':
            return {
                ...state,
                date: action.payload.date,
                isVisible: false
            }
        default:
            return state
    }
}


const useDatePicker = (initialDate) => {

    const [state, dispatch] = useReducer(datePickerReducer, initialState);

    const handleVisibility = () => {
        dispatch({
            type: 'SET_VISIBILITY_STATE',
            payload: {
                isVisible: true
            }
        })
    }

    const changeDate = (value) => {
        dispatch({
            type: 'SET_DATE',
            payload: {
                date: value
            }
        })
    }

    const handleOnChangePicker = (selectedDate, mode) => {
        const currentDate = selectedDate
        if (selectedDate) {
            if (mode === 'date') {
                dispatch({
                    type: 'SET_DATE_VALUE',
                    payload: {
                        date: currentDate,
                        tmpDate: new Date(selectedDate)
                    }
                })
            } else {
                dispatch({
                    type: 'SET_TIME_VALUE',
                    payload: {
                        time: currentDate,
                        tmpDate: new Date(selectedDate)
                    }
                })
            }
        } else {
            dispatch({ type: 'HIDE_PICKER' })
        }
    }

    return {
        state,
        handleVisibility,
        handleOnChangePicker,
        changeDate
    };
}

export default useDatePicker
