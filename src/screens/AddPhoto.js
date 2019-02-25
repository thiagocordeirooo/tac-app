import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addPost } from '../store/reducer';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    Dimensions,
    Platform,
    ScrollView,
    Alert,
    AlertIOS,
    Vibration
} from 'react-native';
import { ImagePicker, Speech } from 'expo';

class AddPhoto extends Component {
    state = {
        image: null,
        comment: '',
    };

    pickImage = async () => {

        const { Permissions } = Expo;
        const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {

          const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

          if (status === 'granted') {

            let result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
              });
              console.log(result);

          } else {
            throw new Error('Location permission not granted');
          }
        } else {

            let result = await ImagePicker.launchCameraAsync({

              });
              
              this.setState({ image: { uri: result.uri } });
        }
 
      };

    save = async () => {
        //AlertIOS.alert('Imagem adicionada!', this.state.comment);
        const DURATION = 500;
        const PATTERN = [500, 500, 500,500,500];

         Vibration.vibrate(DURATION);
         console.log('image:', this.state.image);

         this.props.addPost({ nickname: 'tac', email: 'tac@mail.com', image: this.state.image.uri });

        // Android: vibrate for 10s
        // iOS: duration is not configurable, vibrate for fixed time (about 500ms)

        // Vibration.vibrate(PATTERN);
        // AlertIOS.alert(
        //     'Update available',
        //     'Keep your app up to date to enjoy the latest features',
        //     [
        //       {
        //         text: 'Cancel',
        //         onPress: () => console.log('Cancel Pressed'),
        //         style: 'cancel',
        //       },
        //       {
        //         text: 'Install',
        //         onPress: () => console.log('Install Pressed'),
        //       },
        //     ],
        //   );

        // Speech.speak('Hello!');
        // Speech.speak('Jaiminho, seu lindo!', {language: 'pt-br', pitch: 0.8});
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>Compartilhe uma imagem</Text>

                    <View style={styles.imageContainer}>
                        <Image source={this.state.image} style={styles.image} />
                    </View>

                    <TouchableOpacity onPress={this.pickImage} style={styles.buttom}>
                        <Text style={styles.buttomText}>Escolha a foto</Text>
                    </TouchableOpacity>

                    <TextInput placeholder='Algum comentário para a foto?'
                        style={styles.input} value={this.state.comment}
                        onChangeText={comment => this.setState({ comment })} />

                    <TouchableOpacity onPress={this.save} style={styles.buttom}>
                        <Text style={styles.buttomText}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginTop: Platform.OS === 'ios' ? 30 : 10,
        fontWeight: 'bold'
    },
    imageContainer: {
        width: '100%',
        height: Dimensions.get('window').width * 3 / 4,
        backgroundColor: '#EEE',
        marginTop: 10
    },
    image: {
        width: '100%',
        height: Dimensions.get('window').width * 3 / 4,
        resizeMode: 'center'
    },
    buttom: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4'
    },
    buttomText: {
        fontSize: 20,
        color: '#FFF'
    },
    input: {
        marginTop: 20,
        width: '90%'
    }
});

const mapDispatchToProps = {
    addPost: (post) => addPost(post),
};

export default connect(null, mapDispatchToProps)(AddPhoto);