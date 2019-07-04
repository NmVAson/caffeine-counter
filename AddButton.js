import  React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Text, Icon, Overlay } from 'react-native-elements'

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
                <Text h3>{this.state.total} / 200 mg</Text>
                <Icon
                    raised
                    reverse
                    name='plus'
                    type='font-awesome'
                    color='#841584'
                    onPress={this.displayOptions}
                    style={styles.addButton} />
                <Overlay
                    isVisible={this.state.isVisible}
                    onBackdropPress={this.hideOptions}
                    width="auto"
                    height="auto"
                >
                    <View style={styles.modal}>
                        <Text h4>Whatchia drinkin'?</Text>
                        <View style={styles.buttonGroup}>
                            <Icon
                                raised
                                reverse
                                name='coffee'
                                type='material-community'
                                color='brown'
                                onPress={() => this.addToTotal(95)} />
                            <Icon
                                raised
                                reverse
                                name='tea'
                                type='material-community'
                                color='green'
                                onPress={() => this.addToTotal(30)} />
                            <Icon
                                raised
                                reverse
                                name='cup'
                                type='material-community'
                                color='red'
                                onPress={() => this.addToTotal(32)} />
                        </View>
                    </View>
                </Overlay>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 36
    },
    addButton: {
        alignSelf: 'center'
    },
    modal: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
  });