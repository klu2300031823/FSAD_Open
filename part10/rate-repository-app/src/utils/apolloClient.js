import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants'; // 10.12

import { setContext } from '@apollo/client/link/context'; // 10.15


const httpLink = createHttpLink({
    uri: Constants.manifest.extra.uri, // 10.12
});



const createApolloClient = (authStorage) => { // 10.15
    const authLink = setContext(async (_, { headers }) => {
      try {
        const accessToken = await authStorage.getAccessToken();
        return {
          headers: {
            ...headers,
            authorization: accessToken ? `Bearer ${accessToken}` : '',
          },
        };
      } catch (err) {
        console.log(err);
        return {
          headers,
        };
      }
    });
    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  };

export default createApolloClient;