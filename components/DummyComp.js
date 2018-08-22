  /*
   * Saved for later, AsyncStorage
   * /
  
  /*async storeItem(key, item) {
    const noteData = {
      id: 1,
      body: item,
      date: new Date().toDateString(),
    };

    const existingNotes = await AsyncStorage.getItem('notes');

    let newNote = JSON.parse(existingNotes);
    if (!newNote) {
      newNote = [];
    }

    newNote.push(noteData);

    await AsyncStorage.setItem('notes', JSON.stringify(newNote))
      .then(() => {
        alert('It was saved successfully');
      })
      .catch(() => {
        alert('There was an error saving the product');
      });
  }*/

    // getNotes() {
  // db.transaction(
  //   tx => {
  //     tx.executeSql(
  //       'select * from notes',
  //       [],
  //       (_, { rows: { _array } }) => this.setState({ noteData: _array })
  //     );
  //   }
  // );
  // }

  /*this.retrieveItem('notes') 
      .then(notes => { 
        this.noteData = JSON.parse(notes);
      })
      .catch(error => {
        alert('Error: ' + error);
      });*/

  /*async retrieveItem(key) {
    try {
      const retrievedItem = await AsyncStorage.getItem(key);

      return retrievedItem;
    } catch (error) {
      console.log(error.message);
    }
    return;
  }*/


// For later, SQLITE
/* Database */
//import Expo, { SQLite } from 'expo';
//const db = SQLite.openDatabase('db.db');

  // add(text) {
  //   db.transaction(
  //     tx => {
  //       tx.executeSql('insert into notes (done, value) values (0, ?)', [text]);
  //       tx.executeSql('select * from notes', [], (_, { rows }) =>
  //         console.log(JSON.stringify(rows))
  //       );
  //     }
  //   );
  // }

  // componentWillMount() {
  //   db.transaction(tx => {
  //     tx.executeSql('select * from notes', [], (_, { rows: { _array } }) => {
  //       this.noteData = _array;
  //     });
  //   });
  // }

  // componentDidMount() {
  //   db.transaction(tx => {
  //     tx.executeSql(
  //       'create table if not exists notes (id integer primary key not null, done int, value text);'
  //     );
  //   });
  // }

  // onDelete() {
  //   db.transaction(tx => {
  //     tx.executeSql(`delete from notes`, []);
  //   });
  // }
  