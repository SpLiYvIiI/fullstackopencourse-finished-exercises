import React from 'react';
import { StyleSheet, View } from 'react-native';
import {Switch,Route,Redirect} from 'react-router-native'
import RepositoryList from './RepositoryList'
import AppBar from './AppBar'
import SignIn from './SignInForm'
import RepositoryDetails from './RepositoryView'
import SignOut from './SignInForm/SignOut'
import ReviewForm from './ReviewForm'
import SignUp from './SignUpForm'
import { Provider as PaperProvider } from 'react-native-paper';
import MyReviews from './RepositoryView/MyReviews'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor : 'silver'
  },
});

const Main = () => {
  return (
    <PaperProvider>
    <View style={styles.container}>
      <AppBar/>
      <Switch>
        <Route path="/repository/:id">
          <RepositoryDetails />
        </Route>
        <Route path="/createreview">
          <ReviewForm />
        </Route>
        <Route path="/myreviews">
          <MyReviews />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path ="/signout">
          <SignOut/>
        </Route>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
    </PaperProvider>
  );
};

export default Main;