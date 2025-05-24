import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavegadorPrincipal from './src/navigation/NavegadorPrincipal';

export default function App() {
  return (
    <NavigationContainer>
      <NavegadorPrincipal />
    </NavigationContainer>
  );
}
