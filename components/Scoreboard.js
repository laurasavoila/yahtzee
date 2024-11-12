import React, { useState, useEffect } from 'react';
import { Text, View, FlatList } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import { SCOREBOARD_KEY } from '../constants/Game';
import styles from '../style/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyButton from './MyButton'; // Tuodaan MyButton-komponentti

const Scoreboard = ({ navigation }) => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getScoreboardData();
    });
    return unsubscribe;
  }, [navigation]);

  const getScoreboardData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
      if (jsonValue !== null) {
        const tmpScores = JSON.parse(jsonValue);
        // Järjestetään pistemäärä laskevassa järjestyksessä
        tmpScores.sort((a, b) => b.points - a.points);
        setScores(tmpScores);
        console.log('Scoreboard: Read successful');
        console.log('Scoreboard: Number of scores: ' + tmpScores.length);
      }
    } catch (e) {
      console.log('Scoreboard: Read error: ' + e);
    }
  };

  const clearScoreboard = async () => {
    try {
      await AsyncStorage.removeItem(SCOREBOARD_KEY);
      setScores([]);
      console.log('Scoreboard cleared');
    } catch (e) {
      console.log('Clear error: ' + e);
    }
  };

  const renderScoreItem = ({ item }) => (
    <View style={styles.scoreItem}>
      <Text style={styles.scoreText}>{`${item.name} - ${item.points} points (${item.date}, ${item.time})`}</Text>
    </View>
  );

  return (
    <>
      <Header />
      <View style={styles.content}>
        <Text style={styles.title}>Scoreboard</Text>
        {scores.length > 0 ? (
          <FlatList
            data={scores}
            renderItem={renderScoreItem}
            keyExtractor={item => item.key.toString()}
          />
        ) : (
          <Text style={{ fontFamily: 'monospace' }}>No scores yet!</Text>
        )}
        {/* Käytetään MyButton-komponenttia Clear Scoreboard -painikkeessa */}
        <MyButton title="Clear Scoreboard" onPress={clearScoreboard} />
      </View>
      <Footer />
    </>
  );
};

export default Scoreboard;
