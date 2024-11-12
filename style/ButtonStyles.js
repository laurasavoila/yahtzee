// ButtonStyles.js
import { StyleSheet } from 'react-native';

const buttonStyles = StyleSheet.create({
  button: {
    backgroundColor: '#ec7dc1', 
    paddingVertical: 15,       
    paddingHorizontal: 20,     
    borderRadius: 10,
    alignItems: 'center',      
    justifyContent: 'center',  
    marginVertical: 10,
    width: 150,                
    height: 50,                
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',  
    fontFamily: 'monospace',     
  },
});

export default buttonStyles;
