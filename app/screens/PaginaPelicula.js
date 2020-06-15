import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    ImageBackground,
    
} from 'react-native'
import { Rating, AirbnbRating } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from 'react-native-gesture-handler';


const {width, height} = Dimensions.get('window')


function Separator() {
    return <View style={styles.separator} />;
  }

  

export default function PaginaPelicula(props) {

        const navigation = useNavigation();
        const item = props.route.params.item
     

        return(
            <ScrollView style={styles.container}>
                <ImageBackground 
                    style={styles.image} 
                    source={{uri: item.imagen }}
                >
                    <View style={styles.buttonPlay}>
                        <TouchableOpacity onPress={() => navigation.navigate('videoPlayer', {item})} >
                            <Text>
                                <FontAwesome 
                                    style={styles.iconPlay}
                                    name='play-circle'
                                    size={60}
                                    color='white'
                                /> 
                            </Text>
                        </TouchableOpacity>
                    </View>
                    
                </ImageBackground>
                    <View style={styles.nameContainer}>
                        <Text style={[styles.text, styles.titleShow]}>{item.title}</Text>
                    </View>
                <Rating type='custom'  fractions={1} startingValue={item.vote_average / 2 } imageSize={20} ratingTextColor='#009688' /> 
                <View style={styles.descriptionContainer}>
                    <View style={styles.subtitle}>
                        <Text style={[styles.text, styles.subtitleText]}>{item.release}</Text>
                    </View>
                    <View style={styles.description}>
                        <Text style={[styles.text, styles.light]}>{item.overview}</Text>
                    </View>
                    <View style={styles.description}>
                        <View style={styles.shareListIcons}>
                            <View style={styles.myListIcon}>
                            <TouchableOpacity >
                                <FontAwesome 
                                    style={styles.listIcon}
                                    name='check'
                                    color='#009688'
                                    size={35}
                                />
                                </TouchableOpacity>
                                <Text style={styles.text}>Mi Lista</Text>
                            </View>
                            <View style={styles.myShareIcon}>
                            <TouchableOpacity >
                                <FontAwesome
                                    style={styles.shareIcon}
                                    name='share-square-o'
                                    color='#009688'
                                    size={35}
                                />
                            </TouchableOpacity>
                                <Text style={styles.text}>Compartir</Text>
                            </View>
                        </View>
                    </View>
                </View>
                {/*<TabViewEpisode />*/}
                
            </ScrollView>
        )
    }


const styles = StyleSheet.create({
    nameContainer:{
        backgroundColor:'transparent'
    },
    titleShow:{
        fontSize: 24,
        paddingLeft:10,
        marginBottom:5,
        marginTop: 8,
        color:'#009688'
    },
    image:{
        width: 200,
        height: 300,
        marginLeft: '27%'
     },
    container:{
        flex: 1,
        backgroundColor: 'white' ,
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
        color:'#009688',
        fontSize: 16,
        textAlign: 'justify'
    },
    shareListIcons:{
        flexDirection: 'row',
        marginVertical: 30,
        marginLeft:'30%'
    },
    listIcon:{
        height: 35,
    },
    shareIcon:{
        height: 35,
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
        borderBottomColor: '#009688',
        borderBottomWidth: 3,
    },
   
    

})



