import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  AsyncStorage,
  Alert,
} from 'react-native';

/* Globals */
import Globals from '../Globals';

/* Elements */
import { Button, CheckBox } from 'react-native-elements';

export default class AddNoteComp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      note: '',
      isPrivate: false,
    };
  }

  async storeItem(key, item) {
    const noteData = {
      body: item,
      isPrivate: this.state.isPrivate,
      date: new Date().toDateString(),
    };

    if (!item) {
      alert('Please enter note text!');

      return;
    }

    const existingNotes = await AsyncStorage.getItem(key);

    let newNote = JSON.parse(existingNotes);
    if (!newNote) {
      newNote = [];
    }

    newNote.push(noteData);

    await AsyncStorage.setItem(key, JSON.stringify(newNote))
      .then(() => { 
        alert('Note was saved successfully!');
      })
      .catch(() => {
        alert('There was an error saving the note!');
      });
  }

  render = () => {
    return (
      <View style={styles.modalBackground}>
        <View style={styles.noteContainer}>
          <Text style={styles.noteTitle}>Your note</Text>
          <Button
            style={styles.buttonClose}
            title="X"
            onPress={this.props.action}
          />
          <TextInput
            style={styles.noteInput}
            multiline={true}
            numberOfLines={4}
            maxLength={400}
            returnKeyType="go"
            onChangeText={note => this.setState({ note })}
            value={this.state.note}
          />
          <CheckBox
            title="Check to make this note private"
            checked={this.state.isPrivate}
            containerStyle={{marginLeft: 20, marginRight: 20}}
            onPress={() => {
              this.setState({ isPrivate: !this.state.isPrivate });
            }}
          />
          <Button
            style={styles.buttonAddNote}
            icon={{ name: 'message', type: 'react-native-vector-icons' }}
            backgroundColor="#A9CF54"
            title="Add note"
            onPress={() => this.storeItem(global.storageKey, this.state.note)}
          />
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  modalBackground: {
    position: 'absolute',
    margin: 0,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  noteContainer: {
    position: 'absolute',
    margin: 20,
    top: 0,
    flex: 1,
    left: 0,
    right: 0,
    borderRadius: 6,
    backgroundColor: '#f2f2f2',
  },
  noteTitle: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 28,
    color: '#037E8C',
  },
  noteInput: {
    margin: 20,
    height: 200,
    borderWidth: 1,
    borderColor: '#c4c4c4',
    borderRadius: 6,
    backgroundColor: '#ffffff',
  },
  buttonAddNote: {
    margin: 6,
    marginBottom: 16,
    borderRadius: 6,
  },
  buttonClose: {
    position: 'absolute',
    width: 38,
    right: 0,
    top: -36,
  },
});
