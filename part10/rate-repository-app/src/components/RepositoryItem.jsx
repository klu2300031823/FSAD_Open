// 10.3
import { View, Image, Button, StyleSheet, Pressable } from 'react-native'; // 10.3
import Text from './Text';


import { useNavigate } from 'react-router-native';



const styles = StyleSheet.create({ // 10.5 - styles for repository item
    rowitem: {
        flexDirection: 'row',
        padding: 15,
    },
    columnitem: {
        flexDirection: 'column',
        paddingLeft: 22.5,
        paddingRight: 22.5,
    },
    columnitemvalue: {
        paddingBottom: 5,
        textAlign: "center",
        fontWeight: 'bold'
    },
});


const RepositoryItem = ({ item }) => { // 10.3 - component takes item as props

    const roundValue = (value) => {
        if (value >= 1000) {
            return (value / 1000).toFixed(1) + 'k';
        }
        return value;
    };


    // console.log(item.id)
    const navigate = useNavigate();

    // 10.3 - returns the item's data, 10.17 - testID for testing purposes, 10.19 - Linking.openURL(item.url) opens the repository in GitHub and pressable to navigate to the single repository view
    return (
        <Pressable onPress={() => { {item.id && navigate(`/repository/${item.id}`)} }}>

            <View testID="repositoryItem">
                <View style={styles.rowitem}>

                    <Image
                        style={{ width: 50, height: 50 }}
                        source={{ uri: item.ownerAvatarUrl }}
                    />
                    <View style={{ flexDirection: 'column', paddingLeft: 15 }}>
                        <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>{item.fullName}</Text>
                        <Text style={{ marginTop: 5 }}>{item.description}</Text>
                        <View style={{ flexDirection: 'row', marginTop: 10, alignSelf: 'start-flex', backgroundColor: '#FF63E9', borderRadius: 5 }}>

                            <Button
                                title={item.language}
                                color="white"
                            />

                        </View>

                    </View>

                </View>



                <View style={styles.rowitem}>

                    <View style={styles.columnitem}>

                        <Text style={styles.columnitemvalue}>{roundValue(item.stargazersCount)}</Text>
                        <Text style={{ textAlign: "center" }}>Stars</Text>
                    </View>

                    <View style={styles.columnitem}>
                        <Text style={styles.columnitemvalue}>{roundValue(item.forksCount)}</Text>
                        <Text style={{ textAlign: "center" }}>Forks</Text>
                    </View>


                    <View style={styles.columnitem}>
                        <Text style={styles.columnitemvalue}>{roundValue(item.reviewCount)}</Text>
                        <Text style={{ textAlign: "center" }}>Reviews</Text>
                    </View>

                    <View style={styles.columnitem}>
                        <Text style={styles.columnitemvalue}>{roundValue(item.ratingAverage)}</Text>
                        <Text style={{ textAlign: "center" }}>Rating</Text>
                    </View>

                </View>

            </View>
        </Pressable>

    );
}


export default RepositoryItem; // 10.3