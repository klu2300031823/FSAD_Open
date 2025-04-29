import { View, StyleSheet, Text, Pressable } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link } from 'react-router-native'; // 10.6
import { ScrollView } from 'react-native'; // 10.7

import { useQuery, useApolloClient } from '@apollo/client'; // 10.16
import { useNavigate } from 'react-router-native'; // 10.16
import { ME } from '../graphql/queries'; // 10.16
import useAuthStorage from '../hooks/useAuthStorage'; // 10.16


const styles = StyleSheet.create({ // 10.4 - styles for the app bar
    container: {
        backgroundColor: theme.colors.appBarBackground,
        paddingTop: Constants.statusBarHeight,
        marginBottom: 15,
    },
    textstyle: { // 10.4 - styles for the text in app bar
        color: theme.colors.headerFontColor,
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 15,
        fontSize: theme.fontSizes.subheading,
        fontWeight: theme.fontWeights.bold,
    }
});



const AppBar = () => { // 10.16 - component for the app bar
    const { data } = useQuery(ME); // 10.16
    const authStorage = useAuthStorage(); // 10.16
    const apolloClient = useApolloClient(); // 10.16
    const navigate = useNavigate(); // 10.16

    let userLoggedIn = false;

    const signOut = async () => { // 10.16
        await authStorage.removeAccessToken(); // 10.16
        apolloClient.resetStore(); // 10.16
        userLoggedIn = false; // 10.16
        navigate('/'); // 10.16
    };


    userLoggedIn = !data?.me ? false : true; // 10.16, // 10.21, 10.25

    // show the app bar with sign in if user is not logged in, otherwise show sign out button
    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <Link to="/">
                    <Text style={styles.textstyle}>Repositories</Text>
                </Link>
                {!userLoggedIn &&
                    <>
                        <Link to="/signin">
                            <Text style={styles.textstyle}>Sign in</Text>
                        </Link>
                        <Link to="/signup">
                            <Text style={styles.textstyle}>Sign up</Text>
                        </Link>
                    </>
                }
                {userLoggedIn &&

                    <>

                        <Link to="/review">
                            <Text style={styles.textstyle}>Create a review</Text>
                        </Link>

                        <Link to="/myreviews">
                            <Text style={styles.textstyle}>My reviews</Text>
                        </Link>


                        <Pressable onPress={signOut}>
                            <Text style={styles.textstyle}>Sign out</Text>
                        </Pressable>

                    </>
                }
            </ScrollView>
        </View>
    )

}


export default AppBar;