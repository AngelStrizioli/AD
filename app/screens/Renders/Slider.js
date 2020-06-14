import React, {Component} from 'react'
import {Text, View, Image, Dimensions, StyleSheet} from 'react-native'
import Swiper from 'react-native-swiper'

const {width} = Dimensions.get('window')

const Slider = props => (
  <View style={styles.container}>
    <Image style={styles.image} source={props.uri}/>
  </View>
)

const datos = [
  {
    "key":6,
    "name":"24: Legacy",
    "image":"https://static.tvmaze.com/uploads/images/medium_portrait/90/225030.jpg"
 },
 {
    "key":7,
    "name":"Colony",
    "image":"https://static.tvmaze.com/uploads/images/medium_portrait/91/229234.jpg"
 },
 {
    "key":8,
    "name":"The Walking Dead",
    "image":"https://static.tvmaze.com/uploads/images/medium_portrait/67/168817.jpg"
 },
 {
    "key":9,
    "name":"Taken",
    "image":"https://static.tvmaze.com/uploads/images/medium_portrait/100/250528.jpg"
 },
 {
    "key":10,
    "name":"This is us",
    "image":"https://static.tvmaze.com/uploads/images/medium_portrait/70/175831.jpg"
 },
 {
    "key":11,
    "name":"Superstore",
    "image":"https://static.tvmaze.com/uploads/images/medium_portrait/69/174909.jpg"
 },
 {
    "key":12,
    "name":"Lethal Weapon",
    "image":"https://static.tvmaze.com/uploads/images/medium_portrait/93/234808.jpg"
 },
 {
    "key":13,
    "name":"The 100",
    "image":"https://static.tvmaze.com/uploads/images/medium_portrait/94/236401.jpg"
 },
 {
    "key":14,
    "name":"Homeland",
    "image":"https://static.tvmaze.com/uploads/images/medium_portrait/101/254425.jpg"
 }
]

const styles = {
  container:{
    flex:1,
    justifyContent: 'center'
  },
  image:{
    flex:1,
    width: width
  }
}

export default class extends Component{
  constructor(props){
    super(props)
    this.state={
      imagesSlider: [
        require('./img/twd.jpg'),
        require('./img/suits.jpg')


      ]
    }
  }
  render(){
    return(
        <Swiper
          autoplay
          height={400}
          dotColor="transparent"
          activeDotColor="white"
        >
        {
          this.state.imagesSlider.map((item, i) => <Slider 
            uri={item}
            key={i}
            />)
        }
        </Swiper>
    )
  }
}