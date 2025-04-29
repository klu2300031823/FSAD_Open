// 10.21

import { Pressable, View, Text, StyleSheet } from 'react-native';

import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';

import * as yup from 'yup';

import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

import { useNavigate } from 'react-router-native';


const styles = StyleSheet.create({
    reviewButton: {
        backgroundColor: 'lightpink',
        padding: 15,
        marginTop: 8,
        marginBottom: 10,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 5,
    },
    reviewButtonText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
        color: 'white'
    }
});


const validationSchema = yup.object().shape({ // 10.21 - yup validationSchema for form
    ownerName: yup
        .string()
        .required('Repository owner name is required'),
    repositoryName: yup
        .string()
        .required('Repository name is required'),
    rating: yup
        .number()
        .min(0, 'Rating must be between 0 and 100')
        .max(100, 'Rating must be between 0 and 100')
        .required('Rating is required'),
    review: yup
        .string()
});



const ReviewFormContainer = ({ onSubmit }) => { // 10.21 - ReviewFormContainer component

    return (
        <View>
            <FormikTextInput name="ownerName" placeholder="Repository owner name" />
            <FormikTextInput name="repositoryName" placeholder="Repository name" />
            <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
            <FormikTextInput name="review" placeholder="Review" multiline={true} />
            <Pressable onPress={onSubmit} style={styles.reviewButton}>
                <Text style={styles.reviewButtonText}>Create a review</Text>
            </Pressable>
        </View>
    );
}



const ReviewForm = () => { // 10.21 - ReviewForm component

    const [createReview] = useMutation(CREATE_REVIEW); // 10.21 - createReview mutation
    const navigate = useNavigate();


    const onSubmit = async (values) => {
        // console.log(values);
        const { ownerName, repositoryName, rating, review } = values;

        try {
            const { data } = await createReview({ variables: {  review: { ownerName, repositoryName, rating: Number(rating), text: review } }});
            console.log(data);
            if (data) {
                navigate(`/repository/${data.createReview.repositoryId}`); // navigating to single repository view
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <Formik initialValues={{ ownerName: '', repositoryName: '', rating: '', review: '' }} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }) => <ReviewFormContainer onSubmit={handleSubmit} />}
        </Formik>
    );
}

export default ReviewForm;