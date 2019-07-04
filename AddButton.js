import  React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Icon, Overlay } from 'react-native-elements'

export default class AddButton extends React.Component {
    state = {
        total: 0,
        isVisible: false
    }

    addToTotal = (amount) => {
        var currentSum = this.state.total
    
        this.setState({total: currentSum + amount})
    }

    displayOptions = () => {
        console.log("click")
        this.setState({ isVisible: true });
    }

    hideOptions = () => {
        this.setState({ isVisible: false });
    }

    render(){
        return (
            <View>
                <Text h3>{this.state.total} / 200 mg</Text>
                <Icon
                    raised
                    reverse
                    name='plus'
                    type='font-awesome'
                    color='#841584'
                    onPress={this.displayOptions} />
                <Overlay
                    isVisible={this.state.isVisible}
                    onBackdropPress={this.hideOptions}
                    width="auto"
                    height="auto"
                >
                    <View style={styles.container}>
                        <Text h2>Whatchia drinkin'?</Text>
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
      alignItems: 'center'
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
  });