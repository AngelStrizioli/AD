import React, {Component} from 'react'
import {Text, View, StyleSheet} from 'react-native'
import WebView from 'react-native-webview'

export default function VideoPlayerView() {
    return(
      <View style={styles.container}>
        <WebView
          style={{flex:1}}
          javaScriptEnabled={true}
          source={{ uri: 'https://www.youtube.com/watch?v=0kDgFKTJHAQ.mp4' }}
         />
      </View>
    )
  }

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:'10%',
  },
})
