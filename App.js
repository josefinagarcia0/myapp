import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Modal, TouchableOpacity } from 'react-native';

export default function App() {

  const [task, setTask] = useState('')
  /* creamos este evento para guardar lo que escribimos en el holder */
  const [tasks, setTasks] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)

  const onHandlerChange = (text) => {
    setTask(text)
  }

  const onHandlerSubmit = () => {
    setTasks([
      ...tasks,
      {
        id: Math.random().toString(),
        value: task
      }
    ])
    setTask('')
  }

  const onHandlerModal = (item) => {
    setIsModalVisible(!setIsModalVisible)
    setSelectedTask(item)
  }

  const renderItem = ({ item}) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => onHandlerModal(item)} >
      <Text style={styles.itemList}>{item.value}</Text>
    </TouchableOpacity>
  )

  const keyEstractor = (item) => item.id

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput 
        style={styles.input} 
        placeholder='add a new task' 
        autoCorrect={false}
        autoCapitalize='none'
        value={task}
        onChangeText={onHandlerChange}
        />

        <Button disabled={!task} title='Add' color='#626893' onPress={onHandlerSubmit} />
      </View>

      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={keyEstractor}
        style={styles.listContainer}
      />

      <Modal visible={isModalVisible} animationType='slide'>
        <Text> se muestra el modal </Text>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
    marginHorizontal: 20,
  },
  input: {
    width: '75%',
    borderBottomColor: '#626893',
    borderBottomWidth: 1,
    height: 40,
    color: '#212121'
  },
  listContainer: {
    marginHorizontal: 20,
    marginTop: 40
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#626893',
    marginBottom: 10,
    borderRadius: 10 
  },
  itemList: {
    fontSize: 14,
    color: '#fff'
  }

});
