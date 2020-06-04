import React from 'react';
import {View, TextInput, Button, Text} from 'react-native';
import firebase from '../database/Firebase';
import {useNavigation} from '@react-navigation/native';
import { TexT } from '../styles/styles';
import {useRoute} from '@react-navigation/native';

class ContentDetailScreen extends React.Component {
   

    constructor() {
        super();
    }

    render() {

        const {route} = this.props;

        return(
            <View>
                <TexT style={{color: 'black'}}>ID: {this.props.route.params.id}</TexT>
                <TexT style={{color: 'black'}}> Nome: {this.props.route.params.name}</TexT>
            </View>
        )
    }
}

export default function(props) {
    const route = useRoute();

    return <ContentDetailScreen {...props} route={route}/>;
}