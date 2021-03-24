import React, {useContext} from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import {useQuery} from '@apollo/react-hooks'
import theme from '../../theme'
import {GETAUTH} from '../../graphql/queries'
import AppBarTab from './AppBarTab'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor : theme.colors.appBar,
    flexDirection: 'row',
    height: 80,
    display : 'flex',
    alignItems: 'center'
  }
});

const AppBar = () => {
  const { data } = useQuery(GETAUTH);

  if(!data){
    return null
  }
  else{
  return (
  <View style={styles.container}>
      <ScrollView horizontal>
      <AppBarTab text="Repositories" link="/" />
      {data.authorizedUser ?
        <AppBarTab text="Create a review" link="/createreview"/>
       : <></>}
      {data.authorizedUser ?
        <AppBarTab text="My reviews" link="/myreviews"/>
       : <></>}
      {data.authorizedUser ?
        <AppBarTab text="Sign out" link="/signout"/>
       : <AppBarTab text="Sign in" link="/signin"/>}
       {data.authorizedUser ?
        <></>
       : <AppBarTab text="Sign up" link="/signup"/>}
      </ScrollView>
  </View>
  )
  }
};

export default AppBar;