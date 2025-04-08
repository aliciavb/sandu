// app/level/[id].tsx
// crea un nivel nuevo con el id que le pasas por params

import { useLocalSearchParams } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Jar } from '../../components/Jar';
import { FIXED_LEVELS } from '../../constants/levels';
import { generateLevel } from '../../utils/levelGenerator';
import { tryTransfer } from '../../logic/sort';

export default function LevelScreen() {
  const { id } = useLocalSearchParams();
  const level = parseInt(id as string);
  const [jars, setJars] = useState<string[][]>(
    FIXED_LEVELS[level] ?? generateLevel(level)
  );
  const [selectedJar, setSelectedJar] = useState<number | null>(null);

  const handleJarPress = (index: number) => {
    if (selectedJar === null) {
      setSelectedJar(index);
    } else {
      if (selectedJar !== index) {
        const newJars = tryTransfer(jars, selectedJar, index);
        setJars(newJars);
      }
      setSelectedJar(null);
    }
  };

  return (
    <View style={styles.container}>
      {jars.map((layers, index) => (
        <Jar
          key={index}
          layers={layers}
          onPress={() => handleJarPress(index)}
          selected={selectedJar === index}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#76AABA',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
    padding: 16,
  },
});
