import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList.jsx'; // 10.3
import AppBar from './AppBar.jsx'; // 10.3
import { Route, Routes, Navigate } from 'react-router-native';
import SingleRepositoryView from './SingleRepositoryView.jsx'; // 10.19

import ReviewForm from './ReviewForm.jsx'; // 10.21
import SignUpForm from './SignUpForm.jsx'; // 10.22
import MyReviews from './MyReviews.jsx'; // 10.25


import SignIn from './SignIn.jsx'; // 10.6

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
    },
});

const Main = () => { // 10.3, 10.4
    return (
        <View style={styles.container}>
            <AppBar />

            <Routes>
                <Route path="/" element={<RepositoryList />} exact />
                <Route path="*" element={<Navigate to="/" replace />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/repository/:id" element={<SingleRepositoryView />} />
                <Route path="/review" element={<ReviewForm />} /> {/* 10.21 - ReviewForm component */}
                <Route path="/signup" element={<SignUpForm />} /> {/* 10.22 - SignUpForm component */}
                <Route path ="myreviews" element={<MyReviews />} /> {/* 10.25 - MyReviews component */}
            </Routes>


        </View>
    );
};

export default Main;