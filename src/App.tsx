import { useState, useRef, useEffect } from 'react';
import { AddForm } from './components/AddForm';
import { ToDoItem } from './components/ToDoItem';
import { Task } from './entities/Task';
import autoAnimate from '@formkit/auto-animate'
import './App.css';

export function App() {
  const [taskList, setTaskList] = useState<Task[]>([])
  const parent = useRef(null);

  function addTask(task: Task) {
    setTaskList([...taskList, task]);
  }

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  function updateTask(task: Task) {
    let updatedList = [];
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].id === task.id) {
        !task.completed && updatedList.unshift(task);
      } else {
        updatedList.push(taskList[i]);
      }
    }

    task.completed && updatedList.push(task);
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
        <ul ref={parent}>
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
