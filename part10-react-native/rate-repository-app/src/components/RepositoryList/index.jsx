import React, {useEffect,useState} from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import RepositoryItem from './RepositoryItem'
import useRepositories from '../../hooks/useRepositories'
import { useHistory } from 'react-router';
import {Picker} from 'react-native';
import { Searchbar } from 'react-native-paper';
import {useDebounce} from 'use-debounce'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});



const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer  extends React.Component {
  renderHeader = ()=>{
    const {sortBy , setsortBy , searchText , setsearchText} = this.props;
    return(
        <View>
        <Searchbar
            placeholder="Search"
            onChangeText={val => setsearchText(val)}
            value={searchText}
            style={{margin : 10}}
        />
        <Picker
        selectedValue={sortBy}
        onValueChange={(itemValue) =>
          setsortBy(itemValue)
        }
        style = {{margin : 10, marginTop : 0}}>
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
      </Picker>
        </View>
      )
  }
  render(){
    const {repositories , history, onEndReach } = this.props
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];
  const renderItem = ({item}) =>{
    const openDetails = () => {
      history.push(`/repository/${item.id}`);
    }
    return(
    <TouchableOpacity onPress={openDetails}>
    <RepositoryItem  item={item}/>
    </TouchableOpacity>
    )
  }
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      ListHeaderComponent={this.renderHeader}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
    } 
}
const RepositoryList = () => {
    const [sortBy,setsortBy] = useState('latest')
    const [searchText, setsearchText] = useState('');
    const [searchTextDebounced] = useDebounce(searchText, 500);
    const {repositories, fetchMore} = useRepositories(sortBy,searchTextDebounced);
    const history = useHistory()
    const onEndReach = () => {
      fetchMore();
    };
    return <RepositoryListContainer 
    repositories={repositories} history={history} 
    setsortBy= {setsortBy} sortBy={sortBy}
    searchText= {searchText} setsearchText={setsearchText}
    onEndReach = {onEndReach}
    />
};

export default RepositoryList;