import React from 'react'
import { View,FlatList,StyleSheet } from 'react-native'
import { useParams } from 'react-router'
import useRepository from '../../hooks/useRepository'
import RepositoryItem from '../RepositoryList/RepositoryItem'
import ReviewItem from './ReviewItem'

const styles = StyleSheet.create({
    separator: {
      height: 10,
    },
  });
const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryDetails = () => {
    const {id} = useParams();
    const{repository , fetchMore} = useRepository(id)
    if (!repository){return(<></>);}
    const onEndReach = () => {
      fetchMore();
    };
    return (
        <FlatList
        data={repository.reviews.edges}
        renderItem={({ item }) => <ReviewItem review={item.node} />}
        keyExtractor={item => item.node.id}
        ListHeaderComponent={() => {
          return( 
          <View>
          <RepositoryItem  item={repository} details ={true}/> 
          <ItemSeparator />
          </View>
          )
        }
      }
        ItemSeparatorComponent={ItemSeparator}
        onEndReached = {onEndReach}
        onEndReachedThreshold = {0.5}
      />
    )
}

export default RepositoryDetails