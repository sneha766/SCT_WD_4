import React, { useState } from 'react';
import './TodoApp.css';

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleAddTask = () => {
    if (!newTask.trim()) return;

    const task = {
      text: newTask.trim(),
      date: taskDate,
      time: taskTime,
      completed: false,
    };

    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = task;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, task]);
    }

    setNewTask('');
    setTaskDate('');
    setTaskTime('');
  };

  const handleEdit = (index) => {
    const task = tasks[index];
    setNewTask(task.text);
    setTaskDate(task.date);
    setTaskTime(task.time);
    setEditIndex(index);
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-container">
      <h1>📝 To-Do App</h1>
      <div className="input-section">
        <input
          type="text"
          placeholder="Task name"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <input
          type="date"
          value={taskDate}
          onChange={(e) => setTaskDate(e.target.value)}
        />
        <input
          type="time"
          value={taskTime}
          onChange={(e) => setTaskTime(e.target.value)}
        />
        <button onClick={handleAddTask}>
          {editIndex !== null ? 'Update' : 'Add'}
        </button>
      </div>

      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            <div onClick={() => toggleComplete(index)} className="task-text">
              <strong>{task.text}</strong><br />
              <small>{task.date} {task.time}</small>
            </div>
            <div className="actions">
              <button onClick={() => handleEdit(index)}>✏️</button>
              <button onClick={() => handleDelete(index)}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
