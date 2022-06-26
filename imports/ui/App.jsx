// meteor.call - only authenticated user should be able able to add, update and delete the data(their own data only)
// publications and subscribe is about getting data(only if client is authenticated)

import { Meteor } from "meteor/meteor";
import React, { useState, Fragment } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Task } from "./Task.jsx";
import { TasksCollection } from "../db/TasksCollection.js";
import { TaskForm } from "./TaskForm.jsx";
import { LoginForm } from "./LoginForm";
// const tasks = [
//   {_id: 1, text: 'First Task'},
//   {_id: 2, text: 'Second Task'},
//   {_id: 3, text: 'Third Task'},
// ];
const deleteTask = ({ _id }) => Meteor.call('tasks.remove', _id);

const logout = () => Meteor.logout();

const toogleChecked = (arg) => {
  const { _id, isChecked } = arg;
  // Update task in database

  return Meteor.call('tasks.setIsChecked', _id, !isChecked);

  // TasksCollection.update(_id, {
  //   $set: {
  //     isChecked: !isChecked,
  //   },
  // });
};
export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false);

  const user = useTracker(() => Meteor.user());

  const hideCompletedFilter = { isChecked: { $ne: true } };
  const userFilter = user ? { userId: user._id } : {};
  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  // using useTracer whenever we are finding(in my assumption)
  const {tasks, pendingTasksCount, isLoading} = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
    if (!Meteor.user(/*it gives user from db if user is authenticated*/)) {
      return noDataAvailable;
    }
    // return TasksCollection.find(
    //   hideCompleted ? pendingOnlyFilter : userFilter,
    //   {
    //     sort: { createdAt: -1 },
    //   }
    // ).fetch();
    const handler = Meteor.subscribe('tasks');
    if(!handler.ready()){
      return {...noDataAvailable, isLoading: true}
    }

    const tasks = TasksCollection.find(
      hideCompleted ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1 },
      }
    ).fetch();
    const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count();
    return { tasks, pendingTasksCount };

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
              {user.username || user.profile.name} 🚪
            </div>
            <TaskForm user={user}></TaskForm>
            <div className="filter">
              <button onClick={() => setHideCompleted(!hideCompleted)}>
                {hideCompleted ? "Show All" : "Hide Completed"}
              </button>
            </div>
            {isLoading && <div className="loading">loading...</div>}
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
