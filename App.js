import React from 'react';
import { StyleSheet, View } from 'react-native';

import TextInputAutocomplete from './src/Index';

export default function App() {
  return (
    <View style={styles.container}>
      <TextInputAutocomplete />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50
  }
});
