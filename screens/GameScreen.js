import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Jar from '../components/Jar';
import { canMove, moveLayer, isGameComplete } from '../utils/gameLogic';

const INITIAL_STATE = [
  [null, 'red', 'blue', 'red'],
  [null, 'blue', 'red', 'blue'],
  [null, null, null, null],
];

const GameScreen = () => {
  const [jars, setJars] = useState(INITIAL_STATE);
  const [selectedJarIndex, setSelectedJarIndex] = useState(null);

  const handleJarPress = (jarIndex) => {
    if (selectedJarIndex === null) {
      // Seleccionar el primer jarrón
      setSelectedJarIndex(jarIndex);
    } else {
      // Intentar mover del jarrón seleccionado al nuevo jarrón
      if (selectedJarIndex !== jarIndex) {
        const result = moveLayer(jars[selectedJarIndex], jars[jarIndex]);
        if (result) {
          const newJars = [...jars];
          newJars[selectedJarIndex] = result.sourceJar;
          newJars[jarIndex] = result.targetJar;
          setJars(newJars);
        }
      }
      setSelectedJarIndex(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sandu</Text>
      <View style={styles.jarsContainer}>
        {jars.map((jar, index) => (
          <Jar
            key={index}
            layers={jar}
            isSelected={selectedJarIndex === index}
            onPress={() => handleJarPress(index)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  jarsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
});

export default GameScreen; 