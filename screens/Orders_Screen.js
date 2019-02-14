import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import {
    RkText,
    RkTextInput,
    RkAvoidKeyboard,
    RkTheme,
    RkStyleSheet
} from 'react-native-ui-kitten';

import { Header } from 'react-navigation';
import { Button } from 'react-native-elements';
import { logoutUser, userDetailsFetch } from '../actions';

import users from './../data/raw/users';
import {Avatar} from './../components';
import {GradientButton} from './../components/';
import {FontAwesome} from './../assets/icons';
import LoadingSpinner from './../components/Loading/LoadingSpinner';
import firebaseSvc from './FirebaseSvc';
import { GiftedChat } from "react-native-gifted-chat";

// FontAwesome.cog

class OrdersScreen extends Component {

    // Donot show header
    static navigationOptions = {
        headerTitle: 'Chat Section',
        tabBarLabel: 'Chat',
        tabBarIcon: ({ tintColor }) => (
            <RkText
                rkType='awesome'
                style={{
                    color: tintColor,
                    fontSize: 24,
                    marginBottom: 0,
                }}>
                {FontAwesome.comment}
            </RkText>
        ),
    };
    constructor(props) {
        super(props);

        this.state = {
            firstName: 'michael',
            lastName: 'peumias',
            email: 'meiais@gmail.com',
            phone: '8082887367',
        }
    }
    state = {
        messages: [
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ],
    }
    componentWillMount() {
        this.props.userDetailsFetch();
        console.log('userdetails');
        console.log(this.props.userdetails);
        if ( this.props.userdetails ) {
            const {myfirstname} = this.props.userdetails;
            this.setState({ firstName: myfirstname });
        }
        firebaseSvc.refOff();
    }

    componentDidMount() {
        firebaseSvc.refOn(message =>
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, message),
            }))
        );
    }

    render() {

        if ( this.props.userdetails ) {
            var {firstname, lastname, email, phone} = this.props.userdetails;
        }
        return (
                 <GiftedChat
                        messages={this.state.messages}
                        onSend={firebaseSvc.send}
                        // user={this.user}
                        user={{
                            _id :  email,    //senderId
                            name: firstname + lastname, // + 'minr ',//senderId
                            avatar: 'https://placeimg.com/140/140/any',//profilepicture of the user
                        }}
                    />
        );
    }
}

const styles = RkStyleSheet.create(theme => ({
    header: {
        alignItems: 'center',
    },
    avatar: {
        marginRight: 16,
    },
    photo: {
        width: 50,
        height: 50,
        borderRadius: 200
    },
    container: {
        flex: 1,
        backgroundColor: theme.colors.screen.base,
    },
    list: {
        paddingHorizontal: 17,
    },
    footer: {
        flexDirection: 'row',
        minHeight: 60,
        padding: 10,
        backgroundColor: theme.colors.screen.alter,
    },
    item: {
        marginVertical: 14,
        flex: 1,
        flexDirection: 'row',
    },
    itemIn: {},
    itemOut: {
        alignSelf: 'flex-end',
    },
    balloon: {
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 15,
        borderRadius: 20,
    },
    time: {
        alignSelf: 'flex-end',
        margin: 15,
    },
    plus: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginRight: 7,
    },
    send: {
        width: 40,
        height: 40,
        marginLeft: 10,
    },
}));
const mapStateToProps = ({ userdata }) => {
    const { userdetails } = userdata;
    return { userdetails };
};

export default connect(mapStateToProps, {
    logoutUser, userDetailsFetch
})(OrdersScreen);



///clear chat in a day count.
//clear video