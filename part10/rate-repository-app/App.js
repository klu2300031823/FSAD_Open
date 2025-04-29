import { NativeRouter } from 'react-router-native';
import Main from './src/components/Main';

import { ApolloProvider } from '@apollo/client';
import createApolloClient from './src/utils/apolloClient';
import Constants from 'expo-constants'; // 10.12

import AuthStorage from './src/utils/authStorage'; // 10.15
import AuthStorageContext from './src/contexts/AuthStorageContext'; // 10.15
const authStorage = new AuthStorage(); // 10.15
const apolloClient = createApolloClient(authStorage); // 10.15

const App = () => {

    console.log(Constants.manifest); // 10.12

    return (
        <>
            <NativeRouter>
                <ApolloProvider client={apolloClient}>
                    <AuthStorageContext.Provider value={authStorage}>
                        <Main />
                    </AuthStorageContext.Provider>
                </ApolloProvider>
            </NativeRouter>
        </>
    );
};


export default App;