import { Meteor } from "meteor/meteor";
import React, { useState, Fragment } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Task } from "./Task.jsx";
import { TasksCollection } from "../api/TasksCollection.js";
import { TaskForm } from "./TaskForm.jsx";
import { LoginForm } from "./LoginForm";
// const tasks = [
//   {_id: 1, text: 'First Task'},
//   {_id: 2, text: 'Second Task'},
//   {_id: 3, text: 'Third Task'},
// ];
const deleteTask = ({ _id }) => TasksCollection.remove(_id);

const logout = () => Meteor.logout();

const toogleChecked = (arg) => {
  const { _id, isChecked } = arg;
  // Update task in database
  TasksCollection.update(_id, {
    $set: {
      isChecked: !isChecked,
    },
  });
};
export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false);

  const user = useTracker(() => Meteor.user());

  const hideCompletedFilter = { isChecked: { $ne: true } };
  const userFilter = user ? { userId: user._id } : {};
  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  const tasks = useTracker(() => {
    if (!user) {
      return [];
    }
    return TasksCollection.find(
      hideCompleted ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1 },
      }
    ).fetch();
  });

  const pendingTasksCount = useTracker(() => {
    if (!user) {
      return 0;
    }

    return TasksCollection.find(pendingOnlyFilter).count();
  });

  const pendingTasksTitle = `${
    pendingTasksCount ? ` (${pendingTasksCount})` : ""
  }`;

  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>📝️ To Do List {pendingTasksTitle}</h1>
          </div>
        </div>
      </header>
      <div className="main">
        {user ? (
          <Fragment>
            <div className="user" onClick={logout}>
              {user.username} 🚪
            </div>
            <TaskForm user={user}></TaskForm>
            <div className="filter">
              <button onClick={() => setHideCompleted(!hideCompleted)}>
                {hideCompleted ? "Show All" : "Hide Completed"}
              </button>
            </div>
            <ul className="tasks">
              {tasks.map((task) => (
                <Task
                  key={task._id}
                  task={task}
                  onCheckboxClick={toogleChecked}
                  onDeleteClick={deleteTask}
                />
              ))}
            </ul>
          </Fragment>
        ) : (
          <LoginForm></LoginForm>
        )}
      </div>
    </div>
  );
};
