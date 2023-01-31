import React, {useState} from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { AddItem, CustomModal, TaskList } from './components';
import { colors } from './constanst/theme/colors';

const App = () => {

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
    setIsModalVisible(!isModalVisible)
    setSelectedTask(item)
  }

  

  const onHandlerCancel = () => {
    setIsModalVisible(!isModalVisible)
    setSelectedTask(null)
  }

  const onHandlerDelete = () => {
    setTasks((prevTaskList) => prevTaskList.filter((task) => task.id !== selectedTask.id))
    setIsModalVisible(!isModalVisible)
  }

  return (
    <View style={styles.container}>
      <AddItem 
        buttonColor={colors.primary} 
        buttonText='Add' 
        onHandlerChange={onHandlerChange}
        onHandlerSubmit={onHandlerSubmit}
        placeholder='Add a new task'
        task={task}
      />
      <TaskList 
        tasks={tasks}
        onHandlerModal={onHandlerModal}
      />
      

      <CustomModal 
        isModalVisible={isModalVisible}
        onHandlerCancel={onHandlerCancel}
        onHandlerDelete={onHandlerDelete}
        selectedTask={selectedTask}
      />

    </View>
  );
}

export default App
