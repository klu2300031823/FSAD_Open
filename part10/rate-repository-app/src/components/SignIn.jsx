// 10.6 - Sign in form
import { Pressable, View, Text, StyleSheet } from 'react-native';

import { useNavigate } from 'react-router-native'; // 10.15 - useNavigate hook for redirecting to another page

import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';

import * as yup from 'yup'; // 10.9 - yup validation library

import useSignIn from '../hooks/useSignIn'; // 10.13 - useSignIn hook

const styles = StyleSheet.create({
    signInButton: {
        backgroundColor: 'lightpink',
        padding: 15,
        marginTop: 8,
        marginBottom: 10,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 5,
    },
    signInText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
        color: 'white'
    }
});


const validationSchema = yup.object().shape({ // 10.9 - validationSchema
    username: yup
        .string()
        .min(3, 'Username must be at least 3 characters long')
        .required('Username is required'),
    password: yup
        .string()
        .min(5, 'Password must be at least 5 characters long')
        .required('Password is required')
});



const SignIn = () => { // 10.8, 10.13 - SignIn component

    const [signIn] = useSignIn(); // 10.13 - useSignIn hook

    const navigate = useNavigate(); // 10.15 - useNavigate hook for redirecting to another page

    const onSubmit = async (values) => { // 10.8, 10.13 - onSubmit function

        const { username, password } = values;
        console.log(`Username: ${username}, Password: ${password}`);

        try {
            const loginObject = { username, password }; // creating loginObject

            const loginResult = await signIn(loginObject); // calling signIn function from useSignIn hook
            console.log(loginResult); // logging result which is the token 
            navigate('/'); // 10.15 - redirecting to repository main page after successful login
        }
        catch (err) {
            console.log(err);
        }

    };

    return (
        <SignInContainer onSubmit={onSubmit} />
    );
}



// 10.18 - SignInContainer component
export const SignInContainer = ({ onSubmit }) => { // 10.18 - SignInContainer component, view logic shows the form
    return (
            <Formik initialValues={{ username: '', password: '' }} onSubmit={onSubmit} validationSchema={validationSchema}>
                {({ handleSubmit }) =>
                     <View>
                        <FormikTextInput name="username" placeholder="Username" testID="usernameField" />
                        <FormikTextInput name="password" placeholder="Password" secureTextEntry testID="passwordField" />
                        <Pressable style={styles.signInButton} onPress={handleSubmit} testID="submitButton">
                            <Text style={styles.signInText}>Sign in</Text>
                        </Pressable>
                    </View>
                }
            </Formik>
    );
};

export default SignIn;