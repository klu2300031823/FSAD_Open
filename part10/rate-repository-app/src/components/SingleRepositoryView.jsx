// 10.19

import RepositoryItem from "./RepositoryItem";
import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import { format} from 'date-fns' // 10.20
import { FlatList, View, StyleSheet, Pressable } from "react-native";
import Text from "./Text";
import * as Linking from "expo-linking";


const styles = StyleSheet.create({
    githubbutton: { // 10.19
        backgroundColor: '#FF63E9',
        borderRadius: 5,
        margin: 10,
        padding: 15,
    },
    githubbuttontext: { // 10.19
        color: 'white',
        textAlign: 'center',
        fontSize: 18
    },
    separator: { // 10.20
        height: 10,
        backgroundColor: "lightgray",
    },
    rating: {
        width: 50,
        height: 50,
        textAlign: "center",
        fontWeight: 'bold',
        paddingTop: 15,
        color: '#FF63E9',
        borderWidth: 1,
        borderRadius: 50 / 2,
        padding: 5,
        borderColor: '#FF63E9', // Set the border color to pink
    },
    rowstyle: {
        backgroundColor: 'white',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});

const ItemSeparator = () => <View style={styles.separator} />;


const RepositoryInfo = ({ repository }) => { // 10.19 - component takes repository as props
    return (
        <View>
            <RepositoryItem item={repository} />
            <Pressable onPress={() => { Linking.openURL(repository.url) }}>
                <View style={styles.githubbutton}>
                    <Text style={styles.githubbuttontext}>Open in GitHub</Text>
                </View>
            </Pressable>
        </View>
    );
};



const ReviewItem = ({ review }) => { // 10.20 - component takes review as props

    const roundValue = (value) => { // 10.20 - round the value
        if (value >= 1000) {
            return (value / 1000).toFixed(1) + 'k';
        }
        return value;
    }

    const reviewDate = format(new Date(review.createdAt), 'dd.MM.yyyy'); // 10.20 - format the date

    return (
        <View style={styles.rowstyle}>
            <View style={{ flexDirection: 'column' }}>
                <Text style={styles.rating}>{roundValue(review.rating)}</Text>
            </View>

            <View style={{ flexDirection: 'column', paddingLeft: 15, flex: 1 }}>

                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>{review.user.username}</Text>
                <Text style={{ marginTop: 5 }}>{reviewDate}</Text>
                <Text style={{ marginTop: 5, marginBottom: 10 }}>{review.text}</Text>

            </View>
        </View>
    );
};



const SingleRepositoryView = () => { // 10.19 - component

    const { id } = useParams(); // get id from the url
    // console.log(id);

    const { data, loading } = useQuery(GET_REPOSITORY, { // get data from the query
        fetchPolicy: 'cache-and-network', // prevent getting cached data with the repository query
        variables: { id }
    });

    // console.log(data);

    if (loading) return <Text>Loading...</Text>;

    const repository = data.repository; // get the repository from the data

    const reviews = repository.reviews.edges.map(edge => edge.node); // 10.20 get the reviews from the repository
    // console.log(reviews);

    return (

        <FlatList

            data={reviews}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => <RepositoryInfo repository={repository} />} // pass repository as props to RepositoryInfo component
            ListFooterComponent={ItemSeparator}

        />


    );

}


export default SingleRepositoryView;