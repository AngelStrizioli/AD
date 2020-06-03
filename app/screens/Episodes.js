import React, {Component} from 'react'
import {View, Text, TouchableWithoutFeedback, ImageBackground, StyleSheet} from 'react-native'
import { FontAwesome } from '@expo/vector-icons';


/* la data representa la serie que estamos buscando en el json que nos va a devolver la api y el item es el episodio en concreto*/

class Episodes extends Component{
  renderEpisodes(){
    const res = this.props.data.map((item, i) =>{ 
      const img = item.image == null ? 'https://memegenerator.net/img/images/300x300/14965197.jpg' : item.image.medium
      return(
        <View style={styles.video} key={i}>
          <View style={styles.videoEpisode}>
            <ImageBackground style={styles.image} source={{uri: img}}>
              <View style={styles.buttonPlay}>
                <TouchableWithoutFeedback>
                  <View style={{backgroundColor: 'transparent'}}>
                    <FontAwesome 
                      style={styles.iconPlay}
                       name='play-circle'
                       size={30}
                       color='white'
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </ImageBackground>
            <View style={styles.episodieName}>
              <Text style={styles.text}>{item.number}. {item.name}</Text> {/* nombre y numero de episodio */}
              <Text style={styles.text}>{item.runtime}</Text> {/* tiempo que dura cada episodio */}
            </View>
          </View>
          <Text style={styles.summary}>{item.summary}</Text>
        </View>
      )
    })
    return res
  }
  render(){
    return(
      <View stlye={styles.container}>
        {/*{this.renderEpisodes()} este es el metodo de arriba una vez tengamos la data lo activamos y listo*/}
        <Text style={{fontSize:50, color:'#b3b3b3', marginBottom:50}} > Estamos trabajando en esto</Text>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container:{
    marginHorizontal: 10,
  },
  image:{
    width: 150,
    height: 80,
    marginRight:10
  },
  buttonPlay:{
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  episodieName:{
    justifyContent: 'center'
  },
  videoEpisode:{
    flexDirection: 'row'
  },
  text:{
    color:'white'
  },
  summary:{
    color:'grey',
    marginVertical:10,
  },



})
export default Episodes
