{/* IMPORT STATUS BAR */ }
import { StatusBar } from 'expo-status-bar';
{/* IMPORT HOOKS */ }
import { useState, useEffect } from 'react';
{/* IMPORT ELEMENTS AND REQUIREMENTS */ }
import { StyleSheet, SafeAreaView, Text, View, TextInput, TouchableOpacity, Platform, Keyboard, Alert } from 'react-native';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView.js';
{/* IMPORT useColorScheme in nativewind for dark-mode */ }
import { useColorScheme } from "nativewind";
{/* IMPORT COMPONENTS */ }
import Task from './components/Task.js'
{/* IMPORT FIREBASE */ }
import { firebase } from './config'


export default function App() {
  {/* use color scheme for dark-mode */ }
  const { colorScheme, toggleColorScheme } = useColorScheme();
  {/* created states */ }
  const [task, setTask] = useState()
  const [taskItems, setTaskItems] = useState([])
  {/* created ref */ }
  const todoRef = firebase.firestore().collection('todos')
  {/* fetch the data */ }
  const getData = async () => {
    todoRef
      .onSnapshot(
        querySnapshot => {
          const todos = []
          querySnapshot.forEach((doc) => {
            const { mission, isCompleted } = doc.data()
            todos.push({
              id: doc.id,
              mission,
              isCompleted,
            })
          })
          setTaskItems(todos)
        }
      )
  }
  useEffect(() => {
    getData();
  }, []);
  {/* CRUD */ }

  const addTask = () => {
    const data = {
      mission: task,
      isCompleted: false,
    }
    {/* minimum 3 character control */ }
    if (task.length < 3) {
      Alert.alert(
        /** Error Title */
        "Character Limit Error",
        /** Error Message */
        "The text to be entered must be a minimum of 3 characters.",
      );
    } else {
      todoRef
        .add(data)
        .then(() => {
          setTask('')
          Keyboard.dismiss()
        }).catch((error) => {
          alert(console.error())
        })
    }
  }
  const deleteTask = async (id) => {
    todoRef
      .doc(id)
      .delete()
      .catch((err) => {
        alert(err)
      })
  }
  {/* RETURN ELEMENTS */ }
  return (
    /* SAFE AREA VIEW for upper ledges  */
    <SafeAreaView className="bg-gray-500/20 flex-1 dark:bg-black/90 overflow-auto">
      {/* STICKY HEADER */}
      <View className="w-full sticky top-0 left-0 flex items-end px-5 h-10 justify-center">
        {/* DARK MODE TOGGLER */}
        <TouchableOpacity onPress={toggleColorScheme}>
          <Text className="dark:text-white">
            {colorScheme === "dark" ? `🌙 ${colorScheme}` : `🌞 ${colorScheme}`}
          </Text>
        </TouchableOpacity>
      </View>
      {/* TODO LIST */}
      <View className="mt-5 px-5">
        {
          /* TODO LOOP */
          taskItems.map((item) => (
            <TouchableOpacity key={item.id} itemid={item.id} onLongPress={() => deleteTask(item.id)}
              className={`mt-5 dark:bg-white bg-white p-5 rounded-xl`}>
              <Task text={item.mission} />
            </TouchableOpacity>
          ))
        }
      </View>
      {/* KEYBOARD PADDING IOS & ANDROID DEVICE */}
      <KeyboardAvoidingView style={styles.addTask}
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View>
          <TextInput onChangeText={text => setTask(text)}
            value={task}
            className="relative border px-5 py-5 border-gray-500/20 focus:border-gray-500 rounded-xl dark:text-white pr-16"
            placeholder='Lets! Tell me something to do' placeholderTextColor={colorScheme === "dark" ? "#fff" : "#000"}></TextInput>
          <TouchableOpacity
            onPress={() => addTask()}
            className="px-5 py-2 absolute right-0 top-0 h-full justify-center items-center">
            <Text>Add</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <StatusBar style="auto" />
    </SafeAreaView >
  );
}
{/* ONLY TEXTINPUT AREA STYLES */ }
const styles = StyleSheet.create({
  addTask: {
    position: 'absolute',
    left: 0,
    bottom: 40,
    width: "100%",
    paddingHorizontal: 20
  }
})