import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Task } from './Task.jsx';
import { TasksCollection } from '../api/TasksCollection.js';


const tasks = [
  {_id: 1, text: 'First Task'},
  {_id: 2, text: 'Second Task'},
  {_id: 3, text: 'Third Task'},
];

export const App = () => {
      const tasks = useTracker(() => TasksCollection.find({}).fetch());

      return (
        <div>
          <h1>Welcome to Meteor!</h1>

          <ul>
            { tasks.map(task => <Task key={ task._id } task={ task }/>) }
          </ul>
        </div>
      );
  };
