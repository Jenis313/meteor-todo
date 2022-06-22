import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '../imports/api/TasksCollection';
import { LinksCollection } from '/imports/api/links';

// function insertLink({ title, url }) {
//   LinksCollection.insert({title, url, createdAt: new Date()});
// }

const insertTask = taskText => TasksCollection.insert({text: taskText})

Meteor.startup(() => {
  // If the Tasks collection is empty, add some data.
  if (TasksCollection.find().count() === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task'
    ].forEach(insertTask)
  }
});
