import React from 'react'
import { View,FlatList,StyleSheet } from 'react-native'
import useUser from '../../hooks/userUser'
import ReviewItem from './ReviewItem'
import useDelete from '../../hooks/useDelete'

const styles = StyleSheet.create({
    separator: {
      height: 10,
    },
  });
const ItemSeparator = () => <View style={styles.separator} />;


const MyReviews  = () => {
    const{user , fetchMore} = useUser()
    const [deleteReview] = useDelete()
    if (!user){return(<></>);}
    const onEndReach = () => {
      fetchMore();
    };
    return (
        <FlatList
        data={user.reviews.edges}
        renderItem={({ item }) => <ReviewItem review={item.node} showButtons={true} deleteReview = {deleteReview}/>}
        keyExtractor={item => item.node.id}
        ItemSeparatorComponent={ItemSeparator}
        onEndReached = {onEndReach}
        onEndReachedThreshold = {0.5}
      />
    )
}


export default MyReviews;