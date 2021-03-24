import React from 'react'
import { View ,StyleSheet,TouchableWithoutFeedback} from 'react-native'
import Text from '../Utilities/Text'
import theme from '../../theme'
import { format } from 'date-fns';
import { useHistory } from 'react-router';

const ReviewItemHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratingContainer: {
    flex: 4,
    alignItems: 'center'
  },
  rating: {
    height: 44,
    width: 44,
    borderRadius: 22,
    borderColor: theme.colors.primary,
    borderStyle: 'solid',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft : -15
    },
  reviewTextContainer: {
    flex: 20,
    flexShrink: 1
  },
  reviewText: { 
    flexShrink: 1
  },
  ctaActionsContainer: {
    marginTop: 12
  },
  viewRepoButton:
  {
      borderRadius : 5,
      backgroundColor : theme.colors.primary, 
      padding : 20, 
      width : 160,
      textAlign : 'center',
      color : 'white'
  },
  deleteRepoButton:  {
    borderRadius : 5,
    backgroundColor : 'red', 
    padding : 20, 
    width : 160,
    textAlign : 'center',
    color : 'white'
  }
  });
  const formatDate = (date) =>{
    return(format(new Date(date),'dd.MM.yyyy'));
  }

  const ReviewItemHeader = ({item}) => {
    return(
  <View style={ReviewItemHeaderStyles.container}>
    <View style={ReviewItemHeaderStyles.ratingContainer}>
    <View style={ReviewItemHeaderStyles.rating}>
      <Text fontWeight='bold' color='primary' fontSize='subheading'>
        {item.rating}
      </Text>
    </View>
  </View>
    <View style={ReviewItemHeaderStyles.reviewTextContainer}>
    <View>
      <Text fontWeight='bold'>
         {item.user.username}
      </Text>
      <Text color='textSecondary'>{formatDate(item.createdAt)}</Text>
    </View>
    <Text style={ReviewItemHeaderStyles.reviewText}>{item.text}</Text>
  </View>
  </View>
    )
  };
  
  
  const ReviewItemStyles = StyleSheet.create({
    container: { 
      backgroundColor: 'white',
      padding: 12,
    },
  });


  const ReviewItem = ({review , showButtons = false, deleteReview}) => {
    const history = useHistory()
    return (
      <View style={ReviewItemStyles.container}>
        <ReviewItemHeader item = {review} />
        { showButtons ? 
            <View style={{display : 'flex', flexDirection : 'row', marginTop : 10, alignItems : 'stretch'}}>
            <TouchableWithoutFeedback onPress={() =>{ console.log(review); history.push(`/repository/${review.repository.id}`)}}>
                  <Text fontWeight='bold' style={ReviewItemHeaderStyles.viewRepoButton}> View repository</Text>
            </TouchableWithoutFeedback>
            <View style={{marginLeft : 15}}> 
            <TouchableWithoutFeedback onPress={()=>{deleteReview(review.id)}}>
                  <Text  fontWeight='bold' style={ReviewItemHeaderStyles.deleteRepoButton} >Delete review</Text>
            </TouchableWithoutFeedback>
            </View>
            </View>
            : <></>
        }
      </View>
    );
  };

  
  
  export default ReviewItem;