import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight,
    TouchableWithoutFeedback,
    ScrollView,
    Dimensions,
    Share,
    Animated,
    ImageBackground,
    Button,
} from 'react-native'


import { FontAwesome } from '@expo/vector-icons';
import TabViewEpisode from './TabViewEpisode'
import TextGradient from 'react-native-linear-gradient'

const {width, height} = Dimensions.get('window')

function Separator() {
    return <View style={styles.separator} />;
  }

class PaginaPelicula extends Component {
    constructor(props){
        super(props)
        this.state = {
            // estos state hardcodeados despues los vamos a tener que tomar desde la API
            name:'Rick and Morty', 
                sourceImage:'https://es.web.img3.acsta.net/pictures/18/10/31/17/34/2348073.jpg',
                sourceVideo:'https://www.youtube.com/watch?v=qPDqQDTnJKE',
                cast:'Justin Roiland, Chris Parnell, Sarah Chalke, Spencer Grammer',
                description:'La serie sigue las desventuras de un científico, Rick, y su fácilmente influenciable nieto, Morty, quienes pasan el tiempo entre la vida doméstica y los viajes espaciales, temporales e intergalácticos. Roiland es el encargado de darle voz a los dos personajes principales, y la serie también incluye las voces de Chris Parnell, Spencer Grammer y Sarah Chalke.',
                year:'2013',
                creator:'Justin Roiland y Dan Harmon',
                numOfEpisodes:'41',
                season:'4'
        

        };
    }

    render(){
        console.log(this.state.name)
        

        return(
            <ScrollView style={styles.container}>
                <ImageBackground 
                    style={styles.image} 
                    source={{uri: this.state.sourceImage }}
                >
                    <View style={styles.buttonPlay}>
                        <TouchableWithoutFeedback onPress={null}>
                            <Text>
                                <FontAwesome 
                                    style={styles.iconPlay}
                                    name='play-circle'
                                    size={90}
                                    color='white'
                                /> 
                            </Text>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.nameContainer}>
                        <Text style={[styles.text, styles.titleShow]}>{this.state.name}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.descriptionContainer}>
                    <View style={styles.subtitle}>
                        <Text style={[styles.text, styles.subtitleText]}>{this.state.year}</Text>
                        <Text style={[styles.text, styles.subtitleText]}>{this.state.numOfEpisodes}</Text>
                        <Text style={[styles.text, styles.subtitleText]}>{this.state.season} Season</Text>
                    </View>
                    <View style={styles.description}>
                        <Text style={[styles.text, styles.light]}>{this.state.description}</Text>
                    </View>
                    <View style={styles.description}>
                        <Text style={styles.text}>Elenco: {this.state.cast}</Text>
                        <Text style={styles.text}>Creadores: {this.state.creator}</Text>
                        <View style={styles.shareListIcons}>
                            <View style={styles.myListIcon}>
                                <FontAwesome 
                                    style={styles.listIcon}
                                    name='check'
                                    color='grey'
                                    size={25}
                                />
                                <Text style={styles.text}>Mi Lista</Text>
                            </View>
                            <View style={styles.myShareIcon}>
                                <FontAwesome
                                    style={styles.shareIcon}
                                    name='share-square-o'
                                    color='grey'
                                    size={25}
                                />
                                <Text style={styles.text}>Compartir</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <TabViewEpisode />
                
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    nameContainer:{
        backgroundColor:'transparent'
    },
    titleShow:{
        fontSize: 35,
        paddingLeft:10,
        marginBottom:5,
        color:'white'
    },
    image:{
        width: width,
        height:300,
    },
    container:{
        flex: 1,
        backgroundColor: '#181818' ,
    },
    buttonPlay:{
        justifyContent: 'center',
        flex:1,
        alignItems: 'center'
    },
    iconPlay:{
        opacity: 0.8,
        backgroundColor:'transparent',
    },
    descriptionContainer:{
        paddingHorizontal:20,
        marginTop:5,
    },
    subtitle:{
        flexDirection: 'row',
    },
    subtitleText:{
        marginRight:20,
    },
    text:{
        color:'#b3b3b3',
        fontSize: 16,
        textAlign: 'justify'
    },
    shareListIcons:{
        flexDirection: 'row',
        marginVertical: 30,
    },
    listIcon:{
        height: 25,
    },
    shareIcon:{
        height: 25,
    },
    myListIcon:{
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 30,
    },
    myShareIcon:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    description:{
        marginVertical: 10
    },
    light:{
        fontWeight: '200'
    },
    botonInfo:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 180, 
    },
    separator: {
        marginVertical: 2,
        borderBottomColor: 'red',
        borderBottomWidth: 3,
    },
   
    

})

export default PaginaPelicula


