import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { TasksCollection } from "../imports/db/TasksCollection";
import { ServiceConfiguration } from 'meteor/service-configuration';
import '/imports/api/tasksMethods';
import '/imports/api/userMethods';
import '/imports/api/tasksPublications';


// function insertLink({ title, url }) {
//   LinksCollection.insert({title, url, createdAt: new Date()});
// // }

const insertTask = (taskText, user) =>
  TasksCollection.insert({
    text: taskText,
    userId: user._id,
    createdAt: new Date(),
  });

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
const SEED_USERNAME = "meteorite";
const SEED_PASSWORD = "password";

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);

  if (TasksCollection.find().count() === 0) {
    [
      "First Task",
      "Second Task",
      "Third Task",
      "Fourth Task",
      "Fifth Task",
      "Sixth Task",
      "Seventh Task",
    ].forEach((taskText) => insertTask(taskText, user));
  }
});

ServiceConfiguration.configurations.upsert(
  { service: 'github' },
  {
    $set: {
      loginStyle: 'popup',
      clientId: 'ba0d7ce6ef32c50663e2', // insert your clientId here
      secret: 'd8f4422f6643691262250e574be98ac38d34be28', // insert your secret here
    },
  }
);