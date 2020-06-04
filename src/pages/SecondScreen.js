import React from 'react';
import {View, TextInput, Button, Alert, Text} from 'react-native';
import firebase from '../database/Firebase';
import {useNavigation} from '@react-navigation/native';
import { Fab, TexT, VieW, TextInpuT } from "../styles/styles";

class SecondScreen extends React.Component {
   

    constructor() {
        super();
        this.state = { 
            name: '',
            desc: '',
            img: ''
        }
    }

    onChangeTextInput(value, field) {

        const state = this.state;
        state[field] = value;
        this.setState(state);
        
    }

    saveContent() {

        const { navigation } = this.props;
        if(this.state.name != "" && this.state.desc != "") { 
        firebase.firestore().collection('contents').add(
            {
                name: this.state.name,
                desc: this.state.desc,
                img: this.state.img
            }
        )
        .then(() =>{console.log("Salvou")}, navigation.navigate('ContentScreen'))
        .catch(()=> {console.log("Erro ao salvar")})
        }
        else {Alert.alert("Campos em branco","Os campos Nome e Descrição não podem estar em branco",
        [{text: "ok"} ]
        )
        }
    }


    render() {

        

    return(
        <View>
            <TextInpuT placeholder="Nome"
                value={this.state.name}
                onChangeText={(value)=>this.onChangeTextInput(value, 'name')} 
                />
                <TextInpuT placeholder="Descrição"
                 value={this.state.desc}
                onChangeText={(value)=>this.onChangeTextInput(value, 'desc')}
                />
                <TextInpuT placeholder="Imagem"
                 value={this.state.img}
                onChangeText={(value)=>this.onChangeTextInput(value, 'img')}
                />
            <Button 
            color="#4473ba" 
            title="Salvar" 
            onPress={()=>this.saveContent()}/>
         </View>  
    )
}
}

export default function(props) {
    const navigation = useNavigation();
    return <SecondScreen {...props} navigation={navigation} />
}