// 10.8

import { TextInput as NativeTextInput, StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    textInput: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 15,
        marginTop: 10,
        marginBottom: 6,
        marginLeft: 15,
        marginRight: 15,
        borderColor: 'lightpink',
        fontSize: 24,
    },
    errorBorder: {
        borderColor: 'red'
    }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [styles.textInput, style, error && styles.errorBorder]; // 10.9 - errorBorder if error

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;