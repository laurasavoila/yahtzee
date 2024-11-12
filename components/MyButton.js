// Tyylitelty painike
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import buttonStyles from '../style/ButtonStyles'; // Importataan painikkeen tyylit

const MyButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={buttonStyles.button} onPress={onPress}>
      <Text style={buttonStyles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default MyButton;
