import React, { createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';

const lightTheme = {
  primary: '#778873',
  secondary: '#A1BC98',
  background: '#FDF6ED',
  backgroundSecondary: '#DCCFC0', 
  textPrimary: '#2A3328',
  textSecondary: '#657361',
};

const darkTheme = {
  primary: '#408A71',
  secondary: '#285A48',
  background: '#091413',
  backgroundSecondary: '#285A48', 
  textPrimary: '#B0E4CC',
  textSecondary: '#85BBA3', 
};

const ThemeContext = createContext(lightTheme);

export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme(); 
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);