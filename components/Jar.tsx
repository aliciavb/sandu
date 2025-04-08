// components/Jar.tsx
// crea el jarron con las capas

import { Pressable, View, Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import { styles } from '../styles/Jar.styles';

type JarProps = {
  layers: string[];
  onPress: () => void;
  selected?: boolean;
};

export const Jar = ({ layers, onPress, selected = false }: JarProps) => {
  const maxLayers = 4;
  const filledLayers = Array.from({ length: maxLayers }, (_, i) => layers[i] || 'transparent');

  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (selected) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.08,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      scaleAnim.stopAnimation();
      scaleAnim.setValue(1);
    }
  }, [selected]);

  return (
    <Pressable onPress={onPress}>
      <Animated.View style={[styles.jar, { transform: [{ scale: scaleAnim }] }]}>
        {filledLayers
          .slice()
          .reverse()
          .map((color, index) => (
            <View key={index} style={[styles.layer, { backgroundColor: color }]} />
          ))}
      </Animated.View>
    </Pressable>
  );
};

