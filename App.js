import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Alert,
  AsyncStorage,
  TouchableHighlight,
} from 'react-native';

/* Globals */
import Globals from './Globals';

/* Elements */
import {
  Card, 
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage,
  PricingCard,
  Slider,
} from 'react-native-elements';

/* Components */
import AddNoteComp from './components/AddNoteComp';

/* Touch ID */
import TouchID from 'react-native-touch-id'; // Not working in Expo app

class App extends React.Component {
  constructor(props) {
    super(props);
    this.noteData = '';
    this.state = { isHidden: true };
    this.onPress = this.onPress.bind(this);
  }

  componentWillMount() {
    this.retrieveItem(global.storageKey)
      .then(notes => {
        if (notes) {
          this.noteData = JSON.parse(notes);
          this.setState({ isHidden: this.state.isHidden });
        }
      })
      .catch(error => {
        alert('Error: ' + error);
      });
  }

  onPress() {
    this.retrieveItem(global.storageKey)
      .then(notes => {
        if (notes) {
          this.noteData = JSON.parse(notes);
        }
        this.setState({ isHidden: !this.state.isHidden });
      })
      .catch(error => {
        alert('Error: ' + error);
      });
  }

  async retrieveItem(key) {
    try {
      const retrievedItem = await AsyncStorage.getItem(key);

      return retrievedItem;
    } catch (error) {
      console.log(error.message);
    }
    return;
  }

  async removeItemValue(key) {
    try {
      await AsyncStorage.removeItem(key);
      this.noteData = '';
      this.setState({ isHidden: this.state.isHidden });
      return true;
    } catch (exception) {
      return false;
    }
  }

  alertDeleteAllNotes(key) {
    Alert.alert(
      'Delete all notes?',
      'This is discructive action and connot be undone!',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'OK', onPress: () => this.removeItemValue(key) },
      ],
      { cancelable: true }
    );
  }

  render() {
    var payments = [];

    for (let note of this.noteData) {
      var index = this.noteData.indexOf(note);

      payments.push(
        <View>
          <TouchableHighlight
            activeOpacity={0.4}
            underlayColor="#f2f2f2"
            onPress={() =>
              note.isPrivate
                ? alert(
                    'Touch ID/Face ID or similar library for Android should be called here. Because it is EXPO based app, cant import component here. By the way, your note: ' +
                      note.body
                  )
                : null
            }>
            <View style={styles.noteContainer} key={index}>
              <Text style={styles.noteDate}>{note.date}</Text>
              <Text style={styles.noteBody}>
                {note.isPrivate
                  ? 'This note is private! Click to unlock!'
                  : note.body}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Hello, Citico</Text>
        <Text style={styles.subtitle}>This is React Native Demo</Text>
        <Button
          title="Add Note"
          icon={{ name: 'message', type: 'react-native-vector-icons' }}
          backgroundColor="#A9CF54"
          onPress={this.onPress}
        />
        <ScrollView>
          {this.noteData === '' ? (
            <Text style={styles.textNoNotes}>You have no notes!</Text>
          ) : (
            ''
          )}
          {payments}
          <Button
            style={styles.buttonDeleteAllNotes}
            title="Delete all notes"
            icon={{ name: 'block', type: 'react-native-vector-icons' }}
            onPress={() => {
              this.alertDeleteAllNotes(global.storageKey);
            }}
          />
        </ScrollView>
        {this.state.isHidden ? null : <AddNoteComp action={this.onPress} />}
        <Text style={styles.textCopyright}>by Marks Timofejevs</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  title: {
    marginTop: 80,
    marginLeft: 16,
    marginBottom: 2,
    marginRight: 16,
    fontSize: 38,
    color: global.primaryTextColor,
    textAlign: 'left',
  },
  subtitle: {
    marginTop: 0,
    marginLeft: 16,
    marginBottom: 16,
    marginRight: 16,
    fontSize: 18,
    color: global.primaryTextColor,
    textAlign: 'left',
  },
  noteContainer: {
    marginTop: 10,
    marginLeft: 16,
    marginRight: 16,
    padding: 10,
    fontSize: 28,
    flex: 1,
    borderWidth: 1,
    borderColor: '#c4c4c4',
    borderRadius: 6,
    backgroundColor: '#ffffff',
  },
  noteDate: {
    color: '#cccccc',
    marginBottom: 5,
  },
  noteBody: {
    flex: 1,
    fontSize: 18,
  },
  textNoNotes: {
    marginTop: 24,
    marginLeft: 16,
    marginBottom: 16,
    marginRight: 16,
    textAlign: 'center',
  },
  textCopyright: {
    marginTop: 24,
    marginLeft: 16,
    marginBottom: 16,
    marginRight: 16,
    color: global.primaryTextColor,
  },
  buttonDeleteAllNotes: {
    marginTop: 10,
  },
});

export default App;
