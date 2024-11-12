import { useState } from 'react';
import { Text, View, TextInput, Keyboard } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Header from './Header';
import Footer from './Footer';
import { NBR_OF_DICES, NBR_OF_THROWS, MIN_SPOT, MAX_SPOT } from '../constants/Game';
import styles from '../style/style';
import MyButton from './MyButton'; // Käytetään MyButton-komponenttia

export default Home = ({ navigation }) => {
    const [playerName, setPlayerName] = useState('');
    const [hasPlayerName, setHasPlayerName] = useState(false);

    const handlePlayerName = (value) => {
        if (typeof value === 'string' && value.trim().length > 0) {
            setPlayerName(value); 
            setHasPlayerName(true);
            Keyboard.dismiss();
        } else {
            console.log('Virhe: Syötteen on oltava merkkijono.');
        }
    };
    
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.content}>
                <MaterialCommunityIcons name="information" size={90} color="#d11f8db4" />
                {!hasPlayerName ? (
                    <>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, fontFamily: 'monospace', textAlign: 'center' }}>
                            For scoreboard enter your name...
                        </Text>
                        <TextInput
                            value={playerName}
                            onChangeText={(text) => setPlayerName(text)}
                            placeholder="Enter your name"
                            autoFocus={true}
                            style={styles.input}
                        />
                        <MyButton
                            title="OK"
                            onPress={() => handlePlayerName(playerName)}
                        />
                    </>
                ) : (
                    <>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, fontFamily: 'monospace', textAlign: 'center' }}>
                            Rules of the game
                        </Text>
                        <Text style={{ fontFamily: 'monospace', fontSize: 14, textAlign: 'center', marginVertical: 10 }} multiline>
                            THE GAME: Upper section of the classic Yahtzee dice game. You have {NBR_OF_DICES} dices and for every dice you have {NBR_OF_THROWS} throws. After each throw, you can keep dices in order to get same dice spot counts as many as possible. In the end of the turn, you must select your points from {MIN_SPOT} to {MAX_SPOT}. Game ends when all points have been selected. The order for selecting those is free.
                        </Text>
                        <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                            Good luck, {playerName}!
                        </Text>
                        <MyButton
                            title="PLAY"
                            onPress={() => navigation.navigate('Gameboard', { player: playerName })}
                        />
                    </>
                )}
            </View>
            <Footer />
        </View>
    );
};
