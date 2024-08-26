// ScreenWrapper.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ScreenWrapperProps {
  children: React.ReactNode;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 60, // Menambahkan margin bawah untuk memberi ruang bagi tab bar
  },
});

export default ScreenWrapper;
