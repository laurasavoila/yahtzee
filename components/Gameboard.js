import { useState, useEffect } from 'react';
import { Text, View, Pressable, ScrollView } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import { NBR_OF_DICES, NBR_OF_THROWS, MAX_SPOT, SCOREBOARD_KEY } from '../constants/Game';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Container, Row, Col } from 'react-native-flex-grid';
import styles from '../style/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyButton from './MyButton';

let board = new Array(NBR_OF_DICES).fill('dice-5'); // Default dice icons

const CATEGORIES = [
  "Ones", "Twos", "Threes", "Fours", "Fives", "Sixes",
  "Three of a Kind", "Four of a Kind", "Full House",
  "Small Straight", "Large Straight", "Yahtzee", "Chance"
];

const Gameboard = ({ navigation, route }) => {
  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
  const [status, setStatus] = useState('Throw dices.');
  const [gameEndStatus, setGameEndStatus] = useState(false);
  const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
  const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0));
  const [scores, setScores] = useState(new Array(CATEGORIES.length).fill(null)); // null means unscored
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [playerName, setPlayerName] = useState('');

  useEffect(() => {
    if (playerName === '' && route.params?.player) {
      setPlayerName(route.params.player);
    }
  }, [route.params]);

  const startNewGame = () => {
    setNbrOfThrowsLeft(NBR_OF_THROWS);
    setStatus('Throw dices.');
    setGameEndStatus(false);
    setSelectedDices(new Array(NBR_OF_DICES).fill(false));
    setDiceSpots(new Array(NBR_OF_DICES).fill(0));
    setScores(new Array(CATEGORIES.length).fill(null));
    setSelectedCategory(null);
    board = new Array(NBR_OF_DICES).fill('dice-5');
  };

  const throwDices = () => {
    if (nbrOfThrowsLeft > 0 && !gameEndStatus) {
      let spots = [...diceSpots];
      for (let i = 0; i < NBR_OF_DICES; i++) {
        if (!selectedDices[i]) {
          let randomNumber = Math.floor(Math.random() * 6 + 1);
          board[i] = 'dice-' + randomNumber;
          spots[i] = randomNumber;
        }
      }
      setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
      setDiceSpots(spots);
      setStatus('Select and throw dices again or choose a category to score.');
    } else {
      setStatus('Game over or no throws left. Start a new game.');
    }
  };

  const chooseDice = (i) => {
    if (nbrOfThrowsLeft < NBR_OF_THROWS && !gameEndStatus) {
      let dices = [...selectedDices];
      dices[i] = !selectedDices[i];
      setSelectedDices(dices);
    } else {
      setStatus('You have to throw dices first.');
    }
  };

  const calculateScore = (category) => {
    let score = 0;
    let counts = new Array(6).fill(0);
    diceSpots.forEach(value => counts[value - 1]++);

    switch (category) {
      case "Ones": score = counts[0] * 1; break;
      case "Twos": score = counts[1] * 2; break;
      case "Threes": score = counts[2] * 3; break;
      case "Fours": score = counts[3] * 4; break;
      case "Fives": score = counts[4] * 5; break;
      case "Sixes": score = counts[5] * 6; break;
      case "Three of a Kind": score = counts.includes(3) ? diceSpots.reduce((a, b) => a + b, 0) : 0; break;
      case "Four of a Kind": score = counts.includes(4) ? diceSpots.reduce((a, b) => a + b, 0) : 0; break;
      case "Full House": score = counts.includes(3) && counts.includes(2) ? 25 : 0; break;
      case "Small Straight": score = [1, 1, 1, 1].every((v, i) => counts.slice(i, i + 4).includes(v)) ? 30 : 0; break;
      case "Large Straight": score = [1, 1, 1, 1, 1].every((v, i) => counts.slice(i, i + 5).includes(v)) ? 40 : 0; break;
      case "Yahtzee": score = counts.includes(5) ? 50 : 0; break;
      case "Chance": score = diceSpots.reduce((a, b) => a + b, 0); break;
      default: score = 0;
    }
    return score;
  };

  const selectCategory = (category) => {
    if (scores[CATEGORIES.indexOf(category)] === null && nbrOfThrowsLeft < NBR_OF_THROWS) {
      let score = calculateScore(category);
      let newScores = [...scores];
      newScores[CATEGORIES.indexOf(category)] = score;
      setScores(newScores);
      setSelectedDices(new Array(NBR_OF_DICES).fill(false));
      setNbrOfThrowsLeft(NBR_OF_THROWS);
      board = new Array(NBR_OF_DICES).fill('dice-5');
      if (newScores.every(s => s !== null)) {
        setGameEndStatus(true);
        setStatus('Game over! Start a new game.');
      } else {
        setStatus('Score saved. Throw dices for next round.');
      }
    } else {
      setStatus('Choose a valid category or throw dices first.');
    }
  };

  const calculateTotalScore = () => {
    return scores.reduce((total, score) => total + (score || 0), 0);
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <View style={styles.centeredContent}>
          <Container>
            <Row>{board.map((dice, index) => (
              <Col key={"dice" + index} style={styles.diceColumn}>
                <Pressable onPress={() => chooseDice(index)}>
                  <MaterialCommunityIcons name={dice} size={50} color={selectedDices[index] ? "#C71585" : "#FFFFFF"} />
                </Pressable>
              </Col>
            ))}</Row>
          </Container>

          <Text style={styles.throwsLeft}>Throws left: {nbrOfThrowsLeft}</Text>
          <Text style={styles.statusText}>{status}</Text>

          <MyButton title="THROW DICES" onPress={throwDices} />
          <MyButton title="NEW GAME" onPress={startNewGame} />

          <Text style={styles.playerName}>Player: {playerName}</Text>
          <Text style={styles.totalScore}>Total Score: {calculateTotalScore()}</Text>

          <Container>
            {CATEGORIES.map((category, index) => (
              <Row key={category} style={styles.categoryRow}>
                <Pressable onPress={() => selectCategory(category)}>
                  <Text style={styles.categoryText}>{category}: {scores[index] !== null ? scores[index] : "-"}</Text>
                </Pressable>
              </Row>
            ))}
          </Container>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

export default Gameboard;
