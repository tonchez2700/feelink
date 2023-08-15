import React, { useContext, useState, useEffect } from 'react'
import { Text, TouchableOpacity, StyleSheet, Dimensions, ViewBase } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'
import { Dropdown } from 'react-native-element-dropdown';
import { View } from 'react-native-web';

const { width } = Dimensions.get('window');


const DropD = ({ data, type, value, fun }) => {
    const navigation = useNavigation();
    return (

        <Dropdown
            style={styles.dropdown}
            selectedTextProps
            searchPlaceholder="Buscar..."
            placeholderStyle={{ color: 'gray' }}
            selectedTextStyle={{ color: 'black' }}
            placeholder={type}
            valueField="id"
            labelField="name"
            value={value}
            data={data}
            onChange={item => {
                fun(item.id)
            }}
        />
    )
}

export default DropD

const styles = StyleSheet.create({


    dropdown: {
        borderColor: 'black',
        borderBottomWidth: .5,
        color: 'gray',
    },
});
