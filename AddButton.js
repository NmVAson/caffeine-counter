import  React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Text, Icon, Overlay } from 'react-native-elements';
import ProgressCircle from 'react-native-progress-circle';
import ActionButton from 'react-native-action-button';

export default class AddButton extends React.Component {
    state = {
        total: 0,
        isVisible: false
    }

    constructor(props) {
        super(props)

        AsyncStorage
            .getItem('total')
            .then((savedTotal) => {
                var parsedTotal = parseInt(savedTotal) || 0;
                this.setState({total: parsedTotal});
            });

        AsyncStorage
            .getItem('today')
            .then((lastDateLogged) => {
                let today = new Date().toLocaleDateString()
                
                if (lastDateLogged && lastDateLogged != today) {
                    this.setState({total: 0});
                }
            });
    }

    addToTotal = (amount) => {
        let newTotal = this.state.total + amount
        let today = new Date()

        AsyncStorage.multiSet([
            ['today', today.toLocaleDateString()], 
            ['total', newTotal.toString()]
        ]);
    
        this.setState({total: newTotal})
    }

    displayOptions = () => {
        this.setState({ isVisible: true });
    }

    hideOptions = () => {
        this.setState({ isVisible: false });
    }

    render(){
        return (
            <View style={styles.container}>
                <ProgressCircle
                    percent={this.state.total/2}
                    radius={130}
                    borderWidth={15}
                    color="#3399FF"
                    shadowColor="#999"
                    bgColor="#fff"
                >
                    <Text style={{ fontSize: 18 }}>{this.state.total} mg</Text>
                </ProgressCircle>
                <ActionButton buttonColor="rgba(231,76,60,1)">
                    <ActionButton.Item 
                        buttonColor='#9b59b6' 
                        title="8oz coffee" 
                        onPress={() => this.addToTotal(95)}>
                        <Icon name="coffee" type='material-community' style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item 
                        buttonColor='#3498db' 
                        title="1 bag of green tea" 
                        onPress={() => this.addToTotal(30)}>
                        <Icon name='tea' type='material-community' />
                    </ActionButton.Item>
                    <ActionButton.Item 
                        buttonColor='#1abc9c' 
                        title="Diet Coke" 
                        onPress={() => this.addToTotal(32)}>
                        <Icon name="cup" type='material-community' style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white'
    }
  });