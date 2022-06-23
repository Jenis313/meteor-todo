import React, {useState} from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Task } from './Task.jsx';
import { TasksCollection } from '../api/TasksCollection.js';
import { TaskForm } from './TaskForm.jsx';

// const tasks = [
  //   {_id: 1, text: 'First Task'},
  //   {_id: 2, text: 'Second Task'},
  //   {_id: 3, text: 'Third Task'},
  // ];
const deleteTask = ({ _id }) => TasksCollection.remove(_id);

const toogleChecked = (arg) => {
  const {_id, isChecked} = arg;
// Update task in database
  TasksCollection.update(_id, 
    {
      $set: {
        isChecked: !isChecked
      }
    })
}
export const App = () => {
      const [hideCompleted, setHideCompleted] = useState(false);

      const hideCompletedFilter = { isChecked: { $ne: true } };
      const tasks = useTracker(() => TasksCollection.find(hideCompleted ? hideCompletedFilter : {}, {sort: {createdAt : -1}}).fetch());


      const pendingTasksCount = useTracker(() =>
        TasksCollection.find(hideCompletedFilter).count()
      );
    
      const pendingTasksTitle = `${
        pendingTasksCount ? ` (${pendingTasksCount})` : ''
      }`;


      return (
        <div className='app'>
          <header>
            <div className="app-bar">
              <div className="app-header">
                <h1>📝️ To Do List {pendingTasksCount}</h1>
              </div>
            </div>
          </header>
          <div className='main'>
            <TaskForm></TaskForm>
            <div className="filter">
              <button onClick={() => setHideCompleted(!hideCompleted)}>
                {hideCompleted ? 'Show All' : 'Hide Completed'}
              </button>
            </div>
            <ul className='tasks'>
              { 
                tasks.map((task) => <Task
                  key={ task._id } 
                  task={ task } 
                  onCheckboxClick = {toogleChecked} 
                  onDeleteClick={deleteTask}/>) 
              }
            </ul>
          </div>
          
        </div>
      );
  };
