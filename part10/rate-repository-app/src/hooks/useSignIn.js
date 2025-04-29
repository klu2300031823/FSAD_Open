// 10.13

import { useMutation, useApolloClient } from '@apollo/client'; // 10.15
import { SIGN_IN } from '../graphql/mutations';


import useAuthStorage from './useAuthStorage';

const useSignIn = () => { // custom hook for signIn
    const authStorage = useAuthStorage(); // 10.15
    const apolloClient = useApolloClient();

    const [mutate, result] = useMutation(SIGN_IN);

    const signIn = async ({ username, password }) => {
        // call the mutate function here with the right arguments
        const { data } = await mutate({ variables: { credentials: { username, password } } });
        console.log(data);

        await authStorage.setAccessToken(data.authenticate.accessToken); // 10.15 - store the accessToken to the device's authstorage
        console.log('authstorage', authStorage); // 10.15

        apolloClient.resetStore(); // 10.15 - reset the apollo client cache
        return data;
    }

    return [signIn, result];
};

export default useSignIn;