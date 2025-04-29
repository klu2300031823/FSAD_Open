import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";

const useMyReviews = () => {
    const { data, error } = useQuery(ME, {
        fetchPolicy: 'cache-and-network',
        variables: { includeReviews: true }
    });

    if (error) {
        console.log(error);
    }

    return {
        me: data ? data.me : undefined,
        reviews: data ? data.me.reviews : undefined
    }
}

export default useMyReviews;