import { useState } from 'react';
import { AddForm } from './components/AddForm';
import { ToDoItem } from './components/ToDoItem';
import { Task } from './entities/Task';
import './App.css';

export function App() {
  const [taskList, setTaskList] = useState<Task[]>([])

  function addTask(task: Task) {
    setTaskList([...taskList, task]);
  }

  function updateTask(task: Task) {
    const updatedList = taskList.map((item) => {
      if (item.id === task.id) {
        return task;
      }
      return item;
    })
    setTaskList(updatedList);
  }

  function removeTask(task: Task) {
    const updatedList = taskList.filter((item) => {
      return item.id !== task.id;
    })
    setTaskList(updatedList);
  }

  return (
    <div className="App">
      <header>
        <h1>My To Do List</h1>
      </header>
      <main>
        <AddForm onSubmit={(item) => addTask(item)} />
        <ul>
         {taskList.map((todo) => (
            <ToDoItem
              key={todo.id}
              value={todo}
              onChange={(value) => updateTask(value)}
              onDelete={(value) => removeTask(value)}
            />
          ))}
        </ul>
      </main>
    </div>
  )
}

export default App
