import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Context as NewRegisterStep2Context } from '../context/NewRegisterStep2Context'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';

const EntryList = ({ data, TotalCost, fun, listDiscount, discount, value, deleteItem }) => {

    const { state, getCostFinal } = useContext(NewRegisterStep2Context);
    const navigation = useNavigation();
    return (

        <View>
            {
                data.map((item) =>
                    <View key={item.count}>
                        {item.reg_product_type_id == 2
                            ?
                            <View style={[tw`flex-row items-start`, { borderBottomWidth: .8 }]}>
                                <View style={[tw`flex-col`, { width: '65%' }]}>
                                    <Text style={tw`text-xs`}>BENEFICIO-{item.campaignSelection.title}</Text>
                                    <Text style={[tw` text-sm`]}>{item.benefit.title}:</Text>
                                </View>
                                <View style={[tw`flex-row`, { width: '35%', justifyContent: 'center' }]}>
                                    <Text style={[tw`text-sm m-2`]}>${item.benefit.cost}</Text>
                                    <TouchableOpacity
                                        key={item.count}
                                        onPress={() => deleteItem(item.count)}>
                                        <Icon type='font-awesome-5' name='trash' size={18} color='red' style={tw`m-2`} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            :
                            <View style={[tw`flex-row items-start`, { borderBottomWidth: .8 }]}>
                                <View style={[tw`flex-col`, { width: '65%' }]}>
                                    <Text style={tw`text-xs`}>DIPLOMADO-{item.campaignSelection.title}</Text>
                                    <Text style={[tw` text-sm `]}>{item.educationalProgram.title}:</Text>
                                </View>
                                <View style={[tw`flex-row`, { width: '35%', justifyContent: 'center' }]}>
                                    <Text style={[tw`text-sm m-2 `]}>${item.educationalProgram.cost}</Text>
                                    <TouchableOpacity
                                        key={item.count}
                                        onPress={() => deleteItem(item.count)}>
                                        <Icon type='font-awesome-5' name='trash' size={18} color='red' style={tw`m-2`} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                    </View>
                )}
            {
                TotalCost != 0

                    ?
                    <View style={tw`flex-row justify-between mt-2`}>

                        <View style={tw`flex-row items-center`}>
                            <Text style={[tw`text-base`]}>Descuento: </Text>
                            <Dropdown
                                style={styles.dropdown}
                                selectedTextProps
                                dropdownPosition={'auto'}
                                placeholderStyle={{ color: 'gray' }}
                                selectedTextStyle={{ color: 'black' }}
                                valueField="value"
                                labelField="label"
                                value={value}
                                data={listDiscount}
                                onChange={item => {

                                    fun(item.value)
                                    getCostFinal(state.subTotalCost, item.value)
                                }}
                            />
                        </View>
                        <View style={tw`flex-col items-start`}>
                            <Text style={[tw`text-sm text-left`, { width: 110 }]}>Descuento: {discount}%</Text>
                            <Text style={[tw`text-sm text-left w-24`]}>Total: ${TotalCost}</Text>
                        </View>

                    </View>
                    :
                    null
            }
        </View>
    )
}

export default EntryList

const styles = StyleSheet.create({
    dropdown: {
        borderColor: 'black',
        borderWidth: 1,
        paddingLeft: 10,
        width: 70,
        color: 'gray',
    },
})
