import React from 'react';
import { ActivityIndicator, ScrollView} from 'react-native';
import firebase from '../database/Firebase';
import {View, Text} from 'react-native';
import { Fab, TexT, VieW } from "../styles/styles";
import ContentItem from '../components/ContentItem';
import {useNavigation} from '@react-navigation/native';


class ContentScreen extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            contents: [],
            isLoading: true,
        }
    }

    componentDidMount() {
        firebase.firestore().collection('contents').onSnapshot((query)=>this.contentUpdate(query));
    }

    contentUpdate(query) {
        const contents = [] ;
        query.forEach((doc) => {
            const {name, desc, img} = doc.data();
            contents.push({
                id: doc.id,
                name,
                desc,
                img
            })
        });
        this.setState({
            contents,
            isLoading: false,
        })
    }

    renderActivityIndicator() {

        if(this.state.isLoading) {
            return(
                <VieW>
                    <ActivityIndicator size="large"/>
                </VieW>
            )
        }
    }

    render() {


        this.renderActivityIndicator() 

        const { contents } = this.state;
        const { navigation } = this.props;

        const items = contents.map((content, index) =>
            <ContentItem name={content.name}
                desc={content.desc}
                img={content.img}
                id={content.id}
                onPress={()=>navigation.navigate('ContentDetailScreen',
                ({id: content.id, desc: content.desc, name: content.name})
                )}/>
        );

        return(
            <VieW>
                <ScrollView>
                    {items}
                </ScrollView>
                <Fab onPress={()=> navigation.navigate('SecondScreen') }>
                    
                <TexT>+</TexT></Fab>
                
            </VieW>
        )
    } 
}

export default function(props) {
    const navigation = useNavigation();
    return <ContentScreen {...props} navigation={navigation} />
}