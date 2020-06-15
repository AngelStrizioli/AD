import React, {Component} from 'react'
import {Text, View, StyleSheet} from 'react-native'
import WebView from 'react-native-webview'

export default function VideoPlayerView(props) {
  const item = props.route.params.item
  console.log(item.title)
    return(
      <View style={styles.container}>
        <WebView
          style={{flex:1}}
          javaScriptEnabled={true}
          source={{ uri: 'https://www.youtube.com/results?search_query='+`${item.title}`+' trailer' }}
         />
      </View>
    )
  }

const styles = StyleSheet.create({
  container:{
    flex:1,
    margin:'1%',
  },
})
