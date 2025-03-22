import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Color } from '../types/game';

interface JarProps {
  layers: Color[];
  onPress: () => void;
  isSelected: boolean;
}

const Jar: React.FC<JarProps> = ({ layers, onPress, isSelected }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={[styles.jar, isSelected && styles.selected]}>
        {layers.map((color, index) => (
          <View
            key={index}
            style={[styles.layer, { backgroundColor: color || 'transparent' }]}
          />
        ))}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  jar: {
    width: 60,
    height: 120,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  selected: {
    borderColor: '#FFD700',
    borderWidth: 3,
  },
  layer: {
    width: '100%',
    height: 30,
  },
});

export default Jar; 