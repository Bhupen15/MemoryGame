import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface CardProps {
  value: string;
  isHidden: boolean;
  onPress: () => void;
}

const Card: React.FC<CardProps> = ({ value, isHidden, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <Text style={styles.cardText}>{isHidden ? '?' : value}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 50,
    height: 50,
    backgroundColor: '#ccc',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 24,
  },
});

export default Card;
