import React from 'react'
import { View ,StyleSheet, Image, TouchableWithoutFeedback, Linking} from 'react-native'
import Text from '../Utilities/Text'
import theme from '../../theme'
import RepStats from './RepStats'

const RepositoryItemHeaderStyles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexGrow: 1,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 5,
    },
    avatarContainer: {
      flexGrow: 0,
      paddingRight: 15,
    },
    infoContainer: {
      flexGrow: 1,
      flexShrink : 1,
    },
    langaugeContainer : {
        height: 30,
        backgroundColor: theme.colors.primary,
        flexShrink: 1,
        padding: 5,
        borderRadius: 5,
    },
  });
  
  const RepositoryItemHeader = ({item}) => {
    return (
      <View style={RepositoryItemHeaderStyles.container}>
        <View style={RepositoryItemHeaderStyles.avatarContainer}>
          <Image style={RepositoryItemHeaderStyles.avatar} source={{
              uri : item.ownerAvatarUrl
          }} />
        </View>
        <View style={RepositoryItemHeaderStyles.infoContainer}>
          <Text testID="fullName" fontWeight="bold" fontSize="subheading" >{item.fullName}</Text>
          <Text testID="itemDescription" color="textSecondary" style={{paddingTop : 5}}>{item.description}</Text>
          <View style={{display : 'flex', flexDirection : 'row',paddingTop : 10}}>
          <Text testID="itemLanguage" color="appBarText" style= {RepositoryItemHeaderStyles.langaugeContainer}>{item.language}</Text>
          </View>
        </View>
      </View>
    );
  };
  
  const repositoryStatsStyles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexGrow: 1,
      paddingTop : 15,
      justifyContent: 'space-around',
    },
  });
  
  const RepositoryItemStats = ({item}) => {
    return (
      <View style={repositoryStatsStyles.container}>
        <RepStats testID="starsCount" text = "Stars" num = {item.stargazersCount}/>
        <RepStats testID="forksCount" text = "Forks" num = {item.forksCount}/>
        <RepStats testID="reviewsCount" text = "Reviews" num = {item.reviewCount}/>
        <RepStats testID="ratingAverage" text = "Rating" num ={item.ratingAverage}/>
      </View>
    );
  };
  
  const RepositoryItemStyles = StyleSheet.create({
    container: {
      alignItems: 'stretch',
      backgroundColor : 'white',
      padding : 10,
      
    },
    openGithub : { 
      borderRadius : 5,
      backgroundColor : theme.colors.primary, 
      padding : 15, 
      marginTop : 15,
      textAlign : 'center',
      color : 'white',
    }
  });
  
  const RepositoryItem = ({item , details = false}) => {
    return (
    <View style={RepositoryItemStyles.container}>
        <RepositoryItemHeader item={item}/>
        <RepositoryItemStats item= {item}/>
        { details ? 
        <TouchableWithoutFeedback testID="submitButton" onPress={()=> Linking.openURL(item.url)}>
            <Text fontWeight='bold' style={RepositoryItemStyles.openGithub}>Open in GitHub</Text>
        </TouchableWithoutFeedback> : <></>
        } 
    </View>
    );
  };
  
  export default RepositoryItem;