import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements'
import AddButton from './AddButton'

export default function App() {

  return (
    <View style={styles.container}>
      <Text h1>Today's Caffeine Intake</Text>
      <AddButton/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    textAlign: 'center'
  }
});
