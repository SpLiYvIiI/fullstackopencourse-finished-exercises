import React from 'react'
import {View,StyleSheet} from 'react-native'
import Text from '../Utilities/Text'
const styles = StyleSheet.create({
    stats: {
        flexGrow: 1,
        paddingTop: 5,
        paddingLeft: 15,
        paddingRight : 15,
    },
})
const RepStats  = ({num,text,testID}) => {
    return(
    <View style={styles.stats}>
        <Text testID={testID} fontWeight="bold" style={{textAlign: 'center'}}>{num >= 1000 ? Math.round(num / 1000 * 10) / 10 + 'k' : num}</Text> 
        <Text style={{textAlign : 'center'}}>{text}</Text>
    </View>
    )
} 

export default RepStats;