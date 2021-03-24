import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../../theme'

const styles = StyleSheet.create({
    textInput : {
        borderColor: 'silver',
        marginBottom : 10,
        borderRadius : 5,
        borderWidth: 1,
        padding: 10,
    },
    textInputError : {
        borderColor: theme.colors.errorColor,
        marginBottom : 10,
        borderRadius : 5,
        borderWidth: 1,
        padding: 10,
    },
});


const TextInput = ({ error, ...props }) => {
  const textInputStyle = error ? styles.textInputError : styles.textInput;

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;