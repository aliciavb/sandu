import { useEffect, useCallback, useState } from 'react';
import { View, Text, Animated } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { styles } from '../styles/index.styles';
import { useRouter } from 'expo-router';
import storage from '../utils/storage'; // 👈 tu helper universal

SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  const [appReady, setAppReady] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(1));
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const router = useRouter();

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const alreadyLaunched = await storage.getItem('alreadyLaunched');
      if (!alreadyLaunched) {
        await storage.setItem('alreadyLaunched', 'true');
        router.replace({ pathname: '/level/[id]', params: { id: '1' } });
      } else {
        router.replace('../levels');
      }
    };

    if (fontsLoaded) {
      checkFirstLaunch();
    }
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && appReady) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, appReady]);

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      {!appReady && (
        <Animated.View style={[styles.splashContainer, { opacity: fadeAnim }]}>
          <Text style={styles.title}>sandu</Text>
        </Animated.View>
      )}
    </View>
  );
}
