import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';

import NavegadorPrincipal from './src/navigation/NavegadorPrincipal';

export default function App() {
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  return (
    <NavigationContainer>
      <NavegadorPrincipal />
    </NavigationContainer>
  );
}
