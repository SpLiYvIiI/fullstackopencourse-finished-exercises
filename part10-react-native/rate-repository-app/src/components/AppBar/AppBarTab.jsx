import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Text from '../Utilities/Text'
import {Link} from 'react-router-native'

const styles = StyleSheet.create({
  text : 
  {
    flexGrow: 0,
    paddingLeft: 15,
    paddingRight : 15 
  }
});
const AppBarTab = ({text,link}) => {
return (
    <TouchableWithoutFeedback >
    <Link to={link}>
    <Text color="appBarText" fontWeight="bold" fontSize="subheading" style={styles.text}>
      {text}
    </Text>
    </Link>
    </TouchableWithoutFeedback>
)
}
export default AppBarTab;