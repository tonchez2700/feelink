import React, { useContext } from 'react'
import { TouchableOpacity } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Context as AuthContext } from '../context/AuthContext';
import Images from '@assets/images';
import Logo from './Logo';

const NavBar = () => {
    const { signout } = useContext(AuthContext);
    const navigation = useNavigation();
    return (
        <Header
            backgroundColor="#2D5DA0"
            barStyle="default"
            leftContainerStyle={{ justifyContent: 'center' }}
            rightContainerStyle={{ justifyContent: 'center' }}
            rightComponent={
                <TouchableOpacity
                    onPress={() => signout()}>
                    <Icon
                        name='sign-out'
                        type='font-awesome'
                        color='white' />
                </TouchableOpacity>
            } />

    )
}

export default NavBar
