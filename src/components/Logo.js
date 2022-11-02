import React from 'react'
import { StyleSheet, Image, View } from 'react-native'
import Images from '@assets/images';

const Logo = ({ size, ...otherProps }) => {
    
    let log_style = {};
    
    switch (size){
        case 'xs':
            log_style = styles.xs
            break;
        case 'sm':
            log_style = styles.sm
            break;
        case 'md':
            log_style = styles.md
            break;
        case 'lg':
            log_style = styles.lg
            break;
    }
    return (
        <View {...otherProps}>
            <Image source={Images.icon} style={log_style} />
        </View>
    )
}

export default Logo

const styles = StyleSheet.create({
    xs: {
        width: 150,
        height: 40
    },
    sm: {
        width: 56,
        height: 56,
    },
    md: {
        width: 250,
        height: 87,
    },
    lg: {
        width: 350,
        height: 122,
    },
})
