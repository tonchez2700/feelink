import React, { useContext, useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Input, Icon } from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Context as NewRegisterContext } from '../context/NewRegisterContext';
import useDatePicker from './../hooks/useDatePicker'
import tw from 'tailwind-react-native-classnames';
import moment from 'moment';
const DateRange = ({ placeholder, fun, value, tmp, tmpfun }) => {
    const { state, handleVisibility, handleInputChange } = useContext(NewRegisterContext);

    return (
        <View>
            <View style={tw`flex-row`}>
                <Input
                    rightIcon={
                        <TouchableOpacity onPress={() => handleVisibility('date')}>
                            <Icon type='font-awesome' name='calendar' size={25} color='black' />
                        </TouchableOpacity>
                    }
                    editable={false}
                    inputContainerStyle={{
                        borderBottomColor: 'gray'
                    }}
                    placeholder={placeholder}
                    labelStyle={{ color: '#133C60' }}
                    value={value}
                />
            </View>
            {state.isVisible && (
                <DateTimePicker
                    testID="tmpDate"
                    dateFormat="day month month"
                    value={tmp}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={(event, date) => {
                        fun(date)
                        tmpfun(date)
                    }}
                />
            )}
        </View>
    )
}

export default DateRange

const styles = StyleSheet.create({})
