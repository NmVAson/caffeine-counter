import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Header } from 'react-native-elements'
import AddButton from './AddButton'

export default function App() {

  return (
    <View style={styles.container}>
      <Header
        placement='left'
        centerComponent={{ text: 'Today\'s Caffeine Intake', style: { color: '#fff', fontSize: 20 } }}
      />
      <AddButton/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  }
});
