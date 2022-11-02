import React from 'react'
import { Header, Icon } from 'react-native-elements';
import Logo from './Logo';
import Images from '@assets/images';

const SimpleNavBar = () => {
    return (
        <Header
            backgroundColor="#2D5DA0" 
            centerContainerStyle={{margin: 40}}
            centerComponent={ <Logo size='xs' /> }
            barStyle="default"/>
    )
}

export default SimpleNavBar
