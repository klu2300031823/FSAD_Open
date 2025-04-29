// 10.11, 10.23

import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables) => {
    const [repositories, setRepositories] = useState();

    const { data, error, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: "cache-and-network",
        variables: variables,
        onCompleted: (data) => setRepositories(data.repositories) // set data to state
    });

    if (error) {
        console.log(error);
    }

    const handleFetchAgain = () => {
        const fetchingPossible = !loading && data && data?.repositories; // checking if there is more data to fetch

        if (!fetchingPossible) {
            return;
        }

        fetchMore({
            variables: {
                ...variables,
            },
        });
    };
    console.log('repos', repositories)

    return {
        repositories: data?.repositories,
        fetchMore: handleFetchAgain,
        loading,
        ...result,
    };


};

export default useRepositories;