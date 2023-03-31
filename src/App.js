import "./App.css";
import React, { useState } from "react";

function App() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [time, setTime] = useState(0);

  function handleCreateProject(event) {
    event.preventDefault();
    const project = {
      name: event.target.elements.projectName.value,
      id: Date.now(),
    };
    setProjects([...projects, project]);
    event.target.reset();
  }

  function handleCreateTask(event) {
    event.preventDefault();
    const task = {
      name: event.target.elements.taskName.value,
      project: selectedProject,
      time: 0,
      id: Date.now(),
    };
    setTasks([...tasks, task]);
    event.target.reset();
  }

  function handleSelectProject(event) {
    setSelectedProject(event.target.value);
  }

  function handleStartTimer(taskId) {
    let intervalId = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, intervalId } : task
      )
    );
  }

  function handleStopTimer(taskId) {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          clearInterval(task.intervalId);
          return { ...task, time: task.time + time };
        } else {
          return task;
        }
      })
    );
    setTime(0);
  }

  return (
    <div className="App">
      <h1>Time Tracking Application</h1>
      <h2>Projects</h2>
      <form onSubmit={handleCreateProject}>
        <label htmlFor="projectName">Project Name:</label>
        <input type="text" id="projectName" name="projectName" required />
        <button type="submit">Create Project</button>
      </form>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
      <h2>Tasks</h2>
      <form onSubmit={handleCreateTask}>
        <label htmlFor="taskName">Task Name:</label>
        <input type="text" id="taskName" name="taskName" required />
        <label htmlFor="project">Project:</label>
        <select id="project" name="project" onChange={handleSelectProject}>
          <option value="">Select a project</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
        <button type="submit">Create Task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name} (
            {task.project && projects.find((p) => p.id === task.project)?.id})
            <button onClick={() => handleStartTimer(task.id)}>Start</button>
            <button onClick={() => handleStopTimer(task.id)}>Stop</button>
            {task.time > 0 && <span>Time Spent: {task.time} seconds</span>}
          </li>
        ))}
      </ul>
      <h2>Time Tracking</h2>
      <div>
        <p>{`${Math.floor(time / 3600)}:${Math.floor((time % 3600) / 60)}:${
          time % 60
        }`}</p>
      </div>
    </div>
  );
}

export default App;
