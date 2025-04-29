import { StyleSheet, FlatList, View, Text } from 'react-native';
import { useState } from 'react';
import { useDebounce } from 'use-debounce'; // 10.24 - useDebounce hook
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { PaperProvider, Menu, Button, Searchbar } from 'react-native-paper';
import theme from '../theme';

const styles = StyleSheet.create({
    separator: {
        height: 10,
        backgroundColor: 'lightgray',
    },
});


const ItemSeparator = () => <View style={styles.separator} />;


const RepositoryFilter = ({handleFilterChange}) => { // 10.24

    return (
        <View>
            <Searchbar
                placeholder="Filter repositories"
                onChangeText={handleFilterChange}
                style={{
                    margin: 10,
                    padding: 5,
                    borderRadius: 40,
                    backgroundColor: theme.colors.appBarBackground,
                    borderWidth: 1,
                    borderColor: theme.colors.appBarBackground,
                    zIndex: 1,
                }}
                autoCapitalize='none'
            />
        </View>
    )
}




const RepositoryListSortMenu = ({handleSortSelection, sortPickerType}) => { // 10.23
    
    const [visible, setVisible] = useState(false); // 10.23 - state for the sort picker

    return (
        <PaperProvider>
            <Menu
                visible={visible}
                style={{
                    borderWidth: 1,
                    borderRadius: 5,
                    width: '90%',
                    top: 50,
                    left: 20,
                    zIndex: 1,
                    
                }}
                onDismiss={() => setVisible(false)}
                anchor={
                    <Button
                    onPress={ () => { setVisible(true) } }
                    icon="menu-down"
                    contentStyle={{ 
                      flexDirection: "row-reverse",
                      backgroundColor: theme.colors.appBarBackground,
                        
                    }}
                  >
                    <Text style={{color: theme.colors.headerFontColor, fontWeight: theme.fontWeights.bold, fontSize: theme.fontSizes.subheading}}>{sortPickerType.slice(0, 1).toUpperCase() + sortPickerType.slice(1)} repositories</Text>
                  </Button>
            }
            >
                
                <Menu.Item title="Select sort type" disabled />
                <Menu.Item onPress={() => {
                    handleSortSelection('latest')
                    setVisible(false)
                    }} title="Latest repositories" />
                <Menu.Item onPress={() => {
                    handleSortSelection('highest')
                    setVisible(false)
                    }} title="Highest rated repositories" />
                <Menu.Item onPress={() => {
                    handleSortSelection('lowest')
                    setVisible(false)
                    }} title="Lowest rated repositories" />
            </Menu>
        </PaperProvider>
    )
}



export const RepositoryListContainer = ({ repositories, sortPickerType, handleSortSelection, handleFilterChange, onEndReach }) => {
    const repositoryNodes = repositories
        ? repositories.edges.map((edge) => edge.node)
        : [];


    return (
        <FlatList
            data={repositoryNodes}
            ListHeaderComponent={
                <>
                    <RepositoryFilter handleFilterChange={handleFilterChange} />
                    <RepositoryListSortMenu handleSortSelection={handleSortSelection} sortPickerType={sortPickerType} />
                </>
            }
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => <RepositoryItem item={item} />}
            ListHeaderComponentStyle={{zIndex: 1}}
            onEndReach={onEndReach}
        />
    );
};





const RepositoryList = () => { // 10.11

    const [sortPickerType, setSortPickerType] = useState('latest'); // 10.23 - state header for the sort picker
    const [repositoryFilter, setRepositoryFilter] = useState(''); // 10.23 - state header for the sort picker
    const [debouncedFilter] = useDebounce(repositoryFilter, 500); // 10.24 - useDebounce hook

    console.log(sortPickerType);
    const orderBy = sortPickerType === 'latest' ? 'CREATED_AT' : 'RATING_AVERAGE'; // 10.23 - orderBy variable for the useRepositories hook
    const orderDirection = sortPickerType === 'lowest' ? 'ASC' : 'DESC'; // 10.23 - orderDirection variable for the useRepositories hook


    const { repositories, fetchMore } = useRepositories({
        orderBy,
        orderDirection,
        searchKeyword: debouncedFilter // 10.24 - useDebounce hook
    }); // 10.11 - useRepositories hook

    const reFetchMore = () => { 
        console.log('fetchMore');
        fetchMore()
    };

    const handleSortSelection = (selectionValue) => { // 10.23 - function to handle the sort selection
        setSortPickerType(selectionValue); // set the value to SortPickerType state
        
    }
    const handleFilterChange = (selectionValue) => { // 10.23 - function to handle the repositoryFilter selection
        setRepositoryFilter(selectionValue);
    }

    console.log('repositories', repositories);

    return (
        <RepositoryListContainer
            repositories={repositories}
            sortPickerType={sortPickerType}
            handleSortSelection={handleSortSelection}
            handleFilterChange={handleFilterChange}
            onEndReach={reFetchMore}
        />
    );    
};    




export default RepositoryList;