import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, Alert } from 'react-native';
import Card from './src/Card';

const ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

const App: React.FC = () => {
  const [cards, setCards] = useState<string[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffledAlphabet = [...ALPHABET, ...ALPHABET].sort(() => Math.random() - 0.5);
    setCards(shuffledAlphabet);
  };

  const handleCardPress = (index: number) => {
    if (selectedIndices.length === 2 || selectedIndices.includes(index) || cards[index] === '') {
      return; // Limit to 2 cards selected at a time and ignore already selected cards or empty cards
    }
  
    const newSelectedIndices = [...selectedIndices, index];
    setSelectedIndices(newSelectedIndices);
  
    if (newSelectedIndices.length === 2) {
      const [firstIndex, secondIndex] = newSelectedIndices;
      if (cards[firstIndex] === cards[secondIndex]) {
        setMatches(matches + 1);
        Alert.alert('Matched!');
        
        // Mark matched cards as disabled
        const updatedCards = [...cards];
        updatedCards[firstIndex] = ''; // Set card value to empty string
        updatedCards[secondIndex] = ''; // Set card value to empty string
        setCards(updatedCards);
      } else {
        Alert.alert('Not a match!');
      }
      setAttempts(attempts + 1);
  
      // Reset selected cards after a delay
      setTimeout(() => setSelectedIndices([]), 1000);
    }
  };
  

  const renderCard = ({ item, index }: { item: string; index: number }) => {
    const isHidden = !(selectedIndices.includes(index) || cards[index] === '');
    return <Card value={item} isHidden={isHidden} onPress={() => handleCardPress(index)} />;
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Memory Game</Text>
      <Text>Matches: {matches}</Text>
      <Text>Attempts: {attempts}</Text>
      <FlatList
        data={cards}
        renderItem={renderCard}
        keyExtractor={(item, index) => `${item}-${index}`}
        numColumns={4}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
},
});

export default App;
