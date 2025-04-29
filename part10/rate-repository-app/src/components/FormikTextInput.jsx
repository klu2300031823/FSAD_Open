// 10.8 - FormikTextInput component

import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import Text from './Text';
import TextInput from './TextInput';

const styles = StyleSheet.create({
  errorText: { // 10.9 - errorText
    marginTop: 5,
    marginLeft: 15,
    color: 'red'
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={value => helpers.setValue(value.toLowerCase())}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;