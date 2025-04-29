// 10.22
import { Pressable, View, Text, StyleSheet } from 'react-native';

import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';

import * as yup from 'yup';

import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';

import {CREATE_USER} from '../graphql/mutations'; // create user mutation



const styles = StyleSheet.create({
    signUpButton: {
        backgroundColor: 'lightpink',
        padding: 15,
        marginTop: 8,
        marginBottom: 10,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 5,
    },
    signUpButtonText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
        color: 'white'
    }
});


const validationSchema = yup.object().shape({ // 10.22 - yup validationSchema for form
    username: yup
        .string()
        .min(5, 'Username must be at least 5 characters long')
        .max(30, 'Username must be max 30 characters long')
        .required('Username is required'),
    password: yup
        .string()
        .min(5, 'Password must be at least 5 characters long')
        .max(50, 'Password must be max 50 characters long')
        .required('Password is required'),
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must be same')
        .required('Password confirmation is required')
});


const SignUpFormContainer = ({ onSubmit }) => { // 10.22 - SignUpFormContainer component

    return (
        <View>
            <FormikTextInput name="username" placeholder="Username" />
            <FormikTextInput name="password" placeholder="Password" secureTextEntry />
            <FormikTextInput name="passwordConfirmation" placeholder="Password confirmation" secureTextEntry />
            <Pressable onPress={onSubmit}>
                <View style={styles.signUpButton}>
                    <Text style={styles.signUpButtonText}>Sign up</Text>
                </View>
            </Pressable>
        </View>
    );
}

const SignUpForm = () => { // 10.22 - SignUpForm component

    const [createUser] = useMutation(CREATE_USER); // 10.22 - use create user mutation
    const navigate = useNavigate(); // 10.22 - use navigate hook

    const onSubmit = async (values) => { // 10.22 - onSubmit function
            
        const { username, password } = values; // destructure username and password from values
        console.log('username', username);
        console.log('password', password)


        try {
            const {data} = await createUser({ variables: { user: { username, password } } }); // 10.22 - create user
            if (data) {
                navigate('/'); // 10.22 - navigate to reviewed repository list
            }
        } catch (err) {
                console.log(err);
        }
    }


    return (
        <View>
            <Formik initialValues={{ username: '', password: '', passwordConfirmation: '' }} onSubmit={onSubmit} validationSchema={validationSchema}>
                {({ handleSubmit }) => <SignUpFormContainer onSubmit={handleSubmit} />}
            </Formik>
        </View>
    );
}


export default SignUpForm; // 10.22 - export SignUpForm component