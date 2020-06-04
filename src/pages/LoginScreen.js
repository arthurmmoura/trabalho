import React from 'react';
import { View, Text, TextInput, Button, Alert, ActivityIndicator } from 'react-native'; 
//import firebase from 'firebase';
import firebase from '../database/Firebase.js';

import {useNavigation} from '@react-navigation/native';

class LoginScreen extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            mail: '',
            password: '', 
            isLoading: false,
        }
    }

    componentDidMount() {

        
    }

    tryLogin(){

        this.setState({isLoading: true});

        console.log("usuario", this.state.mail," senha ",this.state.password);

        const { mail, password} = this.state;

        firebase.auth().signInWithEmailAndPassword(mail, password)
        .then(user => {console.log("usuario logado", user)
        this.props.navigation.navigate('ContentScreen');
        })
        .catch(error => {
            console.log("erro", error)
            if(error.code === 'auth/user-not-found') {
            Alert.alert("Usuario nao encontrado", "Deseja cadastrar um novo usuario?",
            [{text: 'Não', onPress: () => {console.log("Usuario não quer criar conta")}},
            {
                text: 'Sim',
                onPress: () => {
                    console.log("Usuario quer criar uma conta");
                    firebase.auth().createUserWithEmailAndPassword(mail, password)
                    .then(user => {console.log("Usuario Criado", user)})
                    .catch(error => {console.log("Erro na criação do usu[ario", error)})
                }
            }
        ]);
    }
    })
        .finally(() => {console.log("termniou")
        this.setState({isLoading: false});
        })

        console.log("acabou o trylogin");

    }

    onChangeMail(value){
        this.setState({mail: value});
    }

    onChangePassword(value){
        this.setState({password: value});
    }
    
    renderButton() {

        if(this.state.isLoading)
            return <ActivityIndicator />

        return(
            <Button 
                   color="#4473ba" 
                   title="Entrar" 
                   onPress={()=>this.tryLogin()}/>
        )
    }

    render() {


        return(
            <View>
                <TextInput placeholder="user@email.com"
                           value={this.state.mail}
                           onChangeText={(value)=>this.onChangeMail(value)}
                           
                           />
                <TextInput placeholder="******"
                            value={this.state.password}
                            secureTextEntry
                            onChangeText={(value)=>this.onChangePassword(value)}
                                />
                { this.renderButton()}                
              
            </View>    
        );
    }

};

export default function(props) {
    const navigation = useNavigation();
    return <LoginScreen {...props} navigation={navigation} />
}