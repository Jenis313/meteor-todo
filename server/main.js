import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '../imports/api/TasksCollection';

// function insertLink({ title, url }) {
//   LinksCollection.insert({title, url, createdAt: new Date()});
// // }

// const insertTask = taskText => TasksCollection.insert({text: taskText})

// Meteor.startup(() => {
//   // If the Tasks collection is empty, add some data.
//   if (TasksCollection.find().count() === 0) {
//     [
//       'First Task',
//       'Second Task',
//       'Third Task',
//       'Fourth Task',
//       'Fifth Task',
//       'Sixth Task',
//       'Seventh Task'
//     ].forEach(insertTask)
//   }
// });
const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
});
